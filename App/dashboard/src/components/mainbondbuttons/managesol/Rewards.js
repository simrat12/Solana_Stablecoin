import React, { useState } from "react";

const Withdraw = ({ handleSubmit, onClose }) => {

  return (
    <div className="maincard">

      <div>
        <h3>Rewards</h3>
        <p>
          <b>SUSD: </b>0.00
        </p>
        <p>
          <b>bSUSD LP APR: </b>0.01%
        </p>
      </div>

      <br />
      <button
        style={cancelbut}
        type="button"
        onClick={onClose}
        className="button-style"
      >
        Back
      </button>
      <button style={submitbut} type="submit" className="button-style">
        Claim all Rewards
      </button>
    </div>
  );
};

export default Withdraw;

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
