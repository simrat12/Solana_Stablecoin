import React from "react";
import { Link } from "react-router-dom";

const Pagebonds = () => {
  return (
    <div id="dash" className="col-md-8">
      <div id="content">
        <h2>Pending Bonds</h2>
        <p>
          <b>You don't have any pending bonds.</b>
        </p>
        <p>
          You can bond LUSD to obtain Boosted LUSD (bLUSD), a yield-amplified
          version of LUSD.
        </p>

        <div className="col-md-12 text-center">
          <Link to="/mainbonds">
            <button
              id="submitbut"
              type="button" // Change to "button" instead of "submit"
              className="button button-a button-big button-rounded"
            >
              Go To Bonds
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pagebonds;
