# Escrows

- [Deploy Escrow](#deploy-escrow)
- [Get Escrows](#get-escrows)
- [Get Deposits](#get-deposits)
- [Approve](#approve)
- [Deposit](#deposit)
- [Withdraw](#withdraw)

Check out the in-depth guide [here](https://doc.cryptum.io/main/for-developers/sdk-integration-guides/escrows) to see the workflow of the escrow

## Deploy Escrow

#### `sdk.escrow.deployEscrow(opts)`

Deploy an escrow contract.

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.type` (string) (**required**) - type of escrow to deploy. Currently only `date` is supported

Examples:

```js
let { hash } = await sdk.escrow.deployEscrow({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  type: 'date',
})
```

## Get Escrows

#### `sdk.escrow.getEscrows(opts)`

Gets all escrow addresses of a wallet.

- `opts.wallet` (Wallet)(**required**) - wallet owner of date escrows
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.type` (string) (**required**) - type of escrow to deploy. Currently only `date` is supported

Examples:

```js
const escrows = await sdk.escrow.getEscrows({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  type: 'date',
})
```

## Get Deposits

Gets deposits on escrow for a payee.

#### `sdk.escrow.getDepositsOf(opts)`

- `opts.payee` (string)(**required**) - address to receive amount on escrow
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.tokenAddress` (string) - address of the token. Leave empty for native token
- `opts.tokenType` ("Native", "ERC721" | "ERC1155" | "ERC20") - type of the token that is being added as a prize.

Examples:

```js
let { hash } = await sdk.escrow.getDepositsOf({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  payee: '0xa4...E17',
  escrowAddress: '0xa4...E17',
  tokenAddress: '0xa4...E17',
  tokenType: 'ERC1155', // 'ERC20','ERC721' or 'ERC1155'
})
```

## Approve

#### `sdk.escrow.approve(opts)`

Approve the escrow contract to use your tokens.

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract.
- `opts.tokenAddress` (string) (**required**) - address of the token to be used as a prize.
- `opts.tokenType` ("ERC721" | "ERC1155" | "ERC20") - type of the token that is being added as a prize.

Examples:

```js
await sdk.escrow.approve({
  wallet,
  escrowAddress: '0xa75b...15d8',
  protocol: 'BSC',
  tokenAddress: '0xa4...E17',
  tokenType: 'ERC1155', // 'ERC20','ERC721' or 'ERC1155'
})
```

## Deposit

#### `sdk.escrow.deposit(opts)`

Deposit tokens on escrow for a payee.

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.payee` (string) (**required**) - destination address of the funds
- `opts.tokenAddress` (string) - address of the token to be used as a prize. Leave empty for 'Native' tokens
- `opts.type` ("date") (**required**) - type of escrow to deploy. Currently only `date` is supported
- `opts.tokenType` ("Native" | "ERC721" | "ERC1155" | "ERC20") - type of the token that is being added as a prize.
- `opts.tokenId` (string) - tokenId of the content (if content is an ERC-721 token).
- `opts.amount` (string) - amount of tokens to be approved (if content is an ERC20 token).
- `opts.releaseDate` (string) - release date of the funds.

Examples:

```js
let { hash } = await sdk.escrow.deposit({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowAddress: '0xa4...E17',
  type: 'date',
  payee: '0xa4...E17',
  tokenAddress: '0xa4...E17',
  tokenType: 'ERC1155', // 'Native', 'ERC20','ERC721' or 'ERC1155'
  tokenId, // For 'ERC721' and 'ERC1155'
  amount, // For 'Native', 'ERC20' and 'ERC1155'
  releaseDate: '2025-1-1T00:00:00.000Z', // For 'date' conditional escrows
})
```

## Withdraw

#### `sdk.escrow.withdraw(opts)`

Withdraw funds from escrow.

- `opts.wallet` (Wallet)(**required**) - wallet to sign the transaction with
- `opts.protocol` (string) (**required**) - [EVMs only](../protocols.md#ethereum-based-blockchains-evms).
- `opts.escrowAddress` (string) (**required**) - address of the escrow contract
- `opts.payee` (string) (**required**) - destination address of the funds
- `opts.tokenAddress` (string) - address of the token to be used as a prize. Leave empty for 'Native' tokens
- `opts.tokenType` ("Native" | "ERC721" | "ERC1155" | "ERC20") - type of the token that is being added as a prize.

Examples:

```js
let { hash } = await sdk.escrow.withdraw({
  protocol: 'BSC', // Only EVM protocols are supported at the moment
  wallet,
  escrowAddress: '0xa4...E17',
  payee: '0xa4...E17',
  tokenAddress: '0xa4...E17',
  tokenType: 'ERC1155', // 'Native', 'ERC20','ERC721' or 'ERC1155'
})
```
