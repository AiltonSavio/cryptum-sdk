const AxiosApi = require('../../src/axios')
const { config } = require('../wallet/constants')
const axiosApi = new AxiosApi(config)
const baseUrl = axiosApi.getBaseUrl(config.environment)

exports.loadNockMocks = (nock, [wallet1, wallet2]) => {
  nock(baseUrl).get(`/transaction/0xfffffffffffffffffffff/proxy?protocol=ETHEREUM`).reply(200, {
    address: '0xaaaaaaaaaaaaaaaaaaaaa'
  }).persist()
  
  nock(baseUrl).post(`/tx?protocol=ETHEREUM`, () => true).reply(200, {
    hash: '0xfffffffffffffffffffff'
  }).persist()

  nock(baseUrl).post(`/contract/escrow/deployDateEscrow?protocol=ETHEREUM`, {
    from: wallet1.address,
    escrowFactoryAddress: '0xaaaaaaaaaaaaaaaaaaaaa',
  }).reply(200, {
    from: wallet1.address,
    chainId: 4,
    nonce: 1,
    gasPrice: '0x1000000',
    to: '',
    gasLimit: '0x1000000',
  }).persist()

  nock(baseUrl).get(`/contract/escrow/0xaaaaaaaaaaaaaaaaaaaaa/dateEscrows/${wallet1.address}?protocol=ETHEREUM`).reply(200, [
    '0xbbbbbbbbbbbbbbbbbbbbb'
  ]).persist()

  nock(baseUrl).get(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/depositsOf/${wallet2.address}?protocol=ETHEREUM`).reply(200, [
    { amount: '1', date: '1/1/2015' }
  ]).persist()
  nock(baseUrl).get(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/depositsOfERC20/${wallet2.address}/0xcccccccccccccccccccc?protocol=ETHEREUM`).reply(200, [
    { amount: '1', date: '1/1/2015' }
  ]).persist()
  nock(baseUrl).get(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/depositsOfERC721/${wallet2.address}/0xcccccccccccccccccccc?protocol=ETHEREUM`).reply(200, [
    { amount: '1', date: '1/1/2015' }
  ]).persist()
  nock(baseUrl).get(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/depositsOfERC1155/${wallet2.address}/0xcccccccccccccccccccc?protocol=ETHEREUM`).reply(200, [
    { amount: '1', date: '1/1/2015' }
  ]).persist()

  nock(baseUrl).post(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/deposit/${wallet2.address}?protocol=ETHEREUM`, {
    from: wallet1.address,
    amount: '1',
    date: '1/1/2015',
  }).reply(200, {
    from: wallet1.address,
    chainId: 4,
    nonce: 1,
    gasPrice: '0x1000000',
    to: '',
    gasLimit: '0x1000000',
  }).persist()
  nock(baseUrl).post(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/depositERC20/${wallet2.address}?protocol=ETHEREUM`, {
    from: wallet1.address,
    amount: '1',
    date: '1/1/2015',
    tokenAddress: '0xcccccccccccccccccccc',
  }).reply(200, {
    from: wallet1.address,
    chainId: 4,
    nonce: 1,
    gasPrice: '0x1000000',
    to: '',
    gasLimit: '0x1000000',
  }).persist()
  nock(baseUrl).post(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/depositERC20/${wallet2.address}?protocol=ETHEREUM`, {
    from: wallet1.address,
    amount: '1',
    date: '1/1/2015',
    tokenAddress: '0xcccccccccccccccccccc',
  }).reply(200, {
    from: wallet1.address,
    chainId: 4,
    nonce: 1,
    gasPrice: '0x1000000',
    to: '',
    gasLimit: '0x1000000',
  }).persist()
  nock(baseUrl).post(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/depositERC721/${wallet2.address}?protocol=ETHEREUM`, {
    from: wallet1.address,
    tokenId: '1',
    date: '1/1/2015',
    tokenAddress: '0xcccccccccccccccccccc',
  }).reply(200, {
    from: wallet1.address,
    chainId: 4,
    nonce: 1,
    gasPrice: '0x1000000',
    to: '',
    gasLimit: '0x1000000',
  }).persist()
  nock(baseUrl).post(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/depositERC1155/${wallet2.address}?protocol=ETHEREUM`, {
    from: wallet1.address,
    tokenId: '1',
    amount: '1',
    date: '1/1/2015',
    tokenAddress: '0xcccccccccccccccccccc',
  }).reply(200, {
    from: wallet1.address,
    chainId: 4,
    nonce: 1,
    gasPrice: '0x1000000',
    to: '',
    gasLimit: '0x1000000',
  }).persist()

  nock(baseUrl).post(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/withdraw/${wallet2.address}?protocol=ETHEREUM`, {
    from: wallet1.address,
  }).reply(200, {
    from: wallet1.address,
    chainId: 4,
    nonce: 1,
    gasPrice: '0x1000000',
    to: '',
    gasLimit: '0x1000000',
  }).persist()
  nock(baseUrl).post(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/withdrawERC20/${wallet2.address}?protocol=ETHEREUM`, {
    from: wallet1.address,
    tokenAddress: '0xcccccccccccccccccccc',
  }).reply(200, {
    from: wallet1.address,
    chainId: 4,
    nonce: 1,
    gasPrice: '0x1000000',
    to: '',
    gasLimit: '0x1000000',
  }).persist()
  nock(baseUrl).post(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/withdrawERC721/${wallet2.address}?protocol=ETHEREUM`, {
    from: wallet1.address,
    tokenAddress: '0xcccccccccccccccccccc',
  }).reply(200, {
    from: wallet1.address,
    chainId: 4,
    nonce: 1,
    gasPrice: '0x1000000',
    to: '',
    gasLimit: '0x1000000',
  }).persist()
  nock(baseUrl).post(`/contract/escrow/0xbbbbbbbbbbbbbbbbbbbbb/withdrawERC1155/${wallet2.address}?protocol=ETHEREUM`, {
    from: wallet1.address,
    tokenAddress: '0xcccccccccccccccccccc',
  }).reply(200, {
    from: wallet1.address,
    chainId: 4,
    nonce: 1,
    gasPrice: '0x1000000',
    to: '',
    gasLimit: '0x1000000',
  }).persist()
}