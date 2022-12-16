const { assert } = require('chai')
const nock = require('nock')
const { getWalletControllerInstance } = require('../../src/features/wallet/controller')
const { EscrowController } = require('../../src/features/escrow/controller')
const { config, getWallets } = require("../wallet/constants")
const { loadNockMocks } = require('./mocks')

describe.only('Escrow Controller Tests', () => {
    let wallet1, wallet2, 
    escrowFactoryAddress = '0xaaaaaaaaaaaaaaaaaaaaa'
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
        escrowFactoryAddress,
        wallet: wallet1,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.deployDateEscrow(data)
      assert.include(hash, '0x');
    })

    it('should get date escrows addresses', async () => {
      const data = {
        escrowFactoryAddress,
        wallet: wallet1,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const result = await controller.getDateEscrows(data)
      assert.equal(result[0], '0xbbbbbbbbbbbbbbbbbbbbb');
    })

    it('should get deposits of native tokens on escrow', async () => {
      const data = {
        escrowAddress,
        payee: wallet2.address,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const result = await controller.getDepositsOf(data)
      assert.equal(result[0].amount, amount);
      assert.equal(result[0].date, releaseDate);
    })

    it('should get deposits of ERC20 tokens on escrow', async () => {
      const data = {
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const result = await controller.getDepositsOfERC20(data)
      assert.equal(result[0].amount, amount);
      assert.equal(result[0].date, releaseDate);
    })

    it('should get deposits of ERC721 tokens on escrow', async () => {
      const data = {
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const result = await controller.getDepositsOfERC721(data)
      assert.equal(result[0].amount, amount);
      assert.equal(result[0].date, releaseDate);
    })

    it('should get deposits of ERC1155 tokens on escrow', async () => {
      const data = {
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const result = await controller.getDepositsOfERC1155(data)
      assert.equal(result[0].amount, amount);
      assert.equal(result[0].date, releaseDate);
    })

    it('should deposit native tokens to escrow', async () => {
      const data = {
        escrowAddress,
        amount,
        releaseDate,
        payee: wallet2.address,
        wallet: wallet1,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.deposit(data)
      assert.include(hash, '0x');
    })

    it('should deposit ERC20 tokens to escrow', async () => {
      const data = {
        escrowAddress,
        amount,
        releaseDate,
        payee: wallet2.address,
        tokenAddress,
        wallet: wallet1,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.depositERC20(data)
      assert.include(hash, '0x');
    })

    it('should deposit ERC721 tokens to escrow', async () => {
      const data = {
        escrowAddress,
        tokenId: amount,
        releaseDate,
        payee: wallet2.address,
        tokenAddress,
        wallet: wallet1,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.depositERC721(data)
      assert.include(hash, '0x');
    })

    it('should deposit ERC1155 tokens to escrow', async () => {
      const data = {
        escrowAddress,
        tokenId: amount,
        amount,
        releaseDate,
        payee: wallet2.address,
        tokenAddress,
        wallet: wallet1,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.depositERC1155(data)
      assert.include(hash, '0x');
    })

    it('should withdraw native tokens from escrow', async () => {
      const data = {
        escrowAddress,
        payee: wallet2.address,
        wallet: wallet1,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.withdraw(data)
      assert.include(hash, '0x');
    })

    it('should withdraw ERC20 tokens from escrow', async () => {
      const data = {
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        wallet: wallet1,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.withdrawERC20(data)
      assert.include(hash, '0x');
    })

    it('should withdraw ERC721 tokens from escrow', async () => {
      const data = {
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        wallet: wallet1,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.withdrawERC721(data)
      assert.include(hash, '0x');
    })

    it('should withdraw ERC1155 tokens from escrow', async () => {
      const data = {
        escrowAddress,
        payee: wallet2.address,
        tokenAddress,
        wallet: wallet1,
        protocol: 'ETHEREUM',
      }
      const controller = new EscrowController(config)
      const { hash } = await controller.withdrawERC1155(data)
      assert.include(hash, '0x');
    })
})