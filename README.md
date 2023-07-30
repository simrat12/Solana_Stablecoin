# Solana Stablecoin

This repository contains the code for a Solana backed stablecoin project, overcollateralised by SOL. 

## Prerequisites

You should have the following installed:

1. [Rust](https://www.rust-lang.org/tools/install): Our smart contract is written in Rust.

2. [Node.js](https://nodejs.org/en/download/): This is required for running our tests and scripts.

3. [Anchor](https://project-serum.github.io/anchor/getting-started/installation.html): Anchor is a framework for Solana’s Sealevel runtime providing several convenient developer tools.

4. [Solana Tool Suite](https://docs.solana.com/cli/install-solana-cli-tools): Solana CLI tools is needed to interact with Solana blockchain.

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/simrat12/Solana_Stablecoin.git
    ```
    ```bash
   cd Solana_Stablecoin
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Build the smart contract:
    ```bash
    anchor build
    ```
4. Run the tests:
    ```bash
    anchor test
    ```

## Wallet Setup and Deployment

### Creating a Local Wallet

1. Install the Solana Tool Suite, if you haven't already:

    ```
    sh -c "$(curl -sSfL https://release.solana.com/v1.14.18/install)"
    ```

2. Create a new local wallet:

    ```
    solana-keygen new -o ~/solana-wallet.json
    ```

    This will create a new keypair and store it in `solana-wallet.json` in your home directory.

3. Set the `SOLANA_WALLET` environment variable to point to your keypair file:

    ```
    echo "export SOLANA_WALLET=~/solana-wallet.json" >> ~/.bash_profile, then add the path in .env
    ```

    This adds the export line to your `.bash_profile` file, which is run whenever you open a new terminal window. You'll need to close and reopen your terminal after running this.

4. Verify that the `SOLANA_WALLET` environment variable is set correctly:

    ```
    echo $SOLANA_WALLET
    ```

    This should print the path to your keypair file.

### Configuring for Devnet

1. Use the following command to configure Solana CLI to use Devnet:

    ```
    solana config set --url https://api.devnet.solana.com
    ```

2. Verify the configuration:

    ```
    solana config get
    ```

    This should show that your CLI is configured to use Devnet.

5. Get some SOL via aridrop

    ```
    solana airdrop 3 <your address>
    ```

### Deploying the Program

1. Build the program:

    ```
    anchor build
    ```

2. Deploy the program to Devnet:

    ```
    anchor deploy --verifiable
    ```

    This will deploy your program to Devnet and print the program's address. Make sure to keep a record of this address.

### Running the Client

1. Navigate to the client directory:

    ```
    cd client
    ```

2. Install the client dependencies:

    ```
    npm install
    ```

3. Run the `createAccounts` script to create the necessary accounts:

    ```
    node createAccounts.js
    ```

4. Run `deposit`, `borrow` and `repay` scripts to interact with the program:

    ```
    node deposit.js
    ```
    ```
    node borrow.js
    ```

    replace the address in line 21 of repay.js with the address of your debt token mint address - this can be found in the logs of the prevoius command
    ```
    node repay.js
    ```


You can now use Node.js to call each function in the smart contract. Be sure to replace `YourProgramAddress` with the address of your deployed program when calling these functions.
