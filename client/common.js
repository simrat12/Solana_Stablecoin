const anchor = require('@project-serum/anchor');
const solanaWeb3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');
require('dotenv').config({ path: '../.env' });

// Define the network and establish a connection
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

// Replace with your program's ID
const program = anchor.workspace.SolAnchorContract;
console.log(program);

// Path to SOL/USD price feed oracle: https://pyth.network/price-feeds/crypto-sol-usd?cluster=devnet 
const solToUSD = "5U3bH5b6XtG99aVWLqwVzYPVpQiFHytBD68Rz2eFPZd7";

// Define the PDA seeds. Replace with your PDA seeds.
const PDA_SEED = "pda_account";
const USER_DEPOSIT_ACCOUNT_SEED = "user_deposit_account";

const userAccount = provider.wallet.payer;

module.exports = {
    provider,
    program,
    solToUSD,
    PDA_SEED,
    USER_DEPOSIT_ACCOUNT_SEED,
    userAccount,
    anchor,
    solanaWeb3,
    splToken
};
