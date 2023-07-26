import React, { useState } from "react";

const BuyModal = ({ onClose, onSubmit }) => {
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");

  const handleBuySubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    // For example, you can get the form data and handle the buy process
    // const formData = new FormData(e.target);
    // const amount = formData.get("amount");
    // const address = formData.get("address");
    // Perform the buy operation with 'amount' and 'address' data
    // Close the modal
    onClose();
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 style={header}>BUY bLUSD</h2>
        <div className="maincard">
          <div className="stake">
            <div className="col-md-12 mb-3">
             <form>
             <div className="form-group">
                <label className="css-1owdu0o">
                  <div className="css-zkfaav">Sell</div>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="0.00 LUSD"
                  value={field1}
                  onChange={(e) => setField1(e.target.value)}
                  required
                />

                <label className="css-1owdu0o">
                  <div className="css-zkfaav">Buy</div>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="0.00 BLUSD"
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
              <b>Exchange Rate: </b>0.8574 LUSD:bLUSD
            </p>
            <p>
              <b>Price impact: </b>0.0000%
            </p>
          </div>

          <p>Your swap is performed directly in Curve protocol.</p>

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
      </div>
    </div>
  );
};

export default BuyModal;

// Inline CSS styles for the modal
const header = {
  textAlign: "center",
};
const modalStyle = {
  display: "block",
  position: "fixed",
  zIndex: "9999",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
};

const modalContentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  backgroundColor: "rgb(234, 241, 241)",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
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
