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

const { getAssociatedTokenAddress } = require('@solana/spl-token');
const fs = require('fs');

const solToUSD = "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix";
const adminConfig = anchor.web3.Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('./adminConfig.json', 'utf-8'))));

// Provide your mint PublicKey
const mint = new anchor.web3.PublicKey('fiFz9FU4kj4pAD3LFXPeboVgRz3LBrWcN32SdNjxM6i'); // Replace with the actual debt token mint address

async function repay() {
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

    // Assuming you are using the same mint for the borrower's debt token account as in the borrow() function
    const borrowerDebtTokenAccount = await getAssociatedTokenAddress(
        mint, // Replace with the actual debt token mint address
        provider.wallet.publicKey,
        undefined, // Replace with the boolean value that allows the owner account to be a PDA (Program Derived Address)
        splToken.TOKEN_PROGRAM_ID,
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID
    );

    console.log("borrowerDebtTokenAccount is: ", borrowerDebtTokenAccount);

    console.log("Repaying...");
    await program.rpc.repay(new anchor.BN(1), {
        accounts: {
            userAccount: userAccount.publicKey,
            pdaAccount: pdaAccount,
            userDepositAccount: userDepositAccount,
            userBorrowTracker: userBorrowTracker,
            pythLoanAccount: new anchor.web3.PublicKey(solToUSD),
            borrowerDebtTokenAccount: borrowerDebtTokenAccount,
            debtTokenMint: mint,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
            systemProgram: solanaWeb3.SystemProgram.programId,
            config: adminConfig.publicKey,
        },
        signers: [userAccount],
    });
    console.log("Repay successful.");
}

repay().catch(err => console.error(err));


