import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { OpenInterestProtocol } from "../target/types/open_interest_protocol";

describe("open_interest_protocol", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.OpenInterestProtocol as Program<OpenInterestProtocol>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
