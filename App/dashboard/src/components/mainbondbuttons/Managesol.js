import React, { useEffect, useState } from "react";
import "../mainbonds.css";

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
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-header">
          <h2>Modal Title</h2>
          <div className="modal-navigation">
            <button
              className={localActiveTab === "DEPOSIT" ? "active" : ""}
              onClick={() => setLocalActiveTab("DEPOSIT")}
            >
              DEPOSIT
            </button>
            <button
              className={localActiveTab === "WITHDRAW" ? "active" : ""}
              onClick={() => setLocalActiveTab("WITHDRAW")}
            >
              WITHDRAW
            </button>
            {/* Add other buttons for STAKE, UNSTAKE, and REWARDS here */}
          </div>
        </div>
        <div className="modal-body">
          {localActiveTab === "DEPOSIT" && (
            <form onSubmit={handleSubmit}>
              {/* Your form content for DEPOSIT tab */}
              <input type="text" placeholder="Input 1" />
              <input type="text" placeholder="Input 2" />
              <button type="submit">Submit</button>
              <button onClick={onClose}>Cancel</button>
            </form>
          )}

          {localActiveTab === "WITHDRAW" && (
            <form onSubmit={handleSubmit}>
              {/* Your form content for WITHDRAW tab */}
              <input type="text" placeholder="Input 3" />
              <input type="text" placeholder="Input 4" />
              <button type="submit">Submit</button>
              <button onClick={onClose}>Cancel</button>
            </form>
          )}

{activeTab === "STAKE" && (
            <form onSubmit={handleSubmit}>
              {/* Your form content for STAKE tab */}
              <input type="text" placeholder="Input 5" />
              <input type="text" placeholder="Input 6" />
              <button type="submit">Submit</button>
              <button onClick={onClose}>Cancel</button>
            </form>
          )}

          {activeTab === "UNSTAKE" && (
            <form onSubmit={handleSubmit}>
              {/* Your form content for UNSTAKE tab */}
              <input type="text" placeholder="Input 7" />
              <input type="text" placeholder="Input 8" />
              <button type="submit">Submit</button>
              <button onClick={onClose}>Cancel</button>
            </form>
          )}

          {activeTab === "REWARDS" && (
            <form onSubmit={handleSubmit}>
              {/* Your form content for REWARDS tab */}
              <input type="text" placeholder="Input 9" />
              <input type="text" placeholder="Input 10" />
              <button type="submit">Submit</button>
              <button onClick={onClose}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Managesol;

