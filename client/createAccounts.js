const { 
    provider, 
    program, 
    PDA_SEED, 
    USER_DEPOSIT_ACCOUNT_SEED, 
    userAccount, 
    anchor, 
    solToUSD,
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

    const adminConfig = anchor.web3.Keypair.generate();
    console.log(userAccount.publicKey);

    console.log("Creating accounts...");
    await program.rpc.createAccounts(new anchor.web3.PublicKey(solToUSD), {
        accounts: {
            userAccount: userAccount.publicKey,
            pdaAccount: pdaAccount,
            userDepositAccount: userDepositAccount,
            systemProgram: solanaWeb3.SystemProgram.programId,
            config: adminConfig.publicKey,
        },
        signers: [userAccount, adminConfig],
    });
    console.log("Accounts created.");
}

createAccounts().catch((err) => {
    console.error(err);
});

