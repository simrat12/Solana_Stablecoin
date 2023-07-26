import React, { useState } from "react";

const Withdraw = ({ handleSubmit, onClose }) => {
  const [field1, setField1] = useState("");

  return (
    <div className="maincard">
      <div className="stake">
        <div className="col-md-12 mb-3">
          <form>
            <div className="form-group">
              <label className="css-1owdu0o">
                <div className="css-zkfaav">Burn LP Tokens</div>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="0.00"
                value={field1}
                onChange={(e) => setField1(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
      </div>

      <div>
        <p>
          <b>WITHDRAW: </b>0.00 bLUSD + 0.00 LUSD
        </p>
      </div>

      <details>Pool Details</details>

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
        Approve
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
