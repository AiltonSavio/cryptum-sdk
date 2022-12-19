const InvalidException = require("../../errors/InvalidException")
const { Protocol } = require("../blockchain/constants")

module.exports.validateEscrowDeploy = ({
  wallet,
  protocol,
  type,
}) => {
  if (!wallet) {
    throw new InvalidException('Invalid wallet')
  }
  if (![Protocol.BSC, Protocol.CELO, Protocol.ETHEREUM, Protocol.AVAXCCHAIN, Protocol.POLYGON].includes(protocol)) {
    throw new InvalidException('Invalid protocol')
  }

  if (!type || type !== 'date') {
    throw new InvalidException('Invalid type')
  }
}

module.exports.validateEscrowsGet = ({
  wallet,
  protocol,
  type,
}) => {
  if (!wallet) {
    throw new InvalidException('Invalid wallet')
  }

  if (![Protocol.BSC, Protocol.CELO, Protocol.ETHEREUM, Protocol.AVAXCCHAIN, Protocol.POLYGON].includes(protocol)) {
    throw new InvalidException('Invalid protocol')
  }

  if (!type || type !== 'date') {
    throw new InvalidException('Invalid type')
  }
}

module.exports.valiEscrowGetDepositsOf = ({
  payee,
  protocol,
  escrowAddress,
  tokenAddress,
  tokenType
}) => {
  if (!escrowAddress || typeof escrowAddress !== 'string') {
    throw new InvalidException('Invalid escrowAddress')
  }

  if (!payee || typeof payee !== 'string') {
    throw new InvalidException('Invalid payee address')
  }

  if (![Protocol.BSC, Protocol.CELO, Protocol.ETHEREUM, Protocol.AVAXCCHAIN, Protocol.POLYGON].includes(protocol)) {
    throw new InvalidException('Invalid protocol')
  }

  if (!tokenType || typeof tokenType !== 'string' || !['Native', 'ERC20', 'ERC721', 'ERC1155'].includes(tokenType)) {
    throw new InvalidException('Invalid tokenType')
  }

  if (tokenType !== 'Native' && (!tokenAddress || typeof tokenAddress !== 'string')) {
    throw new InvalidException('Invalid tokenAddress')
  }
}

module.exports.validateEscrowApprove = ({
  wallet,
  protocol,
  escrowAddress,
  tokenAddress,
  tokenType
}) => {
  if (!escrowAddress || typeof escrowAddress !== 'string') {
    throw new InvalidException('Invalid escrowAddress')
  }

  if (!wallet) {
    throw new InvalidException('Invalid wallet')
  }

  if (![Protocol.BSC, Protocol.CELO, Protocol.ETHEREUM, Protocol.AVAXCCHAIN, Protocol.POLYGON].includes(protocol)) {
    throw new InvalidException('Invalid protocol')
  }

  if (!tokenType || typeof tokenType !== 'string' || !['ERC20', 'ERC721', 'ERC1155'].includes(tokenType)) {
    throw new InvalidException('Invalid tokenType')
  }

  if (!tokenAddress || typeof tokenAddress !== 'string') {
    throw new InvalidException('Invalid tokenAddress')
  }
}

module.exports.validateEscrowDeposit = ({
  wallet, 
  protocol, 
  escrowAddress, 
  payee, 
  tokenAddress, 
  type, 
  tokenType, 
  tokenId, 
  amount, 
  releaseDate
}) => {
  if (!escrowAddress || typeof escrowAddress !== 'string') {
    throw new InvalidException('Invalid escrowAddress')
  }

  if (tokenType !== 'ERC721' && (!amount || typeof amount !== 'string')) {
    throw new InvalidException('Invalid amount')
  }

  if (!releaseDate || typeof releaseDate !== 'string') {
    throw new InvalidException('Invalid releaseDate')
  }

  if (!payee || typeof payee !== 'string') {
    throw new InvalidException('Invalid payee address')
  }

  if (!wallet) {
    throw new InvalidException('Invalid wallet')
  }

  if (![Protocol.BSC, Protocol.CELO, Protocol.ETHEREUM, Protocol.AVAXCCHAIN, Protocol.POLYGON].includes(protocol)) {
    throw new InvalidException('Invalid protocol')
  }

  if (!type || type !== 'date') {
    throw new InvalidException('Invalid type')
  }

  if (!tokenType || typeof tokenType !== 'string' || !['Native', 'ERC20', 'ERC721', 'ERC1155'].includes(tokenType)) {
    throw new InvalidException('Invalid tokenType')
  }

  if (tokenType !== 'Native' && (!tokenAddress || typeof tokenAddress !== 'string')) {
    throw new InvalidException('Invalid tokenAddress')
  }

  if ((tokenType === 'ERC721' || tokenType === 'ERC1155') && (!tokenId || typeof tokenId !== 'string')) {
    throw new InvalidException('Invalid tokenId')
  }
}

module.exports.validateEscrowWithdraw = ({
  wallet, 
  protocol, 
  escrowAddress, 
  payee, 
  tokenAddress, 
  tokenType
}) => {
  if (!escrowAddress || typeof escrowAddress !== 'string') {
    throw new InvalidException('Invalid escrowAddress')
  }

  if (!payee || typeof payee !== 'string') {
    throw new InvalidException('Invalid payee address')
  }

  if (!wallet) {
    throw new InvalidException('Invalid wallet')
  }

  if (![Protocol.BSC, Protocol.CELO, Protocol.ETHEREUM, Protocol.AVAXCCHAIN, Protocol.POLYGON].includes(protocol)) {
    throw new InvalidException('Invalid protocol')
  }

  if (!tokenType || typeof tokenType !== 'string' || !['Native', 'ERC20', 'ERC721', 'ERC1155'].includes(tokenType)) {
    throw new InvalidException('Invalid tokenType')
  }

  if (tokenType !== 'Native' && (!tokenAddress || typeof tokenAddress !== 'string')) {
    throw new InvalidException('Invalid tokenAddress')
  }
}