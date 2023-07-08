import React from 'react';

const Nowallet = ({ isWalletConnected }) => {
  if (isWalletConnected) {
    return null; // Do not render the component if wallet is connected
  }

  return (
    <div className="nowallet" style={styles.container}>
      <h2 style={styles.heading}>Please Connect to a Web3 Wallet</h2>
      <p style={styles.paragraph}>
        To access this application, please connect to a Web3 wallet such as Metamask.
      </p>
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
