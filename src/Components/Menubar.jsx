import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "../App.css";
import { Component } from "react";
import styles from "./Style/MenuBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import ReactRouterBootstrap, { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Popup from "reactjs-popup";
import logo from "../Images/Logo.png";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { faCircleStop } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faHammer } from "@fortawesome/free-solid-svg-icons";

function Menubar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" fixed="top" variant="light" className="m-0 p-2 navbar">
      <Container fluid>
        <Navbar.Brand className="m-1" as={Link} to="/">
          <img width="200" className="Navbarlogo" src={logo}></img>
        </Navbar.Brand>
        <Navbar.Toggle
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar">
          <FontAwesomeIcon className="burger" icon={faFilm} />
        </Navbar.Toggle>
        <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="ctitle">RallyePulse</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto gap-3 offcanvas-body " id="offcanvasNavbar">
              <Nav.Link as={Link} to="/start">
                <FontAwesomeIcon
                  icon={faFlag}
                  style={{
                    color: "#ffffff",
                    marginRight: "5px",
                    fontSize: "40px",
                    transform: "rotate(10deg)",
                  }}
                />{" "}
                <p className="mbtext">Start Control</p>
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                <FontAwesomeIcon
                  icon={faFlagCheckered}
                  style={{
                    color: "#ffffff",
                    marginRight: "5px",
                    fontSize: "40px",
                    transform: "rotate(10deg)",
                  }}
                />
                <p className="mbtext">Finish Control</p>
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                <FontAwesomeIcon
                  icon={faCircleStop}
                  style={{
                    color: "#ffffff",
                    marginRight: "5px",
                    fontSize: "40px",
                  }}
                />
                <p className="mbtext">Stop Control</p>
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                <FontAwesomeIcon
                  icon={faHammer}
                  style={{
                    color: "#ffffff",
                    marginRight: "5px",
                    fontSize: "40px",
                  }}
                />
                <p className="mbtext">Administrator</p>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Menubar;
