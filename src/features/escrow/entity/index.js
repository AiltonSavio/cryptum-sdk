/**
 * @typedef {Object} DeployEscrowInput
 * @property {import('../../../services/blockchain/constants').Protocol} protocol
 * @property {import('../../wallet/entity').Wallet} wallet
 * @property {"date"} type type of escrow

 * @typedef {Object} GetEscrowsInput
 * @property {import('../../../services/blockchain/constants').Protocol} protocol
 * @property {import('../../wallet/entity').Wallet} wallet
 * @property {"date"} type type of escrow

 * @typedef {Object} GetDepositsOfInput
 * @property {import('../../../services/blockchain/constants').Protocol} protocol
 * @property {string} payee payee recipient address 
 * @property {string} escrowAddress escrow contract address
 * @property {string} tokenAddress token contract address (if tokenType is not Native)
 * @property {"Native" | "ERC20" | "ERC721" | "ERC1155"} tokenType type of the token

 * @typedef {Object} ApproveTokenInput
 * @property {import('../../../services/blockchain/constants').Protocol} protocol
 * @property {import('../../wallet/entity').Wallet} wallet
 * @property {string} escrowAddress escrow contract address
 * @property {"ERC20" | "ERC721" | "ERC1155"} tokenType type of the token

 * @typedef {Object} DepositInput
 * @property {import('../../../services/blockchain/constants').Protocol} protocol
 * @property {import('../../wallet/entity').Wallet} wallet
 * @property {string} escrowAddress escrow contract address
 * @property {string} payee payee recipient address
 * @property {string} tokenAddress token contract address (if tokenType is not Native)
 * @property {"Native" | "ERC20" | "ERC721" | "ERC1155"} tokenType type of the token
 * @property {string} tokenId tokenId of the token (if tokenType is ERC721 or ERC1155)
 * @property {string} amount amount of tokens to be deposited (if tokenType is not ERC721)
 * @property {string} releaseDate release date of the escrow deposit

 * @typedef {Object} WithdrawInput
 * @property {import('../../../services/blockchain/constants').Protocol} protocol
 * @property {import('../../wallet/entity').Wallet} wallet
 * @property {string} escrowAddress escrow contract address
 * @property {string} payee payee recipient address
 * @property {string} tokenAddress token contract address (if tokenType is not Native)
 * @property {"Native" | "ERC20" | "ERC721" | "ERC1155"} tokenType type of the token
 */

module.exports = {}