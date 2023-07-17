import React, { useEffect, useState } from "react";
import web3 from "../web3"; // Import the web3 instance
import "./dashboard/dashboard.css";
import Innerbonds from "./dashboard/Innerbonds";
import Statistics from "./dashboard/Statistics";

const Mainbonds = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

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
        } catch (error) {
          console.error("Failed to connect the wallet:", error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      {isWalletConnected ? (
        <div className="dashit">
          <div className="row">
            <span>
            <button
              onClick={handleSubmit}
              id="bondsbut"
              type="submit" // Change to "button" instead of "submit"
              className="button button-a button-big button-rounded"
            >
              Manage Solstable
            </button>
            <button
              onClick={handleSubmit}
              id="bondsbut"
              type="submit" // Change to "button" instead of "submit"
              className="button button-a button-big button-rounded"
            >
              Buy bLUSD
            </button>
            <button
              onClick={handleSubmit}
              id="bondsbut"
              type="submit" // Change to "button" instead of "submit"
              className="button button-a button-big button-rounded"
            >
              Sell bLUSD
            </button>
            </span>
            <div className="col-lg-12">
              
              <Innerbonds handleSubmit={handleSubmit} />

              <Statistics />
              
            </div>  
          </div>
        </div>
      ) : (
        <h1>Refresh Page</h1>
      )}
    </div>
  );
};

export default Mainbonds;
