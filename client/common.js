const anchor = require('@project-serum/anchor');
const solanaWeb3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');
require('dotenv').config({ path: '../.env' });

// Define the network and establish a connection
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

// Replace with your program's ID
const program = anchor.workspace.SolAnchorContract;
// console.log(program);

// Path to SOL/USD price feed oracle: https://pyth.network/price-feeds/crypto-sol-usd?cluster=devnet 
const solToUSD = "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix";

// Define the PDA seeds. Replace with your PDA seeds.
const PDA_SEED = "pda_account";
const USER_DEPOSIT_ACCOUNT_SEED = "user_deposit_account";
const USER_BORROW_TRACKER_SEED = "user_borrow_tracker";

const userAccount = provider.wallet.payer;

module.exports = {
    provider,
    program,
    solToUSD,
    PDA_SEED,
    USER_DEPOSIT_ACCOUNT_SEED,
    USER_BORROW_TRACKER_SEED,
    userAccount,
    anchor,
    solanaWeb3,
    splToken
};
