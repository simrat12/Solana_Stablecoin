import logo from "../../assets/logo.jpg";
import "./nav.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const handleConnectWallet = () => {
    // Redirect the user to the wallet dashboard after clicking the button
    window.location.href = "http://localhost:3000/";
  };

  const linkStyles = ({ isActive }) => ({
    fontWeight: isActive ? "600" : "400",
  });

  return (
    <div className="nav-container">
      <div className="navbar">
        <div className="left">
          <div className="logoContainer">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "50px", marginTop: "45px", height: "50px" }}
            />
            <div className="logoTexts">
              <p>SOLSTABLE</p>
              <p className="navLetterSpacing">Lending</p>
            </div>
          </div>
          <div className="navLinks">
            <ul>
              <li>
                <NavLink style={linkStyles} to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <a href="#">DOC</a>
              </li>
              <li>
                <NavLink style={linkStyles} to="/about">
                  About Us
                </NavLink>
              </li>
              
            </ul>
          </div>
        </div>
        <div className="navButtons">
          <button onClick={handleConnectWallet}>GET LOAN</button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
