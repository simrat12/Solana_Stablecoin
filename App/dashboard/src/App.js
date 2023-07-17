import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Mainbonds from "./components/Mainbonds";
import Riskytroves from "./components/Riskytroves";
import Nowallet from "./components/Nowallet";

import "./assets/css/font-awesome.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/select2.min.css";
import "./assets/css/style.css";
import "./assets/css/skins/orange.css";

import web3 from "./web3"; // Import the web3 instance

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (web3.currentProvider) {
        try {
          // Request user permission to connect the wallet
          await web3.currentProvider.request({ method: "eth_requestAccounts" });

          // Check the connection status or Ethereum address availability in the web3 instance
          const accounts = await web3.eth.getAccounts();
          const isConnected = accounts.length > 0;

          setIsWalletConnected(isConnected);
          setWalletAddress(accounts[0]); // Set the wallet address
        } catch (error) {
          console.error("Failed to connect the wallet:", error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  const connectWallet = () => {
    if (web3.currentProvider) {
      web3.currentProvider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setIsWalletConnected(true);
          setWalletAddress(accounts[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.location.href = "https://metamask.io/download.html";
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress("");
  };

  return (
    <div className="wrapper">
      <Router>
        <Navbar
          isWalletConnected={isWalletConnected}
          walletAddress={walletAddress}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
        />
        {isWalletConnected ? (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/mainbonds" element={<Mainbonds />} />
            <Route path="/riskytroves" element={<Riskytroves />} />
            {/* Add more routes for other pages if needed */}
          </Routes>
        ) : (
          <Nowallet connectWallet={connectWallet} />
        )}
      </Router>
    </div>
  );
};

export default App;
