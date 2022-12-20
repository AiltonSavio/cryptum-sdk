module.exports.getEscrowControllerInstance = (config) => new Controller(config)
const InvalidException = require('../../../errors/InvalidException')
const { makeRequest } = require('../../../services')
const { signEthereumTx } = require('../../../services/blockchain/ethereum')
const { Protocol } = require('../../../services/blockchain/constants')
const Interface = require('./interface')
const { getTransactionControllerInstance } = require('../../transaction/controller')
const { SignedTransaction, TransactionType } = require('../../transaction/entity')
const { signCeloTx } = require('../../../services/blockchain/celo')
const { 
	validateEscrowDeploy,
	validateEscrowsGet, 
	valiEscrowGetDepositsOf,
	validateEscrowApprove,
	validateEscrowDeposit,
	validateEscrowWithdraw
} = require('../../../services/validations/escrow')


class Controller extends Interface {
  /**
   * Deploy escrow contract
   * @param {import('../entity').DeployEscrowInput} input
   * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
   */
	async deployEscrow(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { wallet, protocol } = input
		validateEscrowDeploy(input)

		const rawTransaction = await makeRequest(
			{
				method: 'post', url: `/contract/escrow/deployDateEscrow?protocol=${protocol}`,
				config: this.config,
				body: { from: wallet.address }
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
	 * Get escrows
	 * @param {import('../entity').GetEscrowsInput} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async getEscrows(input) {
		const { wallet, protocol } = input
		validateEscrowsGet(input)

		switch (protocol) {
			case Protocol.ETHEREUM:
			case Protocol.CELO:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				return await makeRequest(
					{
						method: 'get', url: `/contract/escrow/dateEscrows/${wallet.address}?protocol=${protocol}`,
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
		const { payee, protocol, escrowAddress, tokenAddress, tokenType } = input
		valiEscrowGetDepositsOf(input)

		let url;
		switch (tokenType) {
			case 'Native':
				url = `/contract/escrow/${escrowAddress}/depositsOf/${payee}?protocol=${protocol}`;
				break;
			case 'ERC20':
				url = `/contract/escrow/${escrowAddress}/depositsOfERC20/${payee}/${tokenAddress}?protocol=${protocol}`;
				break;
			case 'ERC721':
				url = `/contract/escrow/${escrowAddress}/depositsOfERC721/${payee}/${tokenAddress}?protocol=${protocol}`;
				break;
			case 'ERC1155':
				url = `/contract/escrow/${escrowAddress}/depositsOfERC1155/${payee}/${tokenAddress}?protocol=${protocol}`;
				break;
		}

		switch (protocol) {
			case Protocol.ETHEREUM:
			case Protocol.CELO:
			case Protocol.BSC:
			case Protocol.POLYGON:
			case Protocol.AVAXCCHAIN:
				return await makeRequest(
					{
						method: 'get', url,
						config: this.config
					}
				)
			default:
				throw new InvalidException('Unsupported protocol')
		}
	}

	/**
	 * Approves a token to be used by the escrow
	 * @param {import('../entity').ApproveTokenInput} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async approve(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { wallet, protocol, escrowAddress, tokenAddress, tokenType } = input
		validateEscrowApprove(input)

		let url;
		switch (tokenType) {
			case 'ERC20':
				url = `/contract/escrow/${escrowAddress}/approveERC20/${tokenAddress}?protocol=${protocol}`;
				break;
			case 'ERC721':
				url = `/contract/escrow/${escrowAddress}/approveERC721/${tokenAddress}?protocol=${protocol}`;
				break;
			case 'ERC1155':
				url = `/contract/escrow/${escrowAddress}/approveERC1155/${tokenAddress}?protocol=${protocol}`;
				break;
		}

		const rawTransaction = await makeRequest(
			{
				method: 'post', url,
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
				signedTx = signedTx = signEthereumTx(rawTransaction, protocol, wallet.privateKey, this.config.environment)
				break
			default:
				throw new InvalidException('Unsupported protocol')
		}

		return await tc.sendTransaction({ signedTx, protocol, type: TransactionType.ESCROW_APPROVE })
	}

	/**
	 * Deposit tokens to escrow
	 * @param {import('../entity').DepositInput} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async deposit(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { wallet, protocol, escrowAddress, payee, tokenAddress, tokenType, tokenId, amount, releaseDate } = input
		validateEscrowDeposit(input)

		let url;
		let body;
		switch (tokenType) {
			case 'Native':
				url = `/contract/escrow/${escrowAddress}/deposit/${payee}?protocol=${protocol}`;
				body = { from: wallet.address, date: releaseDate, amount }
				break;
			case 'ERC20':
				url = `/contract/escrow/${escrowAddress}/depositERC20/${payee}/${tokenAddress}?protocol=${protocol}`;
				body = { from: wallet.address, date: releaseDate, amount }
				break;
			case 'ERC721':
				url = `/contract/escrow/${escrowAddress}/depositERC721/${payee}/${tokenAddress}?protocol=${protocol}`;
				body = { from: wallet.address, date: releaseDate, tokenId }
				break;
			case 'ERC1155':
				url = `/contract/escrow/${escrowAddress}/depositERC1155/${payee}/${tokenAddress}?protocol=${protocol}`;
				body = { from: wallet.address, date: releaseDate, tokenId, amount }
				break;
		}

		const rawTransaction = await makeRequest(
			{
				method: 'post', url,
				config: this.config,
				body
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
	 * Withdraw tokens from escrow
	 * @param {import('../entity').WithdrawInput} input
	 * @returns {Promise<import('../../transaction/entity').TransactionResponse>}
	 */
	async withdraw(input) {
		const tc = getTransactionControllerInstance(this.config)
		const { wallet, protocol, escrowAddress, payee, tokenAddress, tokenType } = input
		validateEscrowWithdraw(input)

		let url;
		switch (tokenType) {
			case 'Native':
				url = `/contract/escrow/${escrowAddress}/withdraw/${payee}?protocol=${protocol}`;
				break;
			case 'ERC20':
				url = `/contract/escrow/${escrowAddress}/withdrawERC20/${payee}/${tokenAddress}?protocol=${protocol}`;
				break;
			case 'ERC721':
				url = `/contract/escrow/${escrowAddress}/withdrawERC721/${payee}/${tokenAddress}?protocol=${protocol}`;
				break;
			case 'ERC1155':
				url = `/contract/escrow/${escrowAddress}/withdrawERC1155/${payee}/${tokenAddress}?protocol=${protocol}`;
				break;
		}

		const rawTransaction = await makeRequest(
			{
				method: 'post', url,
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
}

module.exports.EscrowController = Controller