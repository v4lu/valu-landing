---
title: 'Blockchain Part 1: Building a Basic Blockchain in'
date: '2025-02-17'
desc: 'A short tutorial about creating a basic blockchain structure in Golang.'
cover: '/cover/blockchain.webp'
---

# Building a Simple Blockchain in Go

Blockchain technology is widely known for its role in powering cryptocurrencies like Bitcoin and Ethereum. However, its underlying principles—immutability, decentralization, and security—make it useful for many other applications. In this post, we'll explore a simple blockchain implementation in Go.

## **Understanding the Blockchain Code**

The Go program above implements a basic blockchain that supports adding new blocks, validating the chain, and saving/loading blockchain data to/from a file.

### **1. The Block Structure**

Each block contains:

- `Index`: Position in the chain.
- `Timestamp`: When it was created.
- `Data`: The information stored in the block.
- `PrevHash`: Hash of the previous block.
- `Hash`: The unique hash of the block.

```go
type Block struct {
    Index     int
    Timestamp string
    Data      string
    PrevHash  string
    Hash      string
}
```

### **2. Hash Calculation**

A block's hash is calculated using the SHA-256 algorithm by combining its index, timestamp, data, and the previous block's hash.

```go
func (b *Block) calculateHash() string {
    data := fmt.Sprintf("%d%s%s%s", b.Index, b.Timestamp, b.Data, b.PrevHash)
    hash := sha256.Sum256([]byte(data))
    return hex.EncodeToString(hash[:])
}
```

### **3. Genesis Block Creation**

Every blockchain starts with a **genesis block**, the first block in the chain.

```go
func NewBlockchain() *Blockchain {
    genesisBlock := &Block{
        Index:     0,
        Timestamp: time.Now().Format(time.RFC3339),
        Data:      "Genesis Block",
        PrevHash:  "",
    }
    genesisBlock.Hash = genesisBlock.calculateHash()
    return &Blockchain{Blocks: []*Block{genesisBlock}}
}
```

### **4. Adding New Blocks**

Each new block references the hash of the previous block.

```go
func (bc *Blockchain) AddBlock(data string) {
    prevBlock := bc.Blocks[len(bc.Blocks)-1]
    newBlock := &Block{
        Index:     prevBlock.Index + 1,
        Timestamp: time.Now().Format(time.RFC3339),
        Data:      data,
        PrevHash:  prevBlock.Hash,
    }
    newBlock.Hash = newBlock.calculateHash()
    bc.Blocks = append(bc.Blocks, newBlock)
}
```

### **5. Blockchain Validation**

The program verifies that:

1. Each block correctly references the hash of the previous block.
2. Each block’s hash is valid.

```go
func (bc *Blockchain) Validate() bool {
    for i := 1; i < len(bc.Blocks); i++ {
        currentBlock := bc.Blocks[i]
        prevBlock := bc.Blocks[i-1]

        if currentBlock.PrevHash != prevBlock.Hash {
            return false
        }

        if currentBlock.Hash != currentBlock.calculateHash() {
            return false
        }
    }
    return true
}
```

### **6. Saving and Loading the Blockchain**

The blockchain is saved in a JSON file.

```go
func (bc *Blockchain) Save(filename string) error {
    file, err := json.MarshalIndent(bc, "", "  ")
    if err != nil {
        return err
    }
    return os.WriteFile(filename, file, 0o644)
}
```

To load an existing blockchain:

```go
func LoadBlockchain(filename string) (*Blockchain, error) {
    file, err := os.ReadFile(filename)
    if err != nil {
        return nil, err
    }

    var bc Blockchain
    err = json.Unmarshal(file, &bc)
    if err != nil {
        return nil, err
    }

    return &bc, nil
}
```

## **Running the Blockchain**

### **1. Adding Blocks**

To add a block with data `"Hello, Blockchain!"`, run:

```sh
go run main.go add -data "Hello, Blockchain!"
```

### **2. Printing the Blockchain**

To see all blocks:

```sh
go run main.go print
```

### **3. Validating the Blockchain**

To check integrity:

```sh
go run main.go validate
```

## Next Steps

In next few blogs we will expand our blockchain, this is great start to understand how blockchain works. Stay tuned for more.

Repository can be find [here](https://github.com/lucabrx/blockchain/tree/blockchain1)
