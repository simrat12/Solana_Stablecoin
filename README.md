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

# Run the frontend

## To run the mainApp
- `cd App`, 

- `cd mainpage`
- install dependencies `npm install--legacy-peer-deps`
- run the development `npm run dev`

**Open another terminal
- `cd dashboard`
- install dependencies `npm install--legacy-peer-deps`
- run the development `npm run dev`

## Enter your browser and input http://localhost:5173

