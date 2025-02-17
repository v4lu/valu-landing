---
title: "Blockchain Part 1: Building a Basic Blockchain in Rust"
date: "2025-02-17"
desc: "A short tutorial about creating a basic blockchain structure in Rust, exploring blocks, proof-of-work, and chain validation."
cover: "/cover/nextjs-cover.webp"
---

## Introduction

In this tutorial, we will build a basic blockchain in Rust. We'll explain the essential concepts behind blockchain technology and walk through the code that implements key functionalities like block creation, proof-of-work mining, and chain validation. Although this is a simplified version compared to production blockchains, it covers the foundational elements required to understand and build your own blockchain.

A blockchain is essentially a linked list of blocks where each block contains a set of transactions, a timestamp, and a cryptographic hash that connects it to the previous block. This design ensures the immutability and integrity of the stored data.

## Project Dependencies

Before we dive into the code, let’s review the key dependencies used in our project:

- **hex**: Converts binary data into hexadecimal strings.
- **sha2**: Implements the SHA-256 hashing algorithm.
- **serde** and **serde_json**: Enable serialization and deserialization of our data structures.
- **log** and **env_logger**: Facilitate logging throughout the application.
- **thiserror**: Simplifies error handling.
- **clap**: Provides a simple command-line interface (CLI) parser.

## The Block Structure

The blockchain is built from individual blocks. Each block holds the following fields:

- **index**: The block’s position in the chain.
- **timestamp**: The Unix timestamp when the block was created.
- **transactions**: A list of transactions recorded in the block.
- **previous_hash**: The hash of the preceding block.
- **nonce**: A counter used in the proof-of-work process.
- **hash**: The computed cryptographic hash of the block's contents.

### Creating a New Block

When a new block is created, we capture the current timestamp and initialize the `nonce` and `hash` fields. The following snippet shows how a new block template is generated:

