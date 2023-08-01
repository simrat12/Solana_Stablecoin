import React, { useEffect, useState } from "react";
import Deposit from "./managesol/Deposit";
import Rewards from "./managesol/Rewards";
import Stake from "./managesol/Stake";
import Unstake from "./managesol/Unstake";
import Withdraw from "./managesol/Withdraw";
import { Program, AnchorProvider } from "@project-serum/anchor";
import { Keypair, PublicKey, SystemProgram, web3, Connection, clusterApiUrl } from "@solana/web3.js";
import IDL from "./contractIDL/sol_anchor_contract.json";
import { Buffer } from 'buffer';
import BufferMock from './bufferMock';

const PROGRAM_ID = "CvhsZhKCwMDjB7z77ixon6NU4fzEViu2TnvMvwoEY82V";
const PROGRAM_ADDRESS = new PublicKey(PROGRAM_ID);
const PDA_SEED = "pda_account";
const USER_DEPOSIT_ACCOUNT_SEED = "user_deposit_account";
const USER_BORROW_TRACKER_SEED = "user_borrow_tracker";
const SOL_TO_USD = "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix";

const Managesol = ({ onClose, activeTab }) => {
  const [localActiveTab, setLocalActiveTab] = useState(activeTab);
  const [provider, setProvider] = useState(null);
  const [program, setProgram] = useState(null);
  const connection = new Connection("https://api.devnet.solana.com");

  useEffect(() => {
    setLocalActiveTab(activeTab);
    
    // Initialize the provider and program
    if (window.solana && window.solana.isPhantom) {
      // Specify the network
      const network = "devnet";
      const rpcHost = clusterApiUrl(network);

      // Initialize Connection
      const connection = new Connection(rpcHost);

      // Initialize Wallet
      let wallet;
      if (window.solana && window.solana.isPhantom) {
        wallet = window.solana;
        console.log("Connected to Phantom wallet");
      }

      // Initialize Provider
      let provider;
      if (wallet) {
        provider = new AnchorProvider(connection, wallet, {
          preflightCommitment: "recent",
        });
        console.log("Provider and program initialized.");
        console.log("Provider's connection:", provider.connection);
      }
      try {
        const program = new Program(IDL, PROGRAM_ADDRESS, provider);
        setProvider(provider);
        setProgram(program);
        console.log("Provider and program initialized.");
        console.log("Provider wallet publicKey:", window.solana.publicKey.toString());
        console.log("programId:", program.programId.toString());
        console.log("RPC Endpoint:", provider.connection);
      } catch (error) {
        console.log("Failed to initialize provider and program:", error);
      }
    }
  }, [activeTab]);

  const createAccounts = async () => {
    const adminConfig = Keypair.generate();
    const ownerPubkey = Buffer.from(window.solana.publicKey.toBytes());

    console.log("ownerPubkey is: ", ownerPubkey);
    
    const [pdaAccount] = await PublicKey.findProgramAddress(
      [Buffer.from(PDA_SEED), ownerPubkey],
      program.programId
    );
    
    console.log("pdaAccount is: ", pdaAccount);
    
    const [userDepositAccount] = await PublicKey.findProgramAddress(
      [Buffer.from(USER_DEPOSIT_ACCOUNT_SEED), ownerPubkey],
      program.programId
    );
    
    const [userBorrowTracker] = await PublicKey.findProgramAddress(
      [Buffer.from(USER_BORROW_TRACKER_SEED), ownerPubkey],
      program.programId
    );

    const adminConfigData = {
      loanPriceFeedId: new PublicKey(SOL_TO_USD),
    };

    console.log(provider.connection);

    try {
      await program.rpc.createAccounts(adminConfigData, {
        accounts: {
          userAccount: window.solana.publicKey,
          pdaAccount: pdaAccount,
          userDepositAccount: userDepositAccount,
          userBorrowTracker: userBorrowTracker,
          systemProgram: SystemProgram.programId,
          config: adminConfig.publicKey,
        },
        signers: [adminConfig],
      });

      // Save the secret key to localStorage instead of file system on the client side
      localStorage.setItem('adminConfig', JSON.stringify(Array.from(adminConfig.secretKey)));

      console.log("Accounts created.");
    } catch (error) {
      console.error("Failed to create accounts:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localActiveTab === "DEPOSIT") {
      console.log("Creating accounts...");
      createAccounts();
    }
    // Add logic for other tabs here
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div style={headerStyle}>
          <h2>Manage Solstable</h2>
          <div style={navigationStyle}>
            <button
              style={
                localActiveTab === "DEPOSIT" ? activeButtonStyle : buttonStyle
              }
              onClick={() => setLocalActiveTab("DEPOSIT")}
            >
              Create Accounts
            </button>
            <button
              style={
                localActiveTab === "WITHDRAW" ? activeButtonStyle : buttonStyle
              }
              onClick={() => setLocalActiveTab("WITHDRAW")}
            >
              WITHDRAW
            </button>
            <button
              style={
                localActiveTab === "STAKE" ? activeButtonStyle : buttonStyle
              }
              onClick={() => setLocalActiveTab("STAKE")}
            >
              STAKE
            </button>
            <button
              style={
                localActiveTab === "UNSTAKE" ? activeButtonStyle : buttonStyle
              }
              onClick={() => setLocalActiveTab("UNSTAKE")}
            >
              UNSTAKE
            </button>
            <button
              style={
                localActiveTab === "REWARDS" ? activeButtonStyle : buttonStyle
              }
              onClick={() => setLocalActiveTab("REWARDS")}
            >
              REWARDS
            </button>
          </div>
        </div>
        <div>
          {localActiveTab === "DEPOSIT" && (
            <Deposit handleSubmit={createAccounts} onClose={onClose} />
          )}

          {localActiveTab === "WITHDRAW" && (
            <Withdraw handleSubmit={handleSubmit} onClose={onClose} />
          )}

          {localActiveTab === "STAKE" && (
            <Stake handleSubmit={handleSubmit} onClose={onClose} />
          )}

          {localActiveTab === "UNSTAKE" && (
            <Unstake handleSubmit={handleSubmit} onClose={onClose} />
          )}

          {localActiveTab === "REWARDS" && (
            <Rewards handleSubmit={handleSubmit} onClose={onClose} />
          )}

        </div>
      </div>
    </div>
  );
};

export default Managesol;

const modalStyle = {
  /* Your modal style here */
  position: "fixed",
  zIndex: "9999",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  /* Your modal content style here */
  width: "40%",
  backgroundColor: "rgb(234, 241, 241)",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const closeButtonStyle = {
  /* Your close button style here */
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
  fontSize: "1.5rem",
};

const headerStyle = {
  /* Your modal header style here */
  marginBottom: "20px",
  textAlign: "center",
};

const navigationStyle = {
  /* Your navigation button style here */
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const buttonStyle = {
  /* Your button style here */
  padding: "8px 12px",
  backgroundColor: "rgb(79, 209, 226)",
  color: "black",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  // margin: "10px",
  marginRight: "8px",
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

const activeButtonStyle = {
  /* Your active button style here */
  ...buttonStyle,
  backgroundColor: "goldenrod", // Change this to your desired active color
};
