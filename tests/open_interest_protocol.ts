import * as anchor from "@project-serum/anchor";
import { Keypair, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { strict as assert } from 'assert';

const provider = anchor.AnchorProvider.local();
anchor.setProvider(provider);
const walletKeyPair = Keypair.generate();

describe("sol_anchor_contract", () => {
  const program = anchor.workspace.SolAnchorContract;
  let userAccount = Keypair.generate();
  let depositAmount = new anchor.BN(LAMPORTS_PER_SOL);  // 1 SOL

  before(async () => {
    await provider.connection.confirmTransaction(
        await provider.connection.requestAirdrop(userAccount.publicKey, 1000 * LAMPORTS_PER_SOL),
        "confirmed",
    );
    console.log("Airdropped 1000 SOL to:", userAccount.publicKey.toBase58());
  });

  it("Creates accounts", async () => {
    const [pdaAccount, pdaNonce] = await PublicKey.findProgramAddress(
      [Buffer.from("pda_account"), userAccount.publicKey.toBuffer()],
      program.programId,
    );

    const [userDepositAccount, userDepositNonce] = await PublicKey.findProgramAddress(
      [Buffer.from("user_deposit_account"), userAccount.publicKey.toBuffer()],
      program.programId,
    );

    console.log("pdaAccount: ", pdaAccount.toBase58());
    console.log("userDepositAccount: ", userDepositAccount.toBase58());

    await program.rpc.createAccounts({
        accounts: {
          userAccount: userAccount.publicKey,
          pdaAccount: pdaAccount,
          userDepositAccount: userDepositAccount,
          systemProgram: SystemProgram.programId,
        },
        signers: [userAccount],
    });
  });

  it("Deposits", async () => {
    const [pdaAccount, pdaNonce] = await PublicKey.findProgramAddress(
      [Buffer.from("pda_account"), userAccount.publicKey.toBuffer()],
      program.programId,
    );

    const [userDepositAccount, userDepositNonce] = await PublicKey.findProgramAddress(
      [Buffer.from("user_deposit_account"), userAccount.publicKey.toBuffer()],
      program.programId,
    );

    await program.rpc.deposit(depositAmount, {
      accounts: {
        userAccount: userAccount.publicKey,
        pdaAccount: pdaAccount,
        userDepositAccount: userDepositAccount,
        systemProgram: SystemProgram.programId,
      },
      signers: [userAccount],
    });

    const userDepositAccountAfter = await program.account.userDepositAccount.fetch(userDepositAccount);
    console.log("userDepositAccountAfter", userDepositAccountAfter);
    assert.ok(userDepositAccountAfter.depositedAmount.eq(depositAmount));
  });
});






  






























