import React, { useState } from "react";

const Stack = () => {
  const [showForm, setShowForm] = useState(false);
  const [field1, setField1] = useState("");

  const handleEdit = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setField1("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to handle form submission
  };

  if (showForm) {
    return (
      <div id="dash" className="col-md-9">
        <h2>Stability Pool</h2>

        <div className="maincard">
          <div className="stake">
            <label id="stake-lqty-label" className="css-1owdu0o">
              <div className="css-zkfaav">Stake</div>
            </label>

            <div className="col-md-12 mb-3">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="0.00 LQTY"
                  value={field1}
                  onChange={(e) => setField1(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="css-jwa8lq">
            <label className="css-1owdu0o">
              <div className="css-zkfaav">Pool share</div>
            </label>
            <div id="stake-share" className="css-t8geth">
              <div className="css-zkfaav">
                <span className="css-8mokm4">0.000000</span>&nbsp;
                <span className="css-x2c3dj">%</span>
              </div>
            </div>
          </div>

          <p>Enter the amount of LUSD you'd like to Stake.</p>
          <div className="col-md-12 text-center">
            <button
              id="cancelbut"
              onClick={handleCancel}
              type="button" // Change to "button" instead of "submit"
              className="button button-a button-big button-rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              id="submitbut"
              type="submit" // Change to "button" instead of "submit"
              className="button button-a button-big button-rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="dash" className="col-md-9">
      <div id="content">
        <h2>Staking</h2>
        <p>
          <b>You haven't staked LQTY yet.</b>
        </p>
        <p>
        Enter the amount of LQTY you'd like to stake
        </p>

        <div className="col-md-12 text-center">
          <button
            id="submitbut"
            onClick={handleEdit}
            type="button" // Change to "button" instead of "submit"
            className="button button-a button-big button-rounded"
          >
            Start Staking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stack;
