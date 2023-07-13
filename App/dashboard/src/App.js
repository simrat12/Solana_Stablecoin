import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Statistics from "./components/Statistics";
import Nowallet from "./components/Nowallet";
// import Contact from './components/Contact';
// import Terms from './components/Terms';

// Css code links
import "./assets/css/font-awesome.min.css"; // Update this line
import "./assets/css/bootstrap.min.css"; // Update this line
import "./assets/css/magnific-popup.css"; // Update this line
import "./assets/css/select2.min.css"; // Update this line
import "./assets/css/style.css"; // Update this line
import "./assets/css/skins/orange.css"; // Update this line

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => {
          setIsWalletConnected(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.location.href = "https://metamask.io/download.html";
    }
  };
  
  return (
    <div className="wrapper">
      <Router>
        <Navbar />
        {!isWalletConnected && <Nowallet isWalletConnected={isWalletConnected} />}
        {isWalletConnected && (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/statistics" element={<Statistics />} />
            {/* Add more routes for other pages if needed */}
          </Routes>
        )}
      </Router>
    </div>
  );
};

export default App;
