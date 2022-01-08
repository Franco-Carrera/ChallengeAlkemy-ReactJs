import "./Navbar.css";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Context from "../../context/HeroContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const logoutIcon = <FontAwesomeIcon icon={faClosedCaptioning} />;

const NavBar = () => {
  const { setNotification } = useContext(Context);
  const history = useHistory();

  const logout = () => {
    setNotification("check", "See you later", 3000);
    localStorage.clear();
    history.push("/login");
  };

  return (
    <Navbar className="navBar" variant="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/team/my-team">My team</NavLink>
            <NavLink to="/team/good">Good</NavLink>
            <NavLink to="/team/bad">Bad</NavLink>
          </Nav>
        </Navbar.Collapse>
        <div className="logOut" onClick={logout}>
          <label>Log Out</label>
          <button type="button" className="btn__logout">
            {logoutIcon}
          </button>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
