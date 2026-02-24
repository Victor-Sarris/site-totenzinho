import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./home.jsx";
import DocsPage from "./DocsPage.jsx";
import WikiPage from "./WikiPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documentacao" element={<DocsPage />} />
          <Route path="/wiki" element={<WikiPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
