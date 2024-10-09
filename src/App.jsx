import React from "react";
import Menubar from "./Components/menubar.jsx";
import ContactUs from './Components/ContactUs.jsx';
import Home from './Components/Home.jsx';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Start from "./Components/Start.jsx";





function App() {
  return (
    <div>
        <header>
        </header>
        <Router basename="/">
            <Routes>
                <Route exact path="/" element={<Start/>} />
              
            </Routes>
        </Router>
    </div>
  
  );
}

export default App;
