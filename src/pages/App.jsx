import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./home.jsx";
import DocsPage from "./DocsPage.jsx";
import WikiPage from "./WikiPage.jsx";
import Navbar from "../components/Navbar.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/documentacao" element={<DocsPage />} />
            <Route path="/wiki" element={<WikiPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
