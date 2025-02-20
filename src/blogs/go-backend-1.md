---
title: 'Golang Backend Made Easy - Part 1'
date: '2025-02-17'
desc: 'Lets Go!'
cover: '/cover/go.webp'
---

## First let's install Go

```sh
brew install go # for mac
sudo apt-get install go # for linux
choco install go # for windows
sudo pacman -S go # for arch
```

For other way to please go to [GoLang](https://golang.org/dl/)

Add go to your path

bash or zsh

```sh
export PATH=$PATH:/usr/local/go/bin
```

lets check if go is installed

```sh
go version # go version go1.24.0 linux/amd64
```

Congrats you have installed go!

## Lets create our first go file

```sh
mkdir go-backend && cd go-backend
go mod init github.com/go-backend
```

Create a file called `main.go`

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}
```

Run the file

```sh
go run main.go
```

You should see `Hello, World!` in your terminal.
