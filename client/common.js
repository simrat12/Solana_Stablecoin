const anchor = require('@project-serum/anchor');
const solanaWeb3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');
require('dotenv').config({ path: '../.env' });

// Define the network and establish a connection
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

// Replace with your program's ID
const program = anchor.workspace.SolAnchorContract;

// Define the Pyth Oracle Account. Replace with the address of the pyth oracle account.
const oracleAddress = "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG";

// Define the PDA seeds. Replace with your PDA seeds.
const PDA_SEED = "pda_account";
const USER_DEPOSIT_ACCOUNT_SEED = "user_deposit_account";

const userAccount = provider.wallet.payer;

module.exports = {
    provider,
    program,
    oracleAddress,
    PDA_SEED,
    USER_DEPOSIT_ACCOUNT_SEED,
    userAccount,
    anchor,
    solanaWeb3,
    splToken
};
