import React, { useState } from "react";

const Deposit = ({ handleSubmit, onClose }) => {
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");

  return (
    <div className="maincard">
      <div className="stake">
        <div className="col-md-12 mb-3">
          <form>
            <div className="form-group">
              <label className="css-1owdu0o">
                <div className="css-zkfaav">bLUSD Amount</div>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="0.00 bLUSD"
                value={field1}
                onChange={(e) => setField1(e.target.value)}
                required
              />

              <label className="css-1owdu0o">
                <div className="css-zkfaav">LUSD amount</div>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="0.00 LUSD"
                value={field2}
                onChange={(e) => setField2(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
      </div>

      <div>
        <p>
          <b>Mint LP tokens: </b>0.00
        </p>
      </div>

      <div>
        <input type="checkbox" id="red" name="deposit" value="red" />
        <label for="red">Deposit tokens in a balanced ratio</label>
      </div>
      <div>
        <input type="checkbox" id="blue" name="stake" value="blue" />
        <label for="blue">Stake LP tokens in Curve gauge</label>
      </div>

      <details>Pool details</details>

      <br />
      <button
        style={cancelbut}
        type="button"
        onClick={onClose}
        className="button-style"
      >
        Cancel
      </button>
      <button style={submitbut} type="submit" className="button-style">
        Confirm
      </button>
    </div>
  );
};

export default Deposit;

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
