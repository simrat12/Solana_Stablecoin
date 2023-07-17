import React, { useState } from "react";
import "./dashboard.css";

const Trove = () => {
  const [showForm, setShowForm] = useState(false);
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");

  const handleEdit = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setField1("");
    setField2("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to handle form submission
  };

  if (showForm) {
    return (
      <div id="dash" className="col-md-8">
        <h2>Trove</h2>

        <div className="maincard">
          <div className="stake">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <label className="css-1owdu0o">
                  <div className="css-zkfaav">Collateral</div>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="0.00 ETH"
                  value={field1}
                  onChange={(e) => setField1(e.target.value)}
                  required
                />

                <label className="css-1owdu0o">
                  <div className="css-zkfaav">Borrow</div>
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
            </div>
          </div>

          <div>
            <p>
              <b>Liquidation Reserve: </b>200 LUSD
            </p>
            <p>
              <b>Borrowing Fee: </b>0.00 LUSD (0.51%)
            </p>
            <p>
              <b>Total debt: </b>200.00 LUSD
            </p>
            <p>
              <b>Liquidation price (Normal mode): </b>N/A
            </p>
            <p>
              <b>Liquidation price (Recovery mode): </b>N/A
            </p>
            <p>
              <b>Collateral ratio: </b>N/A
            </p>
          </div>

          <p>
            Start by entering the amount of ETH you'd like to deposit as
            collateral.
          </p>
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
    <div id="dash" className="col-md-8">
      <div id="content">
        <h2>Trove</h2>
        <p>
          <b>You haven't borrowed any LUSD yet.</b>
        </p>
        <p>You can borrow LUSD against ETH collateral by opening a Trove.</p>

        <div className="col-md-12 text-center">
          <button
            id="submitbut"
            onClick={handleEdit}
            type="button" // Change to "button" instead of "submit"
            className="button button-a button-big button-rounded"
          >
            Open Trove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trove;
