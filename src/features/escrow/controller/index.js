module.exports.getEscrowControllerInstance = (config) => new Controller(config)
const InvalidException = require('../../../errors/InvalidException')
const { makeRequest } = require('../../../services')
const { signEthereumTx } = require('../../../services/blockchain/ethereum')
const { Protocol } = require('../../../services/blockchain/constants')
const Interface = require('./interface')
const { getTransactionControllerInstance } = require('../../transaction/controller')
const { SignedTransaction, TransactionType } = require('../../transaction/entity')
const { signCeloTx } = require('../../../services/blockchain/celo')
const { validateDateEscrowDeploy, validateDateEscrowGetDepositsOf, validateDateEscrowGetDepositsOfERC, validateDateEscrowDeposit, validateDateEscrowDepositERC20, validateDateEscrowDepositERC721, validateDateEscrowDepositERC1155, validateDateEscrowWithdraw, validateDateEscrowWithdrawERC, validateDateEscrowsGet } = require('../../../services/validations/escrow')


class Controller extends Interface {
  /**
   * Deploy date escrow
   * @param {import('../entity').DeployDateEscrowInput} input
   * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
   */
	async deployDateEscrow(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { protocol, wallet, escrowFactoryAddress } = input
		validateDateEscrowDeploy(input)

		const rawTransaction = await makeRequest(
			{
				method: 'post', url: `/contract/escrow/deployDateEscrow?protocol=${protocol}`,
				config: this.config,
				body: { escrowFactoryAddress, from: wallet.address }
			}
		)

		let signedTx;
		switch (protocol) {
			case Protocol.CELO:
				signedTx = await signCeloTx(rawTransaction, wallet.privateKey)
				break;
			case Protocol.ETHEREUM:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				signedTx = signEthereumTx(rawTransaction, protocol, wallet.privateKey, this.config.environment)
				break;
			default:
				throw new InvalidException('Unsupported protocol')
		}

		return await tc.sendTransaction(
			new SignedTransaction({
				signedTx, protocol, type: TransactionType.DATE_ESCROW_DEPLOY
			}))
	}

	/**
	 * Get date escrows
	 * @param {import('../entity').GetDateEscrowsInput} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async getDateEscrows(input) {
		const { escrowFactoryAddress, wallet, protocol } = input
		validateDateEscrowsGet(input)

		switch (protocol) {
			case Protocol.ETHEREUM:
			case Protocol.CELO:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				return await makeRequest(
					{
						method: 'get', url: `/contract/escrow/${escrowFactoryAddress}/dateEscrows/${wallet.address}?protocol=${protocol}`,
						config: this.config
					}
				)
			default:
				throw new InvalidException('Unsupported protocol')
		}
	}

	/**
	 * Get deposits of native tokens on escrow
	 * @param {import('../entity').GetDepositsOfInput} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async getDepositsOf(input) {
		const { escrowAddress, payee, protocol } = input
		validateDateEscrowGetDepositsOf(input)

		switch (protocol) {
			case Protocol.ETHEREUM:
			case Protocol.CELO:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				return await makeRequest(
					{
						method: 'get', url: `/contract/escrow/${escrowAddress}/depositsOf/${payee}?protocol=${protocol}`,
						config: this.config
					}
				)
			default:
				throw new InvalidException('Unsupported protocol')
		}
	}

	/**
	 * Get deposits of ERC20 tokens on escrow
	 * @param {import('../entity').GetDepositsOfInput} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async getDepositsOfERC20(input) {
		const { escrowAddress, payee, tokenAddress, protocol } = input
		validateDateEscrowGetDepositsOfERC(input)

		switch (protocol) {
			case Protocol.ETHEREUM:
			case Protocol.CELO:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				return await makeRequest(
					{
						method: 'get', url: `/contract/escrow/${escrowAddress}/depositsOfERC20/${payee}/${tokenAddress}?protocol=${protocol}`,
						config: this.config
					}
				)
			default:
				throw new InvalidException('Unsupported protocol')
		}
	}

	/**
	 * Get deposits of ERC721 tokens on escrow
	 * @param {import('../entity').GetDepositsOfInput} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async getDepositsOfERC721(input) {
		const { escrowAddress, payee, tokenAddress, protocol } = input
		validateDateEscrowGetDepositsOfERC(input)

		switch (protocol) {
			case Protocol.ETHEREUM:
			case Protocol.CELO:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				return await makeRequest(
					{
						method: 'get', url: `/contract/escrow/${escrowAddress}/depositsOfERC721/${payee}/${tokenAddress}?protocol=${protocol}`,
						config: this.config
					}
				)
			default:
				throw new InvalidException('Unsupported protocol')
		}
	}

	/**
	 * Get deposits of ERC1155 tokens on escrow
	 * @param {import('../entity').GetDepositsOfInput} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async getDepositsOfERC1155(input) {
		const { escrowAddress, payee, tokenAddress, protocol } = input
		validateDateEscrowGetDepositsOfERC(input)

		switch (protocol) {
			case Protocol.ETHEREUM:
			case Protocol.CELO:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				return await makeRequest(
					{
						method: 'get', url: `/contract/escrow/${escrowAddress}/depositsOfERC1155/${payee}/${tokenAddress}?protocol=${protocol}`,
						config: this.config
					}
				)
			default:
				throw new InvalidException('Unsupported protocol')
		}
	}

	/**
	 * Deposit native tokens to escrow
	 * @param {import('../entity').DepositInput} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async deposit(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { escrowAddress, amount, releaseDate, payee, wallet, protocol } = input
		validateDateEscrowDeposit(input)

		const rawTransaction = await makeRequest(
			{
				method: 'post', url: `/contract/escrow/${escrowAddress}/deposit/${payee}?protocol=${protocol}`,
				config: this.config,
				body: { amount, date: releaseDate, from: wallet.address }
			}
		)

		let signedTx;
		switch (protocol) {
			case Protocol.CELO:
				signedTx = await signCeloTx(rawTransaction, wallet.privateKey)
				break
			case Protocol.ETHEREUM:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				signedTx = signedTx = signEthereumTx(rawTransaction, protocol, wallet.privateKey, this.config.environment)
				break
			default:
				throw new InvalidException('Unsupported protocol')
		}

		return await tc.sendTransaction({ signedTx, protocol, type: TransactionType.ESCROW_DEPOSIT })
	}

	/**
	 * Deposit ERC20 tokens to escrow
	 * @param {import('../entity').DepositERC20Input} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async depositERC20(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { escrowAddress, amount, releaseDate, payee, tokenAddress, wallet, protocol } = input
		validateDateEscrowDepositERC20(input)

		const rawTransaction = await makeRequest(
			{
				method: 'post', url: `/contract/escrow/${escrowAddress}/depositERC20/${payee}?protocol=${protocol}`,
				config: this.config,
				body: { tokenAddress, amount, date: releaseDate, from: wallet.address }
			}
		)

		let signedTx;
		switch (protocol) {
			case Protocol.CELO:
				signedTx = await signCeloTx(rawTransaction, wallet.privateKey)
				break
			case Protocol.ETHEREUM:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				signedTx = signedTx = signEthereumTx(rawTransaction, protocol, wallet.privateKey, this.config.environment)
				break
			default:
				throw new InvalidException('Unsupported protocol')
		}

		return await tc.sendTransaction({ signedTx, protocol, type: TransactionType.ESCROW_DEPOSIT })
	}

	/**
	 * Deposit ERC721 tokens to escrow
	 * @param {import('../entity').DepositERC721Input} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async depositERC721(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { escrowAddress, tokenId, releaseDate, payee, tokenAddress, wallet, protocol } = input
		validateDateEscrowDepositERC721(input)

		const rawTransaction = await makeRequest(
			{
				method: 'post', url: `/contract/escrow/${escrowAddress}/depositERC721/${payee}?protocol=${protocol}`,
				config: this.config,
				body: { tokenAddress, tokenId, date: releaseDate, from: wallet.address }
			}
		)

		let signedTx;
		switch (protocol) {
			case Protocol.CELO:
				signedTx = await signCeloTx(rawTransaction, wallet.privateKey)
				break
			case Protocol.ETHEREUM:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				signedTx = signEthereumTx(rawTransaction, protocol, wallet.privateKey, this.config.environment)
				break
			default:
				throw new InvalidException('Unsupported protocol')
		}

		return await tc.sendTransaction({ signedTx, protocol, type: TransactionType.ESCROW_DEPOSIT })
	}

	/**
	 * Deposit ERC1155 tokens to escrow
	 * @param {import('../entity').DepositERC1155Input} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async depositERC1155(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { escrowAddress, tokenId, amount, releaseDate, payee, tokenAddress, wallet, protocol } = input
		validateDateEscrowDepositERC1155(input)

		const rawTransaction = await makeRequest(
			{
				method: 'post', url: `/contract/escrow/${escrowAddress}/depositERC1155/${payee}?protocol=${protocol}`,
				config: this.config,
				body: { tokenAddress, tokenId, amount, date: releaseDate, from: wallet.address }
			}
		)

		let signedTx;
		switch (protocol) {
			case Protocol.CELO:
				signedTx = await signCeloTx(rawTransaction, wallet.privateKey)
				break
			case Protocol.ETHEREUM:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				signedTx = signEthereumTx(rawTransaction, protocol, wallet.privateKey, this.config.environment)
				break
			default:
				throw new InvalidException('Unsupported protocol')
		}

		return await tc.sendTransaction({ signedTx, protocol, type: TransactionType.ESCROW_DEPOSIT })
	}

	/**
	 * Withdraw native tokens from escrow
	 * @param {import('../entity').WithdrawInput} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async withdraw(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { escrowAddress, payee, wallet, protocol } = input
		validateDateEscrowWithdraw(input)

		const rawTransaction = await makeRequest(
			{
				method: 'post', url: `/contract/escrow/${escrowAddress}/withdraw/${payee}?protocol=${protocol}`,
				config: this.config,
				body: { from: wallet.address }
			}
		)

		let signedTx;
		switch (protocol) {
			case Protocol.CELO:
				signedTx = await signCeloTx(rawTransaction, wallet.privateKey)
				break
			case Protocol.ETHEREUM:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				signedTx = signEthereumTx(rawTransaction, protocol, wallet.privateKey, this.config.environment)
				break
			default:
				throw new InvalidException('Unsupported protocol')
		}

		return await tc.sendTransaction({ signedTx, protocol, type: TransactionType.ESCROW_WITHDRAW })
	}

	/**
	 * Withdraw ERC20 tokens from escrow
	 * @param {import('../entity').WithdrawERC20Input} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async withdrawERC20(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { escrowAddress, payee, tokenAddress, wallet, protocol } = input
		validateDateEscrowWithdrawERC(input)

		const rawTransaction = await makeRequest(
			{
				method: 'post', url: `/contract/escrow/${escrowAddress}/withdrawERC20/${payee}?protocol=${protocol}`,
				config: this.config,
				body: { tokenAddress, from: wallet.address }
			}
		)

		let signedTx;
		switch (protocol) {
			case Protocol.CELO:
				signedTx = await signCeloTx(rawTransaction, wallet.privateKey)
				break
			case Protocol.ETHEREUM:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				signedTx = signEthereumTx(rawTransaction, protocol, wallet.privateKey, this.config.environment)
				break
			default:
				throw new InvalidException('Unsupported protocol')
		}

		return await tc.sendTransaction({ signedTx, protocol, type: TransactionType.ESCROW_WITHDRAW })
	}

	/**
	 * Withdraw ERC721 tokens from escrow
	 * @param {import('../entity').WithdrawERC721Input} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async withdrawERC721(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { escrowAddress, payee, tokenAddress, wallet, protocol } = input
		validateDateEscrowWithdrawERC(input)

		const rawTransaction = await makeRequest(
			{
				method: 'post', url: `/contract/escrow/${escrowAddress}/withdrawERC721/${payee}?protocol=${protocol}`,
				config: this.config,
				body: { tokenAddress, from: wallet.address }
			}
		)

		let signedTx;
		switch (protocol) {
			case Protocol.CELO:
				signedTx = await signCeloTx(rawTransaction, wallet.privateKey)
				break
			case Protocol.ETHEREUM:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				signedTx = signEthereumTx(rawTransaction, protocol, wallet.privateKey, this.config.environment)
				break
			default:
				throw new InvalidException('Unsupported protocol')
		}

		return await tc.sendTransaction({ signedTx, protocol, type: TransactionType.ESCROW_WITHDRAW })
	}

	/**
	 * Withdraw ERC1155 tokens from escrow
	 * @param {import('../entity').WithdrawERC1155Input} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async withdrawERC1155(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { escrowAddress, payee, tokenAddress, wallet, protocol } = input
		validateDateEscrowWithdrawERC(input)

		const rawTransaction = await makeRequest(
			{
				method: 'post', url: `/contract/escrow/${escrowAddress}/withdrawERC1155/${payee}?protocol=${protocol}`,
				config: this.config,
				body: { tokenAddress, from: wallet.address }
			}
		)

		let signedTx;
		switch (protocol) {
			case Protocol.CELO:
				signedTx = await signCeloTx(rawTransaction, wallet.privateKey)
				break
			case Protocol.ETHEREUM:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				signedTx = signEthereumTx(rawTransaction, protocol, wallet.privateKey, this.config.environment)
				break
			default:
				throw new InvalidException('Unsupported protocol')
		}

		return await tc.sendTransaction({ signedTx, protocol, type: TransactionType.ESCROW_WITHDRAW })
	}
}

module.exports.EscrowController = Controller