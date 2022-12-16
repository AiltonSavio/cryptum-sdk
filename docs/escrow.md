# Loot Boxes

- [Deploy Date Escrow](#deploy-date-escrow)
- [Get Deposits](#get-deposits)
- [Get ERC20 Deposits](#get-erc20-deposits)
- [Get ERC721 Deposits](#get-erc721-deposits)
- [Get ERC1155 Deposits](#get-erc1155-deposits)
- [Deposit](#deposit)
- [Deposit ERC20](#deposit-erc20)
- [Deposit ERC721](#deposit-erc721)
- [Deposit ERC1155](#deposit-erc1155)
- [Withdraw](#withdraw)
- [Withdraw ERC20](#withdraw-erc20)
- [Withdraw ERC721](#withdraw-erc721)
- [Withdraw ERC1155](#withdraw-erc1155)

Check out the in-depth guide [here](https://doc.cryptum.io/main/for-developers/sdk-integration-guides/escrows) to see the workflow of the escrow

## Deploy Date Escrow

#### `sdk.escrow.deployDateEscrow(opts)`

Deploy a date conditional escrow contract

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowFactoryAddress` (string) (**required**) - address of the escrow factory contract

Examples:

```js
let { hash } = await sdk.escrow.deployDateEscrow({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowFactoryAddress: '0xa4...E17', // Address of the escrow factory
})
```

## Get Date Escrows

#### `sdk.escrow.getDateEscrows(opts)`

Gets all date escrows addresses of a wallet

- `opts.wallet` (Wallet)(**required**) - wallet owner of date escrows
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowFactoryAddress` (string) (**required**) - address of the escrow factory contract

Examples:

```js
let { hash } = await sdk.escrow.getDateEscrows({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowFactoryAddress: '0xa4...E17',
})
```

## Get Deposits

Gets deposits of the blockchain native token on escrow for a payee

- `opts.payee` (string)(**required**) - address to receive amount on escrow
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract

Examples:

```js
let { hash } = await sdk.escrow.getDepositsOf({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  payee: '0xa4...E17',
  escrowAddress: '0xa4...E17',
})
```

## Get ERC20 Deposits

Gets deposits of an ERC20 token on escrow for a payee

- `opts.payee` (string)(**required**) - address to receive amount on escrow
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.tokenAddress` (string) (**required**) - address of ERC20 token

Examples:

```js
let { hash } = await sdk.escrow.getDepositsOfERC20({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  payee: '0xa4...E17',
  escrowAddress: '0xa4...E17',
  tokenAddress: '0xa4...E17',
})
```

## Get ERC721 Deposits

Gets deposits of an ERC721 token on escrow for a payee

- `opts.payee` (string)(**required**) - address to receive amount on escrow
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.tokenAddress` (string) (**required**) - address of ERC721 token

Examples:

```js
let { hash } = await sdk.escrow.getDepositsOfERC20({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  payee: '0xa4...E17',
  escrowAddress: '0xa4...E17',
  tokenAddress: '0xa4...E17',
})
```

## Get ERC1155 Deposits

Gets deposits of an ERC1155 token on escrow for a payee

- `opts.payee` (string)(**required**) - address to receive amount on escrow
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.tokenAddress` (string) (**required**) - address of ERC1155 token

Examples:

```js
let { hash } = await sdk.escrow.getDepositsOfERC20({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  payee: '0xa4...E17',
  escrowAddress: '0xa4...E17',
  tokenAddress: '0xa4...E17',
})
```

## Deposit

Deposit native token on escrow for a payee

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.payee` (string) (**required**) - destination address of the funds
- `opts.amount` (string) (**required**) - amount to deposit
- `opts.releaseDate` (string) (**required**) - release date of the funds

Examples:

```js
let { hash } = await sdk.escrow.deposit({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowAddress: '0xa4...E17',
  payee: '0xa4...E17',
  amount: '100000000000000000', // 0.1 ETH
  releaseDate: '2025-1-1T00:00:00.000Z',
})
```

## Deposit ERC20

Deposit ERC20 token on escrow for a payee

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.payee` (string) (**required**) - destination address of the funds
- `opts.amount` (string) (**required**) - amount to deposit
- `opts.releaseDate` (string) (**required**) - release date of the funds
- `opts.tokenAddress` (string) (**required**) - address of ERC20 token

Examples:

```js
let { hash } = await sdk.escrow.depositERC20({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowAddress: '0xa4...E17',
  payee: '0xa4...E17',
  amount: '100000000000000000', // 0.1 ETH
  releaseDate: '2025-1-1T00:00:00.000Z',
  tokenAddress: '0xa4...E17',
})
```

## Deposit ERC721

Deposit ERC721 token on escrow for a payee

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.payee` (string) (**required**) - destination address of the funds
- `opts.tokenId` (string) (**required**) - id of the token to deposit
- `opts.releaseDate` (string) (**required**) - release date of the funds
- `opts.tokenAddress` (string) (**required**) - address of ERC721 token

Examples:

```js
let { hash } = await sdk.escrow.depositERC721({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowAddress: '0xa4...E17',
  payee: '0xa4...E17',
  tokenId: '0',
  releaseDate: '2025-1-1T00:00:00.000Z',
  tokenAddress: '0xa4...E17',
})
```

## Deposit ERC1155

Deposit ERC1155 token on escrow for a payee

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.payee` (string) (**required**) - destination address of the funds
- `opts.tokenId` (string) (**required**) - id of the token to deposit
- `opts.amount` (string) (**required**) - amount to deposit
- `opts.releaseDate` (string) (**required**) - release date of the funds
- `opts.tokenAddress` (string) (**required**) - address of ERC1155 token

Examples:

```js
let { hash } = await sdk.escrow.depositERC1155({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowAddress: '0xa4...E17',
  payee: '0xa4...E17',
  tokenId: '0',
  amount: '100000000000000000', // 0.1 ETH
  releaseDate: '2025-1-1T00:00:00.000Z',
  tokenAddress: '0xa4...E17',
})
```

## Withdraw

Withdraw native token funds from escrow

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.payee` (string) (**required**) - destination address of the funds

Examples:

```js
let { hash } = await sdk.escrow.withdraw({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowAddress: '0xa4...E17',
  payee: '0xa4...E17',
})
```

## Withdraw ERC20

Withdraw ERC20 token funds from escrow

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.payee` (string) (**required**) - destination address of the funds
- `opts.tokenAddress` (string) (**required**) - address of ERC20 token

Examples:

```js
let { hash } = await sdk.escrow.withdrawERC20({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowAddress: '0xa4...E17',
  payee: '0xa4...E17',
  tokenAddress: '0xa4...E17',
})
```

## Withdraw ERC721

Withdraw ERC721 token funds from escrow

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.payee` (string) (**required**) - destination address of the funds
- `opts.tokenAddress` (string) (**required**) - address of ERC721 token

Examples:

```js
let { hash } = await sdk.escrow.withdrawERC721({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowAddress: '0xa4...E17',
  payee: '0xa4...E17',
  tokenAddress: '0xa4...E17',
})
```

## Withdraw ERC1155

Withdraw ERC1155 token funds from escrow

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.payee` (string) (**required**) - destination address of the funds
- `opts.tokenAddress` (string) (**required**) - address of ERC1155 token

Examples:

```js
let { hash } = await sdk.escrow.withdrawERC1155({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowAddress: '0xa4...E17',
  payee: '0xa4...E17',
  tokenAddress: '0xa4...E17',
})
```
