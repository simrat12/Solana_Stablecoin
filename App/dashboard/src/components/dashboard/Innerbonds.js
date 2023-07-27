import React, { useState } from "react";

const Innerbonds = () => {
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
      <div id="dash" className="col-md-8">
        <h2>SUSD Bonds</h2>

        <div className="maincard">
          <div className="stake">
            <label id="stake-lqty-label" className="css-1owdu0o">
              <div className="css-zkfaav">Deposit</div>
            </label>

            <div className="col-md-12 mb-3">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="0.00 SUSD"
                  value={field1}
                  onChange={(e) => setField1(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <p>
              <b>Rebond time return : </b>N/A SUSD
            </p>
            <p>
              <b>Rebond time ROI: </b>N/A
            </p>
            <p>
              <b>Max APR : </b>N/A
            </p>
          </div>

          <p>
            <b>The minimum bond amount is 100 SUSD.</b>
          </p>
          <p>
            You can cancel your bond at any time to recover your deposited SUSD
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
        <h2>SUSD Bonds</h2>
        <p>
          <b>You don't have any pending bonds.</b>
        </p>
        <p>
          You can bond SUSD to obtain Boosted SUSD (bSUSD), a yield-amplified
          version of SUSD.
        </p>

        <div className="col-md-12 text-center">
          <button
            id="submitbut"
            onClick={handleEdit}
            type="button" // Change to "button" instead of "submit"
            className="button button-a button-big button-rounded"
          >
            Create Bond
          </button>
        </div>
      </div>
    </div>
  );
};

export default Innerbonds;
