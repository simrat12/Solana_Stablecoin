import * as anchor from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';

// Configure the client to use the local cluster.
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider)

describe("open_interest_protocol", () => {
  const program = anchor.workspace.SolAnchorContract;
  let admin = Keypair.generate();
  let user = Keypair.generate();
  let borrower = Keypair.generate();

  const depositAmount = new anchor.BN(100);
  const withdrawAmount = new anchor.BN(50);
  const borrowAmount = new anchor.BN(30);
  const repayAmount = new anchor.BN(20);

  it("Is initialized!", async () => {
    await program.rpc.initialize({
      accounts: {
        admin: admin.publicKey,
        borrower: borrower.publicKey,
        user: user.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [admin, borrower, user]
    });
  });

  it("Deposits", async () => {
    await program.rpc.deposit(depositAmount, {
      accounts: {
        from: user.publicKey,
        to: borrower.publicKey,
        borrower: borrower.publicKey,
        user: user.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });
  });

  it("Withdraws", async () => {
    await program.rpc.withdraw(withdrawAmount, {
      accounts: {
        borrower: borrower.publicKey,
        from: user.publicKey,
        to: borrower.publicKey,
        user: user.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });
  });

  it("Borrows", async () => {
    await program.rpc.borrow(borrowAmount, {
      accounts: {
        admin: admin.publicKey,
        borrower: borrower.publicKey,
        user: user.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });
  });

  it("Repays", async () => {
    await program.rpc.repay(repayAmount, {
      accounts: {
        admin: admin.publicKey,
        borrower: borrower.publicKey,
        user: user.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });
  });

  it("Gets health factor", async () => {
    await program.rpc.getHealthFactor({
      accounts: {
        admin: admin.publicKey,
        borrower: borrower.publicKey,
        user: user.publicKey,
      },
    });
  });
});
