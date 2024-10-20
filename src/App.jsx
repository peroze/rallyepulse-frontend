import React from "react";
import Menubar from "./Components/Menubar.jsx";
import Home from "./Components/Home.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./Components/Start.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Finish from "./Components/Finish.jsx";
import Stop from "./Components/Stop.jsx";
import Admin from "./Components/Admin.jsx";
import { NextUIProvider } from "@nextui-org/system";
import RallyeControl from "./Components/RallyeControl.jsx";

function App() {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <Router basename="/">
          <header>
            <Menubar />
          </header>
          <Routes>
            <Route exact path="/" element={<Start />} />
            <Route exact path="/finish" element={<Finish />} />
            <Route exact path="/stop" element={<Stop />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/control" element={<RallyeControl />} />
          </Routes>
        </Router>
      </main>
    </NextUIProvider>
  );
}

export default App;
