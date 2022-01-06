import "./Navbar.css";
import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import Context from "../../context/HeroContext";

const logoutIcon = <FontAwesomeIcon icon={faClosedCaptioning} />;

const NavBar = () => {
  const { user, logout } = useContext(Context);

  useEffect(() => {}, [user]);

  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">My Team</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {user ? (
          <div className="logOut" onClick={logout}>
            <label>Log Out</label>
            <button className="btn__logout">{logoutIcon}</button>
          </div>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default NavBar;
