import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/backgrounds/sol-up-logo.png";
import web3 from "../web3"; // Import the web3 instance
import './dashboard/dashboard.css';

const Navbar = ({
  isWalletConnected,
  walletAddress,
  connectWallet,
  disconnectWallet,
}) => {
  const truncatedAddress = isWalletConnected ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "";

  return (
    <header className="header fixed-top" style={{ backgroundColor: "#262f30" }}>
      <div className="container">
        <div className="row">
          {/* Logo Starts */}
          <div className="main-logo col-xs-12 col-md-3 col-md-2 col-lg-2 hidden-xs">
            <Link to="/">
              <p id="stable"><img
                id="logo"
                className="img-responsive"
                src={logo}
                alt="logo"
              /><b>STABLE</b></p>
            </Link>
          </div>
          {/* Logo Ends */}
          {/* Wallet Stats Starts */}
          {isWalletConnected && (
            <div className="col-md-7 col-lg-7">
            <ul className="unstyled bitcoin-stats text-center">
              <li>
                <FontAwesomeIcon icon={faWallet} className="wallet-icon" />
              </li>
              <li>
                <h6>0.00</h6>
                <span>
                  <b>
                    <h5>ETH</h5>
                  </b>
                </span>
              </li>
              <li>
                <h6>0.00</h6>
                <span>
                  <b>
                    <h5>LUSD</h5>
                  </b>
                </span>
              </li>
              <li>
                <h6>0.00</h6>
                <span>
                  <b>
                    <h5>LQTY</h5>
                  </b>
                </span>
              </li>
              <li>
                <h6>0.00</h6>
                <span>
                  <b>
                    <h5>bLUSD</h5>
                  </b>
                </span>
              </li>
            </ul>
          </div>
          )}
          {/* Wallet Stats Ends */}
          {/* Wallet Actions Starts */}
          <div className="col-md-3 col-lg-3">
            <ul className="unstyled user">
              {isWalletConnected ? (
                <>
                <li className="wallet-address">
                  <FontAwesomeIcon icon={faUser} className="profile-icon" />
                  <span>{truncatedAddress}</span>
                </li>
                <li className="disconnect-wallet">
                  <button className="btn btn-primary" onClick={disconnectWallet}>
                    Disconnect
                  </button>
                </li>
              </>
              ) : (
                <>
                  <li className="connect-wallet">
                    <button
                      className="btn btn-primary"
                      onClick={connectWallet}
                    >
                      <i className="fa fa-plug"></i> Connect Wallet
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* Wallet Actions Ends */}
        </div>
      </div>
      {/* Navigation Menu Starts */}
      <nav className="site-navigation navigation" id="site-navigation">
        <div className="container">
          <div className="site-nav-inner">
            {/* Logo For ONLY Mobile display Starts */}
            <Link className="logo-mobile" to="/">
              <img
                id="logo-mobile"
                className="img-responsive"
                src={logo}
                alt=""
              />
            </Link>
            {/* Logo For ONLY Mobile display Ends */}
            {/* Toggle Icon for Mobile Starts */}
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {/* Toggle Icon for Mobile Ends */}
            <div className="collapse navbar-collapse navbar-responsive-collapse">
              {/* Main Menu Starts */}
              <ul className="nav navbar-nav">
                {isWalletConnected ? (
                  <>
                    <li>
                      <Link to="/" activeClassName="active">
                      DASHBOARD
                      </Link>
                    </li>
                    <li>
                      <Link to="/mainbonds">BONDS</Link>
                    </li>
                    <li>
                      <Link to="/riskytroves">RISKY TROVES</Link>
                    </li>
                    {/* <li>
                      <Link to="/pricing">Pricing</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li> */}
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/" activeClassName="active">
                      DASHBOARD
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              {/* Main Menu Ends */}
            </div>
          </div>
        </div>
      </nav>
      {/* Navigation Menu Ends */}
    </header>
  );
};

export default Navbar;