import * as anchor from "@project-serum/anchor";
const assert = require('chai').assert;
const { SystemProgram } = anchor.web3;

// Use a local provider.
const provider = anchor.AnchorProvider.local()

// Configure the client to use the local cluster.
anchor.setProvider(provider);

describe('sol_anchor_contract', () => {
    // Define the program for the test.
    const solAnchorContract = anchor.workspace.SolAnchorContract;

    // Define an admin keypair.
    const admin = anchor.web3.Keypair.generate();

    // Airdrop lamports to the admin account.
    before(async () => {
        await provider.connection.confirmTransaction(
            await provider.connection.requestAirdrop(admin.publicKey, 10_000_000_000),
            "confirmed",
        );
        console.log("Airdropped 10,000,000,000 lamports to:", admin.publicKey.toBase58());
    });

    it('Initializes the Admin Account', async () => {
        try {
            // Create the new account.
            const adminAccount = anchor.web3.Keypair.generate();

            // Create the transaction instruction.
            const tx = await solAnchorContract.rpc.init(admin.publicKey, {
                accounts: {
                    admin: adminAccount.publicKey,
                    user: admin.publicKey,
                    systemProgram: SystemProgram.programId,
                },
                signers: [admin, adminAccount],
                instructions: [
                    // The system program creates the account used to initialize the admin account.
                    SystemProgram.createAccount({
                        fromPubkey: admin.publicKey,
                        newAccountPubkey: adminAccount.publicKey,
                        space: 8 + 24 + 32, // Size of the data for an Admin account.
                        lamports: await solAnchorContract.provider.connection.getMinimumBalanceForRentExemption(
                          8 + 24 + 32,
                        ),
                        programId: solAnchorContract.programId,
                    }),
                ],
            });

            // Get the account to verify it's as expected.
            const adminAccountAfterInit = await solAnchorContract.account.admin.fetch(adminAccount.publicKey);

            // Validate that the admin account has been initialized with the correct pubkey.
            assert.ok(adminAccountAfterInit.adminPubkey.equals(admin.publicKey));
        } catch (error) {
            console.error('Error initializing the Admin Account:', error);
        }
    });
});




























