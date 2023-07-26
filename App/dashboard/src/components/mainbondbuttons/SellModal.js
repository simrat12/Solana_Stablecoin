import React from "react";
import "../mainbonds.css";

const SellModal = ({ onClose, onSubmit }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Buy bLUSD</h2>
        <form onSubmit={onSubmit}>
          <label>
            Amount:
            <input type="number" name="amount" />
          </label>
          <br />
          <label>
            Address:
            <input type="text" name="address" />
          </label>
          <br />
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SellModal;
