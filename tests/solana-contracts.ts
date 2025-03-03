import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaContracts } from "../target/types/solana_contracts";
import { assert } from "chai";

describe("solana-contracts", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SolanaContracts as Program<SolanaContracts>;

  let dataAccount = anchor.web3.Keypair.generate();

  it("Initializes the contract", async () => {
    await program.rpc.initialize({
      accounts: {
        dataAccount: dataAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [dataAccount],
    });

    const account = await program.account.dataAccount.fetch(dataAccount.publicKey);
    assert.equal(account.value.toNumber(), 42);
  });

  it("Updates the contract value", async () => {
    await program.rpc.updateValue(new anchor.BN(100), {
      accounts: {
        dataAccount: dataAccount.publicKey,
      },
    });

    const account = await program.account.dataAccount.fetch(dataAccount.publicKey);
    assert.equal(account.value.toNumber(), 100);
  });
});