const { 
    provider, 
    program, 
    oracleAddress,
    PDA_SEED, 
    USER_DEPOSIT_ACCOUNT_SEED, 
    USER_BORROW_TRACKER_SEED, 
    userAccount, 
    anchor, 
    solanaWeb3,
    splToken, 
} = require('./common');


const { createMint, createAssociatedTokenAccount, getAssociatedTokenAddress } = require('@solana/spl-token');
const fs = require('fs');
const { connect } = require('http2');

const solToUSD = "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix";
const adminConfig = anchor.web3.Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('./adminConfig.json', 'utf-8'))));
console.log("adminConfig is: ", adminConfig);
console.log("userAccount is: ", userAccount);

async function borrow() {
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
    
    console.log("provider wallet public key is: ", provider.wallet.publicKey);
    console.log("pdaAccount is: ", pdaAccount);
    console.log("userDepositAccount is: ", userDepositAccount);
    console.log("userBorrowTracker is: ", userBorrowTracker);

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

    console.log("mint is: ", mint);

    const associatedAddress = await getAssociatedTokenAddress(
        provider.wallet.publicKey,
        mint,
        splToken.TOKEN_PROGRAM_ID,
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID
    );

    console.log("associatedAddress is: ", associatedAddress);

    const accountInfo = await provider.connection.getAccountInfo(associatedAddress);
    console.log("accountInfo is: ", accountInfo);
    let borrowerDebtTokenAccount;

    if (accountInfo === null) {
        borrowerDebtTokenAccount = await createAssociatedTokenAccount(
            provider.connection,
            userAccount,
            mint,
            userAccount.publicKey,
            undefined,
            splToken.TOKEN_PROGRAM_ID,
            splToken.ASSOCIATED_TOKEN_PROGRAM_ID
        );
        console.log("borrowerDebtTokenAccount is (defined here): ", borrowerDebtTokenAccount);
    } else {
        borrowerDebtTokenAccount = associatedAddress;
    }

    console.log("borrowerDebtTokenAccount is: ", borrowerDebtTokenAccount);

    console.log("Borrowing...");
    await program.rpc.borrow(new anchor.BN(5), {
        accounts: {
            config: adminConfig.publicKey,
            userDepositAccount: userDepositAccount,
            userBorrowTracker: userBorrowTracker, 
            pythLoanAccount: new anchor.web3.PublicKey(solToUSD),
            borrowerDebtTokenAccount: borrowerDebtTokenAccount,
            debtTokenMint: mint,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
            userAccount: userAccount.publicKey,
            systemProgram: solanaWeb3.SystemProgram.programId,
            pdaAccount: pdaAccount,
        },
        signers: [userAccount],
    });
    console.log("Borrow successful.");
}

borrow().catch(err => console.error(err));

