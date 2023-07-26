import React, { useEffect, useState } from "react";
import web3 from "../web3";
import "./dashboard/dashboard.css";
import "./mainbonds.css";
import Innerbonds from "./dashboard/Innerbonds";
import Statistics from "./dashboard/Statistics";
import Managesol from "./mainbondbuttons/Managesol";
import SellModal from "./mainbondbuttons/SellModal";
import BuyModal from "./mainbondbuttons/BuyModal";

const Mainbonds = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isManageSolModalOpen, setIsManageSolModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

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

  const handleManageSolClick = () => {
    setIsManageSolModalOpen(true);
  };

  const handleCloseManageSolModal = () => {
    setIsManageSolModalOpen(false);
  };

  const handleBuyModalClick = () => {
    setIsBuyModalOpen(true);
  };
  
  const handleCloseBuyModal = () => {
    setIsBuyModalOpen(false);
  };
  
  const handleSellModalClick = () => {
    setIsSellModalOpen(true);
  };
  
  const handleCloseSellModal = () => {
    setIsSellModalOpen(false);
  };

  const handleBuySubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    // For example, you can get the form data and handle the buy process
    // const formData = new FormData(e.target);
    // const amount = formData.get("amount");
    // const address = formData.get("address");
    // Perform the buy operation with 'amount' and 'address' data
    // Close the modal
    handleCloseBuyModal();
  };

  const handleSellSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    // For example, you can get the form data and handle the buy process
    // const formData = new FormData(e.target);
    // const amount = formData.get("amount");
    // const address = formData.get("address");
    // Perform the buy operation with 'amount' and 'address' data
    // Close the modal
    handleCloseSellModal();
  };

  return (
    <div>
      {isWalletConnected ? (
        <div className="dashit">
          <div className="row">
            <span>
              <button id="bondsbut" onClick={handleManageSolClick}>
                Manage Solstable
              </button>
              <button id="bondsbut" onClick={handleBuyModalClick}>
                Buy bLUSD
              </button>
              <button id="bondsbut" onClick={handleSellModalClick}>Sell bLUSD</button>
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

      {/* Render the Managesol modal if isManageSolModalOpen is true */}
      {isManageSolModalOpen && (
        <Managesol onClose={handleCloseManageSolModal} activeTab="DEPOSIT" />
      )}

      {/* Render the BuyModal if isBuyModalOpen is true */}
      {isBuyModalOpen && (
        <BuyModal onClose={handleCloseBuyModal} onSubmit={handleBuySubmit} />
      )}

      {/* Render the SellModal if isSellModalOpen is true */}
      {isSellModalOpen && (
        <SellModal onClose={handleCloseSellModal} onSubmit={handleSellSubmit} />
      )}
    </div>
  );
};

export default Mainbonds;
