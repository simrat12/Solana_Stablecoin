import React from 'react';

const Nowallet = ({ connectWallet }) => {

  return (
    <div className="nowallet" style={styles.container}>
      <h2 style={styles.heading}>Please Connect to a Web3 Wallet</h2>
      <p style={styles.paragraph}>
        To access this application, please connect to a Web3 wallet such as Metamask.
      </p>
      <button style={{ backgroundColor: "rgb(79, 209, 226)", color: "#333333" }} className="btn btn-primary" onClick={connectWallet}>
        Connect Wallet
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '200px',
    padding: '20px',
    borderRadius: '5px',
    background: 'white',
    marginLeft: '50px',
    marginRight: '50px',
  },
  heading: {
    fontSize: '30px',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '20px',
    color: 'gold',
  },
};

export default Nowallet;
