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

async function main() {
    const [pdaAccount, pdaNonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(PDA_SEED), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    const [userDepositAccount, userDepositNonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(USER_DEPOSIT_ACCOUNT_SEED), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    const userAccount = provider.wallet.payer;

    console.log("Creating accounts...");
    await program.rpc.createAccounts({
        accounts: {
            userAccount: userAccount.publicKey,
            pdaAccount: pdaAccount,
            userDepositAccount: userDepositAccount,
            systemProgram: solanaWeb3.SystemProgram.programId,
        },
        signers: [userAccount],
    });
    console.log("Accounts created.");

    const mint = await splToken.Token.createMint(
        provider.connection,
        userAccount,
        pdaAccount,
        null,
        9,
        splToken.TOKEN_PROGRAM_ID,
    );
    
    const borrowerDebtTokenAccount = await mint.createAssociatedTokenAccount(userAccount.publicKey);

    console.log("Depositing...");
    await program.rpc.deposit(new anchor.BN(100), {
        accounts: {
            userAccount: userAccount.publicKey,
            pdaAccount: pdaAccount,
            userDepositAccount: userDepositAccount,
            systemProgram: solanaWeb3.SystemProgram.programId,
        },
        signers: [userAccount],
    });
    console.log("Deposit successful.");

    console.log("Borrowing...");
    await program.rpc.borrow(new anchor.BN(50), {
        accounts: {
            userDepositAccount: userDepositAccount,
            userBorrowTracker: userAccount.publicKey,
            pythLoanAccount: new anchor.web3.PublicKey(oracleAddress),
            borrowerDebtTokenAccount: borrowerDebtTokenAccount,
            debtTokenMint: mint.publicKey,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
            user: userAccount.publicKey,
            systemProgram: solanaWeb3.SystemProgram.programId,
        },
        signers: [userAccount],
    });
    console.log("Borrow successful.");
}

main().catch((err) => {
    console.error(err);
});
