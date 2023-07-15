import React, { useEffect, useState } from "react";
import web3 from "../web3"; // Import the web3 instance
import "./dashboard/dashboard.css";
import Stack from "./dashboard/Stack";
import Pool from "./dashboard/Pool";
import Trove from "./dashboard/Trove";
import Bonds from "./dashboard/Bonds";

const Main = () => {
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
            <div className="col-lg-12">
              <Trove handleSubmit={handleSubmit} />
              <Bonds handleSubmit={handleSubmit} />
              <Stack handleSubmit={handleSubmit} />
              <Pool handleSubmit={handleSubmit} />

              <div className="col-md">
                <div className="aside-card">
                  <h3>Statistics</h3>
                  {/* Add content for the aside card here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Refresh Page</h1>
      )}
    </div>
  );
};

export default Main;
