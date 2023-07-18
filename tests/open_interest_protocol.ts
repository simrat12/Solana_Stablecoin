import * as anchor from "@project-serum/anchor";
const assert = require('chai').assert;

// Use a local provider.
const provider = anchor.AnchorProvider.local()

// Configure the client to use the local cluster.
anchor.setProvider(provider);

describe('sol_anchor_contract', () => {
    // Define the program for the test.
    const solAnchorContract = anchor.workspace.SolAnchorContract;

    // Define an admin keypair.
    const admin = anchor.web3.Keypair.generate();
    const user = anchor.web3.Keypair.generate();

    // Airdrop lamports to the admin account.
    before(async () => {
        await provider.connection.confirmTransaction(
            await provider.connection.requestAirdrop(admin.publicKey, 10_000_000_000),
            "confirmed",
        );
        await provider.connection.confirmTransaction(
            await provider.connection.requestAirdrop(user.publicKey, 10_000_000_000),
            "confirmed",
        );
        console.log("Airdropped 10,000,000,000 lamports to:", admin.publicKey.toBase58());
        console.log("Airdropped 10,000,000,000 lamports to:", user.publicKey.toBase58());
    });

    it('Initializes the Admin Account', async () => {
        try {
            // Create the transaction instruction.
            await solAnchorContract.rpc.init({
                accounts: {
                    admin: admin.publicKey,
                    user: user.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                },
                signers: [admin, user],
            });

            // Get the account to verify it's as expected.
            const adminAccountAfterInit = await solAnchorContract.account.admin.fetch(admin.publicKey);
            console.log('Admin Account:', adminAccountAfterInit.adminPubkey.toBase58());
            console.log("User Account:", user.publicKey.toBase58());

            // Validate that the admin account has been initialized with the correct pubkey.
            assert.ok(adminAccountAfterInit.adminPubkey.toBase58() === user.publicKey.toBase58());
        } catch (error) {
            console.error('Error initializing the Admin Account:', error);
        }
    });
});





























