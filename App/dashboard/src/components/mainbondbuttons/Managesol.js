import React, { useEffect, useState } from "react";
import Deposit from "./managesol/Deposit";
import Rewards from "./managesol/Rewards";
import Stake from "./managesol/Stake";
import Unstake from "./managesol/Unstake";
import Withdraw from "./managesol/Withdraw";

const Managesol = ({ onClose, activeTab }) => {
  const [localActiveTab, setLocalActiveTab] = useState(activeTab);

  useEffect(() => {
    setLocalActiveTab(activeTab);
  }, [activeTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div style={headerStyle}>
          <h2>Manage Solstable</h2>
          <div style={navigationStyle}>
            <button
              style={
                localActiveTab === "DEPOSIT" ? activeButtonStyle : buttonStyle
              }
              onClick={() => setLocalActiveTab("DEPOSIT")}
            >
              DEPOSIT
            </button>
            <button
              style={
                localActiveTab === "WITHDRAW" ? activeButtonStyle : buttonStyle
              }
              onClick={() => setLocalActiveTab("WITHDRAW")}
            >
              WITHDRAW
            </button>
            <button
              style={
                localActiveTab === "STAKE" ? activeButtonStyle : buttonStyle
              }
              onClick={() => setLocalActiveTab("STAKE")}
            >
              STAKE
            </button>
            <button
              style={
                localActiveTab === "UNSTAKE" ? activeButtonStyle : buttonStyle
              }
              onClick={() => setLocalActiveTab("UNSTAKE")}
            >
              UNSTAKE
            </button>
            <button
              style={
                localActiveTab === "REWARDS" ? activeButtonStyle : buttonStyle
              }
              onClick={() => setLocalActiveTab("REWARDS")}
            >
              REWARDS
            </button>
          </div>
        </div>
        <div>
          {localActiveTab === "DEPOSIT" && (
            <Deposit handleSubmit={handleSubmit} onClose={onClose} />
          )}

          {localActiveTab === "WITHDRAW" && (
            <Withdraw handleSubmit={handleSubmit} onClose={onClose} />
          )}

          {localActiveTab === "STAKE" && (
            <Stake handleSubmit={handleSubmit} onClose={onClose} />
          )}

          {localActiveTab === "UNSTAKE" && (
            <Unstake handleSubmit={handleSubmit} onClose={onClose} />
          )}

          {localActiveTab === "REWARDS" && (
            <Rewards handleSubmit={handleSubmit} onClose={onClose} />
          )}

        </div>
      </div>
    </div>
  );
};

export default Managesol;

const modalStyle = {
  /* Your modal style here */
  position: "fixed",
  zIndex: "9999",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  /* Your modal content style here */
  width: "40%",
  backgroundColor: "rgb(234, 241, 241)",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const closeButtonStyle = {
  /* Your close button style here */
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
  fontSize: "1.5rem",
};

const headerStyle = {
  /* Your modal header style here */
  marginBottom: "20px",
  textAlign: "center",
};

const navigationStyle = {
  /* Your navigation button style here */
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const buttonStyle = {
  /* Your button style here */
  padding: "8px 12px",
  backgroundColor: "rgb(79, 209, 226)",
  color: "black",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  // margin: "10px",
  marginRight: "8px",
};

const cancelbut = {
  /* Your button style here */
  padding: "8px 12px",
  backgroundColor: "rgb(129, 128, 125)",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "10px",
  marginRight: "8px",
};

const submitbut = {
  /* Your button style here */
  padding: "8px 12px",
  backgroundColor: "rgb(79, 209, 226)",
  color: "black",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "10px",
  marginRight: "8px",
};

const activeButtonStyle = {
  /* Your active button style here */
  ...buttonStyle,
  backgroundColor: "goldenrod", // Change this to your desired active color
};
