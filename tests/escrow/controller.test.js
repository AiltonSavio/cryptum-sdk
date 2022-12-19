const { assert } = require('chai')
const nock = require('nock')
const { getWalletControllerInstance } = require('../../src/features/wallet/controller')
const { EscrowController } = require('../../src/features/escrow/controller')
const { config, getWallets } = require("../wallet/constants")
const { loadNockMocks } = require('./mocks')

describe.only('Escrow Controller Tests', () => {
    let wallet1, wallet2
    const escrowAddress = '0xbbbbbbbbbbbbbbbbbbbbb'
    const tokenAddress = '0xcccccccccccccccccccc'
    const releaseDate = '1/1/2015'
    const amount = '1'

    before(async () => {
        const wallets = await getWallets();
        wallet1 = wallets.ethereum;
        wallet2 = await getWalletControllerInstance(config).generateWallet({ protocol: 'ETHEREUM' })
        loadNockMocks(nock, [wallet1, wallet2])
    })
    after(() => {
        nock.isDone();
    });

    it('should deploy date escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        type: 'date',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.deployEscrow(data)
      assert.include(hash, '0x');
    })

    it('should get escrows addresses', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        type: 'date',
      }
      const controller = new EscrowController(config)
      const result = await controller.getEscrows(data)
      assert.equal(result[0], '0xbbbbbbbbbbbbbbbbbbbbb');
    })

    it('should get deposits of native tokens on escrow', async () => {
      const data = {
        payee: wallet2.address,
        protocol: 'ETHEREUM',
        escrowAddress,
        tokenType: 'Native'
      }
      const controller = new EscrowController(config)
      const result = await controller.getDepositsOf(data)
      assert.equal(result[0].amount, amount);
      assert.equal(result[0].date, releaseDate);
    })

    it('should get deposits of ERC20 tokens on escrow', async () => {
      const data = {
        payee: wallet2.address,
        protocol: 'ETHEREUM',
        escrowAddress,
        tokenAddress,
        tokenType: 'ERC20'
      }
      const controller = new EscrowController(config)
      const result = await controller.getDepositsOf(data)
      assert.equal(result[0].amount, amount);
      assert.equal(result[0].date, releaseDate);
    })

    it('should get deposits of ERC721 tokens on escrow', async () => {
      const data = {
        payee: wallet2.address,
        protocol: 'ETHEREUM',
        escrowAddress,
        tokenAddress,
        tokenType: 'ERC721'
      }
      const controller = new EscrowController(config)
      const result = await controller.getDepositsOf(data)
      assert.equal(result[0].amount, amount);
      assert.equal(result[0].date, releaseDate);
    })

    it('should get deposits of ERC1155 tokens on escrow', async () => {
      const data = {
        payee: wallet2.address,
        protocol: 'ETHEREUM',
        escrowAddress,
        tokenAddress,
        tokenType: 'ERC1155'
      }
      const controller = new EscrowController(config)
      const result = await controller.getDepositsOf(data)
      assert.equal(result[0].amount, amount);
      assert.equal(result[0].date, releaseDate);
    })

    it('should approve ERC20 token for escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        escrowAddress,
        tokenAddress,
        tokenType: 'ERC20'
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.approve(data)
      assert.include(hash, '0x');
    })

    it('should approve ERC721 token for escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        escrowAddress,
        tokenAddress,
        tokenType: 'ERC721'
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.approve(data)
      assert.include(hash, '0x');
    })

    it('should approve ERC1155 token for escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        escrowAddress,
        tokenAddress,
        tokenType: 'ERC1155'
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.approve(data)
      assert.include(hash, '0x');
    })

    it('should deposit native tokens to escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        escrowAddress,
        payee: wallet2.address,
        tokenType: 'Native',
        amount,
        releaseDate,
        type: 'date'
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.deposit(data)
      assert.include(hash, '0x');
    })

    it('should deposit ERC20 tokens to escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        tokenType: 'ERC20',
        amount,
        releaseDate,
        type: 'date'
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.deposit(data)
      assert.include(hash, '0x');
    })

    it('should deposit ERC721 tokens to escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        tokenType: 'ERC721',
        tokenId: amount,
        releaseDate,
        type: 'date'
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.deposit(data)
      assert.include(hash, '0x');
    })

    it('should deposit ERC1155 tokens to escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        tokenType: 'ERC20',
        tokenId: amount,
        amount,
        releaseDate,
        type: 'date'
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.deposit(data)
      assert.include(hash, '0x');
    })

    it('should withdraw native tokens from escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        escrowAddress,
        payee: wallet2.address,
        tokenType: 'Native',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.withdraw(data)
      assert.include(hash, '0x');
    })

    it('should withdraw ERC20 tokens from escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        tokenType: 'ERC20',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.withdraw(data)
      assert.include(hash, '0x');
    })

    it('should withdraw ERC721 tokens from escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        tokenType: 'ERC721',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.withdraw(data)
      assert.include(hash, '0x');
    })

    it('should withdraw ERC1155 tokens from escrow', async () => {
      const data = {
        wallet: wallet1,
        protocol: 'ETHEREUM',
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        tokenType: 'ERC1155',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.withdraw(data)
      assert.include(hash, '0x');
    })
})