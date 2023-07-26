import React, { useEffect, useState } from "react";
import web3 from "../web3";
import "./dashboard/dashboard.css";
import "./mainbonds.css";
import Innerbonds from "./dashboard/Innerbonds";
import Statistics from "./dashboard/Statistics";
import Managesol from "./mainbondbuttons/Managesol";
import BuyModal from "./mainbondbuttons/BuyModal";
import SellModal from "./mainbondbuttons/SellModal";

const Mainbonds = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (web3.currentProvider) {
        try {
          await web3.currentProvider.request({ method: "eth_requestAccounts" });
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


  return (
    <div>
      {isWalletConnected ? (
        <div className="dashit">
          <div className="row">
            <span>
              <button id="bondsbut">
                Manage Solstable
              </button>
              <button id="bondsbut">
                Buy bLUSD
              </button>
              <button
                
                id="bondsbut"
                            >
                Sell bLUSD
              </button>
            </span>
            <div className="col-lg-12">
              <Innerbonds />
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
