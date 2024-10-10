import React from "react";
import Menubar from "./Components/Menubar.jsx";
import Home from "./Components/Home.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./Components/Start.jsx";

function App() {
  return (
    <div>
      <Router basename="/">
        <header>
          <Menubar username="Username" />
        </header>
        <Routes>
          <Route exact path="/" element={<Start />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
