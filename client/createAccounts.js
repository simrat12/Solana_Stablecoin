const { 
    provider, 
    program, 
    PDA_SEED, 
    USER_DEPOSIT_ACCOUNT_SEED, 
    USER_BORROW_TRACKER_SEED,
    userAccount, 
    anchor, 
    solToUSD,
    solanaWeb3 
} = require('./common');
const fs = require('fs');

console.log("program is is: ", program.programId);

async function createAccounts() {
    const [pdaAccount, pdaNonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(PDA_SEED), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    const [userDepositAccount, userDepositNonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(USER_DEPOSIT_ACCOUNT_SEED), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    const [userBorrowTracker, userBorrowNonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(USER_BORROW_TRACKER_SEED), provider.wallet.publicKey.toBuffer()],
        program.programId
    );

    const adminConfig = anchor.web3.Keypair.generate();
    fs.writeFileSync('./adminConfig.json', JSON.stringify(Array.from(adminConfig.secretKey)));
    console.log("admintConfig is: ", userAccount);
    console.log(userAccount.publicKey);

    const adminConfigData = {
        loanPriceFeedId: new anchor.web3.PublicKey(solToUSD),
      };

    console.log("Creating accounts...");
    await program.rpc.createAccounts(adminConfigData, {
        accounts: {
            userAccount: userAccount.publicKey,
            pdaAccount: pdaAccount,
            userDepositAccount: userDepositAccount,
            userBorrowTracker: userBorrowTracker,
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

