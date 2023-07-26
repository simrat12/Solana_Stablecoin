const { 
    provider, 
    program, 
    PDA_SEED, 
    USER_DEPOSIT_ACCOUNT_SEED, 
    userAccount, 
    anchor, 
    solanaWeb3 
} = require('./common');

// Call functions similar to how you have done in createAccounts.js

async function deposit() {
    const [pdaAccount, pdaNonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(PDA_SEED), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    const [userDepositAccount, userDepositNonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(USER_DEPOSIT_ACCOUNT_SEED), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    console.log("Depositing...");
    await program.rpc.deposit(new anchor.BN(1), {
        accounts: {
            userAccount: userAccount.publicKey,
            pdaAccount: pdaAccount,
            userDepositAccount: userDepositAccount,
            systemProgram: solanaWeb3.SystemProgram.programId,
        },
        signers: [userAccount],
    });
    console.log("Deposit successful.");

}

deposit().catch(err => console.error(err));