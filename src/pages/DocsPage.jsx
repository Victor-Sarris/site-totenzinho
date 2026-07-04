import { Terminal, Cpu } from "lucide-react";
import DocsLayout from "../components/DocsLayout";
import CodeBlock from "../components/CodeBlock";

// --- CÓDIGOS EXTRAÍDOS PARA MANTER O COMPONENTE LIMPO ---

const pythonCodeReconhecer = `import cv2
import face_recognition
import pickle
import numpy as np
import threading
import time
import requests
import os
import sqlite3
import math
import sys

sys.path.append(
    "./VL53L0X_rasp_python/python"
)  # Avisa o Python para procurar a biblioteca dentro da pasta que clonamos
import VL53L0X
from datetime import datetime
from flask import Flask, Response, jsonify, request

# CONFIGURAÇÕES PRINCIPAIS
ARQUIVO_DADOS = "encodings.pickle"
BANCO_DADOS = "totem_banco.db"
PASTA_LOGS = "logs_imagens"
URL_CAMERA = "http://192.168.18.159/stream"
PASTA_DATASET = "dataset"
INTERVALO_SCAN_IA = 1.0
DELAY_RECONHECIMENTO = 5.0

LARGURA_TELA = 1024
ALTURA_TELA = 600

COR_BARRA_FUNDO = (180, 0, 0)
COR_BTN_FUNDO = (20, 20, 20)
COR_TEXTO = (255, 255, 255)
COR_RECONHECIDO = (0, 255, 0)

MODO_RECONHECIMENTO = 0
MODO_CAPTURANDO = 1
MODO_INFO_REMOTO = 2

estado_atual = MODO_RECONHECIMENTO

app = Flask(__name__)
lock = threading.Lock()
frame_atual = None
lista_encodings = []
lista_nomes = []
nome_novo_cadastro = ""
buffer_fotos_novas = []

# MODULO A LASER (VL53L0X)

DISTANCIA_GATILHO_MM = 800  # 80 centímetros
pessoa_na_frente = False


def thread_sensor_distancia():
    global pessoa_na_frente

    try:
        # Cria o objeto UMA ÚNICA VEZ na memória
        sensor = VL53L0X.VL53L0X(address=0x29)
        sensor.start_ranging(VL53L0X.VL53L0X_BETTER_ACCURACY_MODE)
        print("[SENSOR] VL53L0X Inicializado! Começando as leituras...")
    except Exception as e:
        print(f"[ERRO I2C] Falha fatal ao conectar: {e}")
        pessoa_na_frente = True
        return

    falhas_consecutivas = 0

    while True:
        try:
            distancia_mm = sensor.get_distance()

            if distancia_mm > 0:
                falhas_consecutivas = 0

                if distancia_mm != 8190:
                    print(f"[LASER] Pessoa detectada a: {distancia_mm} mm")

                if 20 < distancia_mm < DISTANCIA_GATILHO_MM:
                    pessoa_na_frente = True
                else:
                    pessoa_na_frente = False

            else:
                falhas_consecutivas += 1
                pessoa_na_frente = False

            if falhas_consecutivas >= 3:
                print(
                    "[AVISO] Barramento I2C travou! O Watchdog está reiniciando o laser..."
                )
                try:
                    sensor.stop_ranging()
                except:
                    pass

                time.sleep(0.5)

                try:
                    sensor.start_ranging(
                        VL53L0X.VL53L0X_BETTER_ACCURACY_MODE
                    )  # Liga de novo
                except:
                    pass

                falhas_consecutivas = 0
                print("[SENSOR] Reinicialização concluída. Voltando ao trabalho!")

            time.sleep(0.2)

        except Exception as e:
            print(f"[ERRO NO LOOP] {e}")
            time.sleep(0.5)


# BANCO DE DADOS E AUDITORIA
def iniciar_banco():
    os.makedirs(PASTA_LOGS, exist_ok=True)
    conn = sqlite3.connect(BANCO_DADOS)
    c = conn.cursor()

    c.execute("""
        CREATE TABLE IF NOT EXISTS Usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT UNIQUE,
            data_cadastro DATETIME,
            nivel_acesso TEXT
        )
    """)

    c.execute("""
        CREATE TABLE IF NOT EXISTS Logs_Acesso (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER,
            data_hora DATETIME,
            confianca_reconhecimento REAL,
            foto_momento TEXT,
            FOREIGN KEY(usuario_id) REFERENCES Usuarios(id)
        )
    """)
    conn.commit()
    conn.close()
    print("[BANCO] Banco de Dados Inicializado com Sucesso.")


def cadastrar_usuario_db(nome, nivel="Aluno"):
    # Grava o usuário no banco de dados relacional.
    conn = sqlite3.connect(BANCO_DADOS)
    c = conn.cursor()
    try:
        c.execute(
            "INSERT INTO Usuarios (nome, data_cadastro, nivel_acesso) VALUES (?, ?, ?)",
            (nome, datetime.now(), nivel),
        )
        conn.commit()
        print(f"[BANCO] Usuário '{nome}' registrado no banco.")
    except sqlite3.IntegrityError:
        print(f"[BANCO] Usuário '{nome}' já existe no banco.")
    finally:
        conn.close()


def registrar_acesso_db(nome, confianca, frame_capturado):
    # Gera o log de acesso e salva a foto do momento exato
    conn = sqlite3.connect(BANCO_DADOS)
    c = conn.cursor()

    # Busca o ID do usuário
    c.execute("SELECT id FROM Usuarios WHERE nome = ?", (nome,))
    row = c.fetchone()

    if not row:
        c.execute(
            "INSERT INTO Usuarios (nome, data_cadastro, nivel_acesso) VALUES (?, ?, ?)",
            (nome, datetime.now(), "Migrado do Sistema Antigo"),
        )
        conn.commit()
        print(
            f"[BANCO] Sincronização automática: Usuário antigo '{nome}' adicionado ao novo banco."
        )
    else:
        user_id = row[0]

    agora_dt = datetime.now()

    nome_arquivo = f"{PASTA_LOGS}/{agora_dt.strftime('%Y%m%d_%H%M%S')}_{nome.replace(' ', '_')}.jpg"
    cv2.imwrite(nome_arquivo, frame_capturado)

    c.execute(
        """
        INSERT INTO Logs_Acesso (usuario_id, data_hora, confianca_reconhecimento, foto_momento)
        VALUES (?, ?, ?, ?)
    """,
        (user_id, agora_dt, confianca, nome_arquivo),
    )

    conn.commit()
    print(
        f"[AUDITORIA] Acesso salvo: {nome} | Confiança: {confianca}% | Foto: {nome_arquivo}"
    )

    conn.close()


# VÍDEO STREAM
class VideoStream:
    def __init__(self, src):
        self.src = src
        self.stream = None
        self.bytes_buffer = bytes()
        self.ultimo_frame = None
        self.rodando = False
        self.lock = threading.Lock()

    def start(self):
        self.rodando = True
        t = threading.Thread(target=self.update)
        t.daemon = True
        t.start()
        return self

    def update(self):
        while self.rodando:
            try:
                if self.stream is None:
                    self.stream = requests.get(self.src, stream=True, timeout=5)

                for chunk in self.stream.iter_content(chunk_size=4096):
                    if not self.rodando:
                        if self.stream:
                            self.stream.close()
                        break
                    self.bytes_buffer += chunk
                    a = self.bytes_buffer.find(b"\xff\xd8")
                    b = self.bytes_buffer.find(b"\xff\xd9")
                    if a != -1 and b != -1:
                        jpg = self.bytes_buffer[a : b + 2]
                        self.bytes_buffer = self.bytes_buffer[b + 2 :]
                        img = cv2.imdecode(
                            np.frombuffer(jpg, dtype=np.uint8), cv2.IMREAD_COLOR
                        )
                        with self.lock:
                            self.ultimo_frame = img
            except:
                self.stream = None
                self.bytes_buffer = bytes()
                time.sleep(2)

    def read(self):
        with self.lock:
            return self.ultimo_frame

    def stop(self):
        self.rodando = False


# FUNÇÕES DE DADOS (PICKLE + DB)
def carregar_dados():
    global lista_encodings, lista_nomes
    try:
        with open(ARQUIVO_DADOS, "rb") as f:
            data = pickle.load(f)
        lista_encodings = data["encodings"]
        lista_nomes = data["names"]
        print(f"[IA] Carregados {len(lista_nomes)} vetores faciais.")
    except FileNotFoundError:
        lista_encodings = []
        lista_nomes = []


def salvar_dados():
    global lista_encodings, lista_nomes
    data = {"encodings": lista_encodings, "names": lista_nomes}
    with open(ARQUIVO_DADOS, "wb") as f:
        f.write(pickle.dumps(data))


def treinar_novas_fotos(nome, lista_fotos):
    global lista_encodings, lista_nomes

    # Registra no Banco de Dados SQLite
    cadastrar_usuario_db(nome)

    pasta = os.path.join(PASTA_DATASET, nome)
    if not os.path.exists(pasta):
        os.makedirs(pasta)

    count = len(os.listdir(pasta))
    for img in lista_fotos:
        filename = f"{pasta}/{count}.jpg"
        cv2.imwrite(filename, img)
        count += 1

        rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        boxes = face_recognition.face_locations(rgb, model="hog")
        encs = face_recognition.face_encodings(rgb, boxes, num_jitters=5)
        for enc in encs:
            with lock:
                lista_encodings.append(enc)
                lista_nomes.append(nome)

    salvar_dados()


# INTERFACE & CLIQUES
def desenhar_interface(frame):
    cv2.rectangle(
        frame, (0, ALTURA_TELA - 100), (LARGURA_TELA, ALTURA_TELA), COR_BARRA_FUNDO, -1
    )

    cv2.rectangle(
        frame, (50, ALTURA_TELA - 80), (300, ALTURA_TELA - 20), COR_BTN_FUNDO, -1
    )
    cv2.rectangle(
        frame, (50, ALTURA_TELA - 80), (300, ALTURA_TELA - 20), (255, 255, 255), 1
    )
    cv2.putText(
        frame,
        "Capturar",
        (110, ALTURA_TELA - 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        COR_TEXTO,
        2,
    )

    cv2.rectangle(
        frame, (350, ALTURA_TELA - 80), (600, ALTURA_TELA - 20), COR_BTN_FUNDO, -1
    )
    cv2.rectangle(
        frame, (350, ALTURA_TELA - 80), (600, ALTURA_TELA - 20), (255, 255, 255), 1
    )
    cv2.putText(
        frame,
        "Envio Remoto",
        (390, ALTURA_TELA - 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        COR_TEXTO,
        2,
    )


def gerenciar_cliques(event, x, y, flags, param):
    global estado_atual, nome_novo_cadastro, buffer_fotos_novas
    y_min = ALTURA_TELA - 80
    y_max = ALTURA_TELA - 20

    if event == cv2.EVENT_LBUTTONDOWN:
        if estado_atual == MODO_RECONHECIMENTO:
            if y_min < y < y_max:
                if 50 < x < 300:
                    estado_atual = MODO_CAPTURANDO
                    nome_novo_cadastro = ""
                    buffer_fotos_novas = []
                elif 350 < x < 600:
                    estado_atual = MODO_INFO_REMOTO
        elif y < (ALTURA_TELA - 100):
            estado_atual = MODO_RECONHECIMENTO


def alinhar_rosto(imagem_rbg):
    landmarks_lista = face_recognition.face_landmarks(imagem_rbg)

    # se nao achar nenhum rosto na imagem
    if not landmarks_lista:
        return imagem_rbg

    # se achar
    landmarks = landmarks_lista[0]

    # coordenadas dos olhos
    olho_esquerdo = landmarks["left_eye"]
    olho_direito = landmarks["right_eye"]

    # cacula o centro de cada olho
    centro_esq = np.mean(olho_esquerdo, axis=0).astype(int)
    centro_dir = np.mean(olho_direito, axis=0).astype(int)

    # calcula o angulo de inclinacao
    dY = centro_dir[1] - centro_esq[1]
    dX = centro_dir[0] - centro_esq[0]
    angulo = np.degrees(math.atan2(dY, dX))

    # calcula o ponto central
    eixo_rotacao = (
        int((centro_esq[0] + centro_dir[0]) / 2),
        int((centro_esq[1] + centro_dir[1]) / 2),
    )

    # rotaciona a imagem
    altura, largura = imagem_rbg.shape[:2]
    matriz_rotacao = cv2.getRotationMatrix2D(eixo_rotacao, angulo, 1.0)
    imagem_alinhada = cv2.warpAffine(
        imagem_rbg, matriz_rotacao, (largura, altura), flags=cv2.INTER_CUBIC
    )

    return imagem_alinhada


# LOOP PRINCIPAL
def loop_principal():
    global frame_atual, estado_atual, nome_novo_cadastro, buffer_fotos_novas

    stream = VideoStream(URL_CAMERA).start()
    time.sleep(2)

    cv2.namedWindow("Totem", cv2.WINDOW_NORMAL)
    cv2.setMouseCallback("Totem", gerenciar_cliques)

    cv2.resizeWindow("Totem", LARGURA_TELA, ALTURA_TELA)
    cv2.moveWindow("Totem", 0, 0)
    cv2.setWindowProperty("Totem", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

    ultimo_ia = 0
    ultimo_sucesso = 0
    nome_detectado = ""
    caixas_detectadas = []
    nomes_detectados = []

    while True:
        try:
            frame_cru = stream.read()
            if frame_cru is None:
                time.sleep(0.01)
                continue

            frame = cv2.resize(frame_cru, (LARGURA_TELA, ALTURA_TELA))

            if estado_atual == MODO_RECONHECIMENTO:
                desenhar_interface(frame)

                agora = time.time()
                if pessoa_na_frente:
                    if (agora - ultimo_ia) > INTERVALO_SCAN_IA:
                        ultimo_ia = agora

                        small = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
                        rgb_small = cv2.cvtColor(small, cv2.COLOR_BGR2RGB)

                        locs_small = face_recognition.face_locations(rgb_small)
                        caixas_detectadas = locs_small
                        nomes_detectados = []

                        if locs_small:
                            locs_full = [
                                (top * 4, right * 4, bottom * 4, left * 4)
                                for (top, right, bottom, left) in locs_small
                            ]

                            rgb_full = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

                            encs = face_recognition.face_encodings(
                                rgb_full, locs_full, num_jitters=2
                            )

                            for enc in encs:
                                name = "Desconhecido"
                                with lock:
                                    face_distances = face_recognition.face_distance(
                                        lista_encodings, enc
                                    )
                                    if len(face_distances) > 0:
                                        best_match_index = np.argmin(face_distances)
                                        distancia_minima = face_distances[
                                            best_match_index
                                        ]

                                        if distancia_minima < 0.45:
                                            name = lista_nomes[best_match_index]

                                            em_cooldown = (
                                                agora - ultimo_sucesso
                                            ) < DELAY_RECONHECIMENTO
                                            if not em_cooldown:
                                                confianca_pct = round(
                                                    (1.0 - distancia_minima) * 100, 2
                                                )
                                                registrar_acesso_db(
                                                    name,
                                                    confianca_pct,
                                                    frame_cru.copy(),
                                                )

                                                ultimo_sucesso = agora
                                                nome_detectado = name

                                nomes_detectados.append(name)
                        else:
                            nomes_detectados = []

                    for (top, right, bottom, left), name in zip(
                        caixas_detectadas, nomes_detectados
                    ):
                        top *= 4
                        right *= 4
                        bottom *= 4
                        left *= 4
                        cor = COR_RECONHECIDO if name != "Desconhecido" else (0, 0, 255)
                        cv2.rectangle(frame, (left, top), (right, bottom), cor, 2)
                        cv2.rectangle(
                            frame, (left, bottom - 35), (right, bottom), cor, cv2.FILLED
                        )
                        cv2.putText(
                            frame,
                            name,
                            (left + 6, bottom - 6),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.8,
                            (255, 255, 255),
                            1,
                        )
                else:
                    caixas_detectadas = []
                    nomes_detectados = []
                    cv2.putText(
                        frame,
                        "Aproxime-se do Totem para liberar acesso",
                        (150, 50),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        1.0,
                        (0, 255, 255),
                        2,
                    )

                if (agora - ultimo_sucesso) < DELAY_RECONHECIMENTO:
                    tempo_restante = int(
                        DELAY_RECONHECIMENTO - (agora - ultimo_sucesso)
                    )
                    cv2.rectangle(
                        frame, (0, 0), (LARGURA_TELA, 80), COR_RECONHECIDO, -1
                    )
                    cv2.putText(
                        frame,
                        f"ACESSO LIBERADO: {nome_detectado}",
                        (50, 50),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        1.2,
                        (0, 0, 0),
                        3,
                    )
                    cv2.putText(
                        frame,
                        f"Aguarde {tempo_restante}s...",
                        (LARGURA_TELA - 250, 50),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.7,
                        (0, 0, 0),
                        2,
                    )

            elif estado_atual == MODO_CAPTURANDO:
                cv2.rectangle(frame, (0, 0), (LARGURA_TELA, 120), (200, 100, 0), -1)
                msg_nome = f"NOME: {nome_novo_cadastro}_"
                cv2.putText(
                    frame,
                    msg_nome,
                    (50, 50),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1.2,
                    COR_TEXTO,
                    2,
                )
                info = f"[ESPACO] FOTO ({len(buffer_fotos_novas)})  |  [ENTER] SALVAR  |  [ESC] VOLTAR"
                cv2.putText(
                    frame,
                    info,
                    (50, 100),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.7,
                    (200, 200, 200),
                    2,
                )

            elif estado_atual == MODO_INFO_REMOTO:
                cv2.rectangle(
                    frame,
                    (200, 200),
                    (LARGURA_TELA - 200, ALTURA_TELA - 200),
                    (0, 0, 0),
                    -1,
                )
                cv2.rectangle(
                    frame,
                    (200, 200),
                    (LARGURA_TELA - 200, ALTURA_TELA - 200),
                    (255, 255, 255),
                    2,
                )
                cv2.putText(
                    frame,
                    "MODO SERVIDOR",
                    (320, 300),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1.5,
                    COR_RECONHECIDO,
                    2,
                )
                cv2.putText(
                    frame,
                    "API de Relatorios disponivel em:",
                    (250, 380),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1.0,
                    COR_TEXTO,
                    2,
                )
                cv2.putText(
                    frame,
                    "http://192.168.18.149:5000/api/relatorio",
                    (230, 430),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.9,
                    (0, 255, 255),
                    2,
                )

            cv2.imshow("Totem", frame)
            with lock:
                frame_atual = frame.copy()

            key = cv2.waitKey(1) & 0xFF
            if estado_atual == MODO_CAPTURANDO:
                if key == 13:
                    if buffer_fotos_novas and nome_novo_cadastro:
                        treinar_novas_fotos(nome_novo_cadastro, buffer_fotos_novas)
                        estado_atual = MODO_RECONHECIMENTO
                elif key == 27:
                    estado_atual = MODO_RECONHECIMENTO
                elif key == 32:
                    buffer_fotos_novas.append(frame_cru.copy())
                elif key == 8:
                    nome_novo_cadastro = nome_novo_cadastro[:-1]
                elif 32 <= key <= 126:
                    nome_novo_cadastro += chr(key)

            if key == ord("q"):
                break

        except Exception as e:
            time.sleep(0.1)

    stream.stop()
    cv2.destroyAllWindows()


# API FLASK.
@app.route("/api/cadastrar_direto", methods=["POST"])
def cadastrar_direto():
    global lista_encodings, lista_nomes
    if "foto" not in request.files or "nome" not in request.form:
        return jsonify({"erro": "Dados incompletos"}), 400

    file = request.files["foto"]
    name = request.form["nome"]

    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    if img is None:
        return jsonify({"erro": "Imagem invalida ou corrompida"}), 400

    altura, largura = img.shape[:2]
    if largura > 800:
        proporcao = 800.0 / largura
        img = cv2.resize(img, (800, int(altura * proporcao)))

    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    with lock:
        boxes = face_recognition.face_locations(rgb)

        if boxes:
            encs = face_recognition.face_encodings(rgb, boxes, num_jitters=5)
            if len(encs) > 0:
                cadastrar_usuario_db(name)
                lista_encodings.append(encs[0])
                lista_nomes.append(name)
                salvar_dados()
                return jsonify({"msg": f"Sucesso! {name} cadastrado."}), 201

    return jsonify({"erro": "Rosto nao encontrado na foto"}), 400


# a rota /api/relatorio exporta os logs do banco de dados em formato JSON
@app.route("/api/relatorio", methods=["GET"])
def relatorio_acessos():
    conn = sqlite3.connect(BANCO_DADOS)
    c = conn.cursor()
    c.execute("""
        SELECT u.nome, l.data_hora, l.confianca_reconhecimento, l.foto_momento
        FROM Logs_Acesso l
        JOIN Usuarios u ON l.usuario_id = u.id
        ORDER BY l.data_hora DESC LIMIT 100
    """)
    logs = []
    for row in c.fetchall():
        logs.append(
            {
                "usuario": row[0],
                "data_hora": row[1],
                "confianca_pct": row[2],
                "foto_caminho": row[3],
            }
        )
    conn.close()
    return jsonify({"total_logs": len(logs), "acessos": logs})


@app.route("/video_feed")
def video_feed():
    def gen():
        while True:
            with lock:
                if frame_atual is None:
                    time.sleep(0.1)
                    continue
                _, enc = cv2.imencode(".jpg", frame_atual)
            yield (
                b"--frame\r\nContent-Type: image/jpeg\r\n\r\n"
                + bytearray(enc)
                + b"\r\n"
            )

    return Response(gen(), mimetype="multipart/x-mixed-replace; boundary=frame")


def rodar_servidor():
    app.run(
        host="0.0.0.0", port=5000, debug=False, use_reloader=False
    )  # mudar a porta quase ja tenha um processo nessa


if __name__ == "__main__":
    iniciar_banco()
    carregar_dados()

    t_sensor = threading.Thread(target=thread_sensor_distancia)
    t_sensor.daemon = True
    t_sensor.start()

    t_flask = threading.Thread(target=rodar_servidor)
    t_flask.daemon = True
    t_flask.start()

    loop_principal()
`;

const pythonCodeCadastroRemoto = `import requests
import os

url = "http://192.168.18.149:5000/api/cadastrar_direto"
pasta_imagens = "dataset/admin"
nome_cliente = "admin"

if not os.path.exists(pasta_imagens):
    print(f" Erro: A pasta '{pasta_imagens}' não foi encontrada.")
    exit()

arquivos = os.listdir(pasta_imagens)
fotos_validas = [f for f in arquivos if f.lower().endswith((".jpg", ".jpeg", ".png"))]
total = len(fotos_validas)

print(f"--- Iniciando envio em massa para o Labrador/Totem de Reconhecimento---")
print(f"Pasta: {pasta_imagens}")
print(f"Total de fotos encontradas: {total}\n")
print(f"Nome do Paciente: {nome_cliente}\n")

sucessos = 0

for i, arquivo in enumerate(fotos_validas):
    caminho_completo = os.path.join(pasta_imagens, arquivo)

    print(f"[{i+1}/{total}] Enviando {arquivo}...", end=" ")

    try:
        with open(caminho_completo, "rb") as f:
            files = {"foto": f}
            data = {"nome": nome_cliente}

            response = requests.post(url, files=files, data=data)

        if response.status_code == 201:
            print("Sucesso!")
            sucessos += 1
        else:
            print(f"Falha: {response.json().get('erro')}")

    except Exception as e:
        print(f"Erro de conexão: {e}")

print(f"\n--- CONCLUÍDO! ---")
print(f" {sucessos} fotos processadas e salvas no banco de dados do Labrador.")
`;

const cppCode = `#include "esp_camera.h"
#include <WiFi.h>
#include "esp_timer.h"
#include "img_converters.h"
#include "Arduino.h"
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "esp_http_server.h" 

// 1. configuracoes de Rede
const char* ssid = "root";
const char* password = "sarris2005";

#define PART_BOUNDARY "123456789000000000000987654321"


// 2. Pinagem (AI THINKER)
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define FLASH_GPIO_NUM     4
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

static const char* _STREAM_CONTENT_TYPE = "multipart/x-mixed-replace;boundary=" PART_BOUNDARY;
static const char* _STREAM_BOUNDARY = "\r\n--" PART_BOUNDARY "\r\n";
static const char* _STREAM_PART = "Content-Type: image/jpeg\r\nContent-Length: %u\r\n\r\n";

httpd_handle_t stream_httpd = NULL;

// funcao que gera o video contínuo
static esp_err_t stream_handler(httpd_req_t *req){
  camera_fb_t * fb = NULL;
  esp_err_t res = ESP_OK;
  size_t _jpg_buf_len = 0;
  uint8_t * _jpg_buf = NULL;
  char * part_buf[64];

  res = httpd_resp_set_type(req, _STREAM_CONTENT_TYPE);
  if(res != ESP_OK){
    return res;
  }

  while(true){
    fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("Falha na captura");
      res = ESP_FAIL;
    } else {
      if(fb->format != PIXFORMAT_JPEG){
        bool jpeg_converted = frame2jpg(fb, 80, &_jpg_buf, &_jpg_buf_len);
        esp_camera_fb_return(fb);
        fb = NULL;
        if(!jpeg_converted){
          Serial.println("Falha na compressão JPEG");
          res = ESP_FAIL;
        }
      } else {
        _jpg_buf_len = fb->len;
        _jpg_buf = fb->buf;
      }
    }
    if(res == ESP_OK){
      size_t hlen = snprintf((char *)part_buf, 64, _STREAM_PART, _jpg_buf_len);
      res = httpd_resp_send_chunk(req, (const char *)part_buf, hlen);
    }
    if(res == ESP_OK){
      res = httpd_resp_send_chunk(req, (const char *)_jpg_buf, _jpg_buf_len);
    }
    if(res == ESP_OK){
      res = httpd_resp_send_chunk(req, _STREAM_BOUNDARY, strlen(_STREAM_BOUNDARY));
    }
    if(fb){
      esp_camera_fb_return(fb);
      fb = NULL;
      _jpg_buf = NULL;
    } else if(_jpg_buf){
      free(_jpg_buf);
      _jpg_buf = NULL;
    }
    if(res != ESP_OK){
      break;
    }
  }
  return res;
}

void startCameraServer(){
  httpd_config_t config = HTTPD_DEFAULT_CONFIG();
  config.server_port = 80;

  httpd_uri_t stream_uri = {
    .uri       = "/stream",
    .method    = HTTP_GET,
    .handler   = stream_handler, 
    .user_ctx  = NULL
  };

  if (httpd_start(&stream_httpd, &config) == ESP_OK) {
    httpd_register_uri_handler(stream_httpd, &stream_uri);
  }
}

void setup() {
  pinMode(FLASH_GPIO_NUM, OUTPUT);
  digitalWrite(FLASH_GPIO_NUM, LOW); // flash desligado

  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); 
  Serial.begin(115200);
  Serial.setDebugOutput(false);
  
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  
  if(psramFound()){
    config.frame_size = FRAMESIZE_VGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }
  
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }

  // configuracao de ip fixo
  IPAddress local_IP(192, 168, 18, 159); // O IP fixo para a ESP32
  IPAddress gateway(192, 168, 18, 1);    // O IP roteador Wi-Fi
  IPAddress subnet(255, 255, 255, 0);    // Máscara de rede padrão
  IPAddress primaryDNS(8, 8, 8, 8);      // DNS do Google

  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS)) {
    Serial.println("Falha ao configurar IP Fixo");
  }
  // ==========================================

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Camera Ready! Use: http://");
  Serial.print(WiFi.localIP());
  Serial.println("/stream");
  
  startCameraServer();
}

void loop() {
  delay(10000);

  // digitalWrite(FLASH_GPIO_NUM, HIGH);
}`;

const DocsPage = () => {
  return (
    <DocsLayout>
      <div className="mb-10 border-b border-slate-800 pb-8" id="intro">
        <h1 className="text-2xl font-bold text-white mb-4 md:text-4xl">
          Documentação do Código
        </h1>
        <p className="text-base text-slate-400 md:text-lg">
          Abaixo estão os módulos principais do sistema. Utilize o menu
          lateral para navegar entre a lógica de IA e o firmware do
          microcontrolador.
        </p>
      </div>

      {/* Seção de IA / Python */}
        <section id="reconhecimento" className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Terminal className="text-cyan-400 h-6 w-6" />
            Módulo de Visão Computacional (Python)
          </h2>
          <div className="mb-4 text-justify">
            <div className="mb-3.5 text-justify">
              <h4 className="font-bold text-blue-400 gap-2.5 text-[18px]">
                1. Módulo de Visão Computacional (Python - 03_reconhecer.py)
                Este guião é o "cérebro" do sistema, responsável por processar
                as imagens, identificar rostos e gerir os acessos. Ele está
                dividido nas seguintes componentes principais:
              </h4>
            </div>
            <div className="mb-3.5">
              <span className="font-bold text-blue-200">
                Captura de Vídeo Assíncrona (VideoStream):
              </span>{" "}
              A classe VideoStream liga-se ao IP da câmara{" "}
              <span className="text-red-500">(ESP-CAM)</span> e obtém o fluxo de
              vídeo (MJPEG) através da biblioteca requests. Este processo corre
              numa thread separada (segundo plano), garantindo que a captura de
              frames não bloqueia o processamento da interface nem da{" "}
              <span className="text-blue-500 font-bold">
                Inteligência Artificial
              </span>
              , resultando num sistema muito mais fluido e sem atrasos.
            </div>

            <div className="mb-3.5">
              <span className="font-bold text-blue-200">
                Inteligência Artificial e Reconhecimento:
              </span>{" "}
              No loop_principal, o sistema utiliza a biblioteca face_recognition{" "}
              <span className="font-bold text-red-500">(baseada em dlib)</span>{" "}
              para detetar a localização dos rostos na imagem e extrair os seus
              "encodings" (vetores faciais). Estes vetores são então comparados
              com a lista de utilizadores conhecidos guardada em ficheiro{" "}
              <span className="font-bold text-red-500">(encodings.pickle)</span>
              . Se a distância matemática entre o rosto detetado e um rosto
              conhecido for inferior a 0.5 (alta confiança), o sistema reconhece
              o utilizador e liberta o acesso, iniciando um período de
              "cooldown" (pausa) para não registar a mesma pessoa repetidamente
              em curtos espaços de tempo.
            </div>
            <div className="mb-3.5">
              <span className="font-bold text-blue-200">
                Base de Dados e Auditoria SQLite:
              </span>{" "}
              A função iniciar_banco cria uma base de dados local{" "}
              <span className="font-bold text-amber-500">(totem_banco.db)</span>{" "}
              com duas tabelas: Usuarios e Logs_Acesso. Sempre que um utilizador
              é reconhecido, a função{" "}
              <span className=" text-amber-500">registrar_acesso_db</span> é
              chamada, guardando não só o nome e a hora, mas também o nível de
              confiança da IA e uma fotografia exata do momento do acesso,
              servindo como auditoria de segurança.
            </div>
            <div className="mb-3.5">
              <span className="font-bold text-blue-200">
                Interface Gráfica (OpenCV) e API Web (Flask):
              </span>
              O sistema desenha a sua própria interface em ecrã inteiro com a
              biblioteca <span className="text-green-400">OpenCV</span>,
              possuindo botões interativos para registar novos utilizadores no
              próprio local. Adicionalmente, o módulo levanta um servidor web em{" "}
              <span className="text-green-400">Flask</span> na porta 5000. Esta
              API permite o registo remoto de rostos{" "}
              <span className="font-bold text-green-400">
                (/api/cadastrar_direto)
              </span>
              , a visualização do relatório de acessos em{" "}
              <span className="text-green-400">
                formato JSON (/api/relatorio)
              </span>{" "}
              e também a retransmissão do vídeo processado (com os quadrados à
              volta das caras) através da rota{" "}
              <span className="text-green-400">/video_feed</span>.
            </div>
          </div>
          <CodeBlock
            language="python"
            code={pythonCodeReconhecer}
            fileName="03_reconhecer.py"
            iconColor="text-cyan-400"
          />
        </section>
        <section id="cadastro-remoto" className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Terminal className="text-emerald-400 h-6 w-6" />
            Script de Cadastro Remoto (Python)
          </h2>
          <div className="mb-4 text-justify">
            <div className="mb-3.5 text-justify">
              <h4 className="font-bold text-emerald-400 gap-2.5 text-[18px]">
                2. Envio em Massa de Fotos (Python - cadastrar_remoto.py)
              </h4>
              <p className="mt-2 text-slate-400">
                Este script auxiliar serve para automatizar o cadastro de novos
                usuários, realizando o envio em lote de imagens diretamente para
                a API Flask do totem. Ele é essencial para popular a base de
                dados de reconhecimento facial rapidamente, sem precisar
                capturar rosto por rosto fisicamente no local.
              </p>
            </div>

            <div className="mb-3.5">
              <span className="font-bold text-emerald-200">
                Processamento de Diretório:
              </span>{" "}
              O código varre uma pasta local{" "}
              <span className="font-bold text-orange-400">
                (ex: dataset/admin)
              </span>{" "}
              e faz a triagem garantindo que apenas arquivos de imagem com
              extensões válidas (.jpg, .jpeg, .png) sejam processados.
            </div>

            <div className="mb-3.5">
              <span className="font-bold text-emerald-200">
                Comunicação com a API Rest:
              </span>{" "}
              Para cada imagem identificada, o script utiliza a biblioteca{" "}
              <span className="text-green-400">requests</span> para disparar uma
              requisição POST para o endpoint{" "}
              <span className="font-bold text-green-400">
                /api/cadastrar_direto
              </span>
              . O envio empacota o arquivo em formato binário
              (multipart/form-data) junto com o nome designado para o usuário.
            </div>

            <div className="mb-3.5">
              <span className="font-bold text-emerald-200">
                Tratamento de Respostas e Logs:
              </span>{" "}
              Durante a execução, ele gera um log no terminal detalhando o
              progresso (ex: <code>[1/10] Enviando...</code>). Se a API retornar
              sucesso (Status 201), ele contabiliza; se falhar (ex: por não
              encontrar um rosto na imagem), ele captura o JSON de erro do
              servidor e exibe o motivo exato, permitindo fácil depuração.
            </div>
          </div>
          <CodeBlock
            language="python"
            code={pythonCodeCadastroRemoto}
            fileName="cadastrar_remoto.py"
            iconColor="text-emerald-400"
          />
        </section>

        {/* Seção do Embarcado / C++ */}
        <section id="esp32" className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Cpu className="text-indigo-400 h-6 w-6" />
            Firmware do ESP32/ESP-CAM (C/C++)
          </h2>
          <div className="mb-4 text-justify">
              <div className="mb-4 text-justify">
                <div className="mb-3.5 text-justify">
                  <h4 className="font-bold text-indigo-400 gap-2.5 text-[18px]">
                    2. Firmware de Captura na Borda (C++ - espcam.ino)
                  </h4>
                  <p className="mt-2 text-slate-400">
                    Este código é compilado e gravado no microcontrolador
                    ESP32-CAM. Ele atua como o "olho" do sistema (Edge Device),
                    dedicado exclusivamente a capturar o ambiente em tempo real
                    e fornecer as imagens para a rede. O firmware divide-se nas
                    seguintes lógicas:
                  </p>
                </div>

                <div className="mb-3.5">
                  <span className="font-bold text-indigo-200">
                    Configuração de Hardware e Pinagem:
                  </span>{" "}
                  O código define mapeamentos precisos de pinos{" "}
                  <code>(GPIOs)</code> específicos para o modelo de placa{" "}
                  <span className="font-bold text-orange-400">AI Thinker</span>.
                  Uma etapa crítica de estabilidade no <code>setup()</code> é a
                  desativação do "Brownout Detector"{" "}
                  <code>(RTC_CNTL_BROWN_OUT_REG)</code>, o que impede que o
                  ESP32 reinicie sozinho devido aos picos de consumo de corrente
                  gerados pela inicialização do sensor de imagem e do Wi-Fi.
                </div>

                <div className="mb-3.5">
                  <span className="font-bold text-indigo-200">
                    Servidor de Streaming de Vídeo (MJPEG):
                  </span>{" "}
                  Através da biblioteca <code>esp_http_server.h</code>, o
                  microcontrolador levanta um servidor web na porta 80. A função{" "}
                  <span className="text-orange-400">stream_handler</span> é o
                  coração deste processo: ela captura quadros (frames)
                  ininterruptamente, os converte para JPEG e os transmite pela
                  rota <code>/stream</code> usando a técnica de cabeçalho{" "}
                  <span className="font-bold text-indigo-300">
                    multipart/x-mixed-replace
                  </span>
                  . É exatamente esta rota que o nosso sistema em Python acessa
                  para "puxar" o vídeo.
                </div>

                <div className="mb-3.5">
                  <span className="font-bold text-indigo-200">
                    Otimização de Memória (PSRAM):
                  </span>{" "}
                  Durante a inicialização da câmera{" "}
                  <code>(esp_camera_init)</code>, o código verifica
                  automaticamente se a placa possui memória PSRAM externa. Se
                  possuir, ele aumenta a resolução do vídeo para{" "}
                  <span className="font-bold text-green-400">VGA</span> e
                  melhora a qualidade do JPEG. Caso não tenha, ele ajusta para
                  resoluções menores (
                  <span className="text-green-400">SVGA</span>) para não
                  sobrecarregar a memória interna.
                </div>

                <div className="mb-3.5">
                  <span className="font-bold text-indigo-200">
                    Conectividade e Iluminação:
                  </span>{" "}
                  O ESP32-CAM conecta-se à rede Wi-Fi local configurada e
                  imprime o seu endereço IP no Monitor Serial. Além disso, o
                  pino responsável pelo{" "}
                  <span className="font-bold text-yellow-200">
                    Flash LED (GPIO 4)
                  </span>{" "}
                  foi configurado. Ele inicia desligado, mas o laço principal{" "}
                  <code>loop()</code> contém a instrução para ativá-lo, o que
                  pode ser útil para iluminar rostos em ambientes escuros.
                </div>
              </div>
          </div>

          <CodeBlock
            language="cpp"
            code={cppCode}
            fileName="espcam.ino"
            iconColor="text-indigo-400"
          />
        </section>
    </DocsLayout>
  );
};

export default DocsPage;