```rust
use std::time::{SystemTime, UNIX_EPOCH};
use sha2::{Digest, Sha256};
use serde::{Serialize, Deserialize};
use crate::error::BlockError;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Block {
    pub index: u64,
    pub timestamp: u64,
    pub transactions: Vec<String>,
    pub previous_hash: String,
    pub nonce: u64,
    pub hash: String,
}

impl Block {
    /// Creates a new unmined block template.
    pub fn new(
        index: u64,
        transactions: Vec<String>,
        previous_hash: String,
    ) -> Result<Self, BlockError> {
        let timestamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map_err(|_| BlockError::InvalidTimestamp)?
            .as_secs();

        Ok(Block {
            index,
            timestamp,
            transactions,
            previous_hash,
            nonce: 0, // Initial nonce value
            hash: String::new(), // Will be calculated during mining
        })
    }

Calculating the Block Hash

To ensure data integrity, each block’s hash is calculated using the SHA-256 algorithm. The calculate_hash method concatenates the block’s properties (including the nonce) and generates a hexadecimal hash string:

    /// Calculates SHA-256 hash of block contents.
    pub fn calculate_hash(&self) -> Result<String, BlockError> {
        let mut hasher = Sha256::new();
        hasher.update(self.index.to_string());
        hasher.update(self.timestamp.to_string());
        hasher.update(
            serde_json::to_string(&self.transactions)
                .map_err(|_| BlockError::HashCalculationFailed)?,
        );
        hasher.update(&self.previous_hash);
        hasher.update(self.nonce.to_string());

        Ok(hex::encode(hasher.finalize()))
    }

The Genesis Block

Every blockchain starts with a genesis block—the first block in the chain. It uses predefined values and serves as the foundation for all subsequent blocks:

    /// Generates the genesis (first) block.
    pub fn genesis() -> Self {
        Block {
            index: 0,
            timestamp: UNIX_EPOCH.elapsed().unwrap().as_secs(),
            transactions: vec!["Genesis Block".to_string()],
            previous_hash: "0".to_string(),
            nonce: 0,
            hash: "0000000000000000000000000000000000000000000000000000000000000000".to_string(),
        }
    }

Proof-of-Work (Mining)

The mine method implements a basic proof-of-work algorithm. It iterates over possible nonce values until the resulting hash meets the required difficulty (i.e., the hash starts with a specified number of zeros):

    /// Proof-of-Work mining process.
    /// Iterates nonce until hash meets the difficulty requirement.
    pub fn mine(&mut self, difficulty: usize) -> Result<(), BlockError> {
        self.nonce = 0; // Reset nonce for mining
        loop {
            self.hash = self.calculate_hash()?;
            if self.hash.starts_with(&"0".repeat(difficulty)) {
                return Ok(()); // Valid hash found
            }
            self.nonce += 1; // Try next nonce
        }
    }
}

Building the Blockchain

The Blockchain struct manages a sequence of blocks and handles tasks such as adding new blocks and validating the entire chain.
Key Responsibilities

    Initialization: The blockchain is initiated with the genesis block.
    Adding Blocks: New blocks are created, mined, and appended to the chain after verifying that the chain remains valid.
    Validation: Ensures each block's hash is correct, meets the proof-of-work requirement, and properly references the previous block.
    Chain Replacement: Allows the chain to be replaced with a longer, valid chain—a mechanism used in distributed consensus protocols.

Blockchain Implementation

Below is the simplified implementation of the blockchain (excluding test-related code):

use serde::{Serialize, Deserialize};
use crate::block::Block;
use crate::error::BlockchainError;

#[derive(Debug, Serialize, Deserialize)]
pub struct Blockchain {
    pub chain: Vec<Block>,
    pub difficulty: usize,
}

impl Blockchain {
    /// Creates a new blockchain with a genesis block.
    pub fn new(difficulty: usize) -> Self {
        Blockchain {
            chain: vec![Block::genesis()],
            difficulty,
        }
    }

    /// Adds a new block to the blockchain with the given transactions.
    pub fn add_block(&mut self, transactions: Vec<String>) -> Result<(), BlockchainError> {
        let previous_block = self.chain.last().ok_or(BlockchainError::EmptyChain)?;

        // Create new block template.
        let mut new_block = Block::new(
            previous_block.index + 1,
            transactions,
            previous_block.hash.clone(),
        ).map_err(|e| BlockchainError::ValidationFailed(e.to_string()))?;

        // Mine the block to meet the difficulty requirement.
        new_block.mine(self.difficulty)
            .map_err(|e| BlockchainError::ValidationFailed(e.to_string()))?;

        // Verify chain integrity before adding.
        if self.is_valid() {
            self.chain.push(new_block);
            Ok(())
        } else {
            Err(BlockchainError::ValidationFailed("Invalid block created".into()))
        }
    }

    /// Validates the integrity of the blockchain.
    pub fn is_valid(&self) -> bool {
        self.chain.windows(2).all(|window| {
            let (prev, current) = (&window[0], &window[1]);
            current.hash == current.calculate_hash().unwrap_or_default() && // Hash matches content
            current.hash.starts_with(&"0".repeat(self.difficulty)) &&       // Proof-of-Work check
            current.previous_hash == prev.hash                               // Proper chaining
        })
    }

    /// Replaces the current chain with a new one if it is longer and valid.
    pub fn replace_chain(&mut self, new_chain: Vec<Block>) -> Result<(), BlockchainError> {
        if new_chain.len() > self.chain.len() && self.validate_chain(&new_chain) {
            self.chain = new_chain;
            Ok(())
        } else {
            Err(BlockchainError::ValidationFailed(
                "New chain is not valid or longer".into(),
            ))
        }
    }

    /// Internal helper to validate a provided chain.
    fn validate_chain(&self, chain: &[Block]) -> bool {
        chain.windows(2).all(|window| {
            let (prev, current) = (&window[0], &window[1]);
            current.hash == current.calculate_hash().unwrap_or_default() &&
            current.hash.starts_with(&"0".repeat(self.difficulty)) &&
            current.previous_hash == prev.hash
        })
    }
}

Command-Line Interface

The project utilizes the clap crate to offer a simple CLI, allowing you to interact with the blockchain. The available commands include:

    New: Create a new blockchain with a specified difficulty.
    Add: Append a block with a set of transactions.
    Print: Display the entire blockchain.
    Validate: Check if the blockchain is valid.
    Mine: Re-mine a specific block to adjust its nonce.

Here’s an excerpt showing how the CLI is set up:

use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(version, about)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    New {
        #[arg(short, long, default_value_t = 2)]
        difficulty: usize,
    },
    Add { transactions: Vec<String> },
    Print,
    Validate,
    Mine { block_index: usize },
}

In the main function, we load the blockchain (or create a new one if none exists), process the CLI command, and then save the updated state to a JSON file. This approach ensures that the blockchain persists between sessions.
Conclusion

In this tutorial, we built a basic blockchain in Rust by:

    Defining a Block structure that contains key data fields and methods to calculate its hash.
    Implementing a simple proof-of-work algorithm to mine blocks.
    Creating a Blockchain structure that manages block addition, chain validation, and chain replacement.
    Integrating a command-line interface to interact with the blockchain.

This project serves as a foundation for understanding how blockchains work under the hood. While it omits many complexities of full-scale blockchains, it provides a hands-on introduction to essential blockchain concepts. Future tutorials can build upon this base to explore more advanced features and optimizations.

Happy coding and exploring the world of blockchain with Rust!
