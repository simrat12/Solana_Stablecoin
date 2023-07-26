const { 
    provider, 
    program, 
    oracleAddress,
    PDA_SEED, 
    USER_DEPOSIT_ACCOUNT_SEED, 
    userAccount, 
    anchor, 
    solanaWeb3,
    splToken, 
} = require('./common');

const { createMint, createAssociatedTokenAccount } = require('@solana/spl-token');
// Call functions similar to how you have done in createAccounts.js

async function borrow() {
    const [pdaAccount, pdaNonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(PDA_SEED), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    const [userDepositAccount, userDepositNonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(USER_DEPOSIT_ACCOUNT_SEED), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    // console.log("provider connection: ", provider.connection);
    // console.log("userAccount", userAccount);
    // console.log("pdaAccount: ", pdaAccount.toBase58());
    // console.log("userDepositAccount: ", userDepositAccount.toBase58());
    // console.log(splToken.TOKEN_PROGRAM_ID);

    console.log("creating mint account");
    const mint = await createMint(
        provider.connection,
        userAccount,
        pdaAccount,
        null,
        9,
        undefined,
        undefined,
        splToken.TOKEN_PROGRAM_ID
    );
    
    const borrowerDebtTokenAccount = await createAssociatedTokenAccount(
        provider.connection, // connection
        userAccount, // payer
        mint, // mint
        userAccount.publicKey, // owner
        undefined, // confirmOptions
        splToken.TOKEN_PROGRAM_ID, // programId
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID // associatedTokenProgramId
    );

    console.log("Borrowing...");
    await program.rpc.borrow(new anchor.BN(50), {
        accounts: {
            userDepositAccount: userDepositAccount,
            userBorrowTracker: userAccount.publicKey,
            pythLoanAccount: new anchor.web3.PublicKey(oracleAddress),
            borrowerDebtTokenAccount: borrowerDebtTokenAccount,
            debtTokenMint: mint,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
            user: userAccount.publicKey,
            systemProgram: solanaWeb3.SystemProgram.programId,
        },
        signers: [userAccount],
    });
    console.log("Borrow successful.");
}

borrow().catch(err => console.error(err));