const { 
    provider, 
    program, 
    PDA_SEED, 
    USER_DEPOSIT_ACCOUNT_SEED, 
    userAccount, 
    anchor, 
    solanaWeb3 
} = require('./common');

async function createAccounts() {
    const [pdaAccount, pdaNonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(PDA_SEED), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    const [userDepositAccount, userDepositNonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(USER_DEPOSIT_ACCOUNT_SEED), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

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
}

createAccounts().catch((err) => {
    console.error(err);
});
