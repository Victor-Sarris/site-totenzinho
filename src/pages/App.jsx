import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
// Importacoes de Paginas principais
import "./App.css";
import Index from "./Index.jsx";
import Home from "./home.jsx";
import DocsPage from "./DocsPage.jsx";
import WikiPage from "./WikiPage.jsx";
import Navbar from "../components/Navbar.jsx";
import Models3d from "./Models3d.jsx";
import Organization from "./Organization.jsx";
import Circuit from "./Circuit.jsx";

// Importacoes de paginas da documentacao
import LibraryPage from "./DocsPage/LibraryPage.jsx";

function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <div className="pt-16">
          <Routes>
            {/* Paginas Principais */}
            <Route path="/" element={<Index />} />
            <Route path="/site-totenzinho" element={<Home />} />
            <Route path="/documentacao" element={<DocsPage />} />
            <Route path="/wiki" element={<WikiPage />} />
            <Route path="/models" element={<Models3d />} />
            <Route path="/org" element={<Organization />} />
            <Route path="/cir" element={<Circuit />} />

            {/* Paginas de Documentacao */}
            <Route
              path="/documentacao/library-install"
              element={<LibraryPage />}
            />
          </Routes>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
