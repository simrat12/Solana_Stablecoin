import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/backgrounds/sol-up-logo.png';

const Navbar = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
          setIsWalletConnected(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.location.href = 'https://metamask.io/download.html';
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
  };

  return (
    <header className="header" style={{ backgroundColor: '#262f30' }}>
      <div className="container">
        <div className="row">
          {/* Logo Starts */}
          <div className="main-logo col-xs-12 col-md-3 col-md-2 col-lg-2 hidden-xs">
            <Link to="/">
              <img
                id="logo"
                className="img-responsive"
                src={logo}
                alt="logo"
              />
            </Link>
          </div>
          {/* Logo Ends */}
          {/* Wallet Stats Starts */}
          {isWalletConnected && (
            <div className="col-md-7 col-lg-7">
              <ul className="unstyled bitcoin-stats text-center">
                <li>
                  <h6>9,450 USD</h6>
                  <span>Last trade price</span>
                </li>
                <li>
                  <h6>+5.26%</h6>
                  <span>24 hour price</span>
                </li>
                <li>
                  <h6>12.820 BTC</h6>
                  <span>24 hour volume</span>
                </li>
                <li>
                  <h6>2,231,775</h6>
                  <span>active traders</span>
                </li>
                <li>
                  <div
                    className="btcwdgt-price"
                    data-bw-theme="light"
                    data-bw-cur="usd"
                  ></div>
                  <span>Live Bitcoin price</span>
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
                    <span>{'0x1234...abcd'}</span>
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
                    <button className="btn btn-primary" onClick={connectWallet}>
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
                <li>
                  <Link to="/" activeClassName="active">Home</Link>
                </li>
                <li>
                  <Link to="/statistics">Statistics</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
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
