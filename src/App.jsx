import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import CalcularRenta from "./components/CalcularRenta.jsx";
import ConstanciaRenta from "./components/ConstanciaRenta";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ConstanciaRenta />} />
          <Route path="/calculoRenta" element={<CalcularRenta />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
