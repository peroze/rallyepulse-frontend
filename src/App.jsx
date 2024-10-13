import React from "react";
import Menubar from "./Components/Menubar.jsx";
import Home from "./Components/Home.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./Components/Start.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Finish from "./Components/Finish.jsx";

function App() {
  return (
    <div>
      <Router basename="/">
        <header>
          <Menubar />
        </header>
        <Routes>
          <Route exact path="/" element={<Start />} />
          <Route exact path="/finish" element={<Finish />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
