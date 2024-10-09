import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from'react-bootstrap/Offcanvas';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "../App.css";
import { Component } from 'react';
import styles from"./Style/MenuBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilm} from'@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import ReactRouterBootstrap,{ LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Popup from 'reactjs-popup';
//import logo from '../Images/Logo.png';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menubar({icon,username}) {

  const navigate = useNavigate();

    
    return (
        <Navbar expand="lg" fixed="top" variant="light" className="m-0 p-2 navbar" >
          <Container fluid>
            <Navbar.Toggle  data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"><FontAwesomeIcon className="burger" icon={faFilm}/></Navbar.Toggle>
            <Navbar.Offcanvas id="offcanvasNavbar" 
              placement='end'>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title className='ctitle'>
                  RallyePulse
                </Offcanvas.Title>
              </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="ms-auto gap-3 offcanvas-body " id='offcanvasNavbar'>     
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/start">Mode Start</Nav.Link>  
                    <Nav.Link as={Link} to="/">Mode Finish</Nav.Link>
                    <Nav.Link as={Link} to="/">Mode Stop</Nav.Link>
                    <Nav.Link as={Link} to="/">Mode Admin</Nav.Link>
                    </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
  
              
        </Container>
    </Navbar>
    );
  }
  
  export default Menubar;
