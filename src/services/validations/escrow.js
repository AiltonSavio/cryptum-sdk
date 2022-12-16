const InvalidException = require("../../errors/InvalidException")
const { Protocol } = require("../blockchain/constants")

module.exports.validateDateEscrowDeploy = ({
  protocol,
  wallet, 
  escrowFactoryAddress
}) => {
  if (!wallet) {
    throw new InvalidException('Invalid wallet')
  }
  if (!escrowFactoryAddress || typeof escrowFactoryAddress !== 'string') {
    throw new InvalidException('Invalid escrowFactoryAddress')
  }
  if (![Protocol.BSC, Protocol.CELO, Protocol.ETHEREUM, Protocol.AVAXCCHAIN, Protocol.POLYGON].includes(protocol)) {
    throw new InvalidException('Invalid protocol')
  }  
}

module.exports.validateDateEscrowsGet = ({
  protocol,
  wallet,
  escrowFactoryAddress
}) => {
  if (!wallet) {
    throw new InvalidException('Invalid wallet')
  }
  if (!escrowFactoryAddress || typeof escrowFactoryAddress !== 'string') {
    throw new InvalidException('Invalid escrowFactoryAddress')
  }
  if (![Protocol.BSC, Protocol.CELO, Protocol.ETHEREUM, Protocol.AVAXCCHAIN, Protocol.POLYGON].includes(protocol)) {
    throw new InvalidException('Invalid protocol')
  }
}

module.exports.validateDateEscrowGetDepositsOf = ({
  escrowAddress, 
  payee, 
  protocol
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
}

module.exports.validateDateEscrowGetDepositsOfERC = ({
  escrowAddress, 
  payee,
  tokenAddress,
  protocol
}) => {
  if (!escrowAddress || typeof escrowAddress !== 'string') {
    throw new InvalidException('Invalid escrowAddress')
  }

  if (!payee || typeof payee !== 'string') {
    throw new InvalidException('Invalid payee address')
  }

  if (!tokenAddress || typeof tokenAddress !== 'string') {
    throw new InvalidException('Invalid tokenAddress')
  }

  if (![Protocol.BSC, Protocol.CELO, Protocol.ETHEREUM, Protocol.AVAXCCHAIN, Protocol.POLYGON].includes(protocol)) {
    throw new InvalidException('Invalid protocol')
  }
}

module.exports.validateDateEscrowDeposit = ({
  escrowAddress,
  amount,
  releaseDate,
  payee,
  wallet,
  protocol
}) => {
  if (!escrowAddress || typeof escrowAddress !== 'string') {
    throw new InvalidException('Invalid escrowAddress')
  }

  if (!amount || typeof amount !== 'string') {
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
}

module.exports.validateDateEscrowDepositERC20 = ({
  escrowAddress,
  tokenAddress,
  amount,
  releaseDate,
  payee,
  wallet,
  protocol
}) => {
  if (!escrowAddress || typeof escrowAddress !== 'string') {
    throw new InvalidException('Invalid escrowAddress')
  }

  if (!tokenAddress || typeof tokenAddress !== 'string') {
    throw new InvalidException('Invalid tokenAddress')
  }

  if (!amount || typeof amount !== 'string') {
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
}

module.exports.validateDateEscrowDepositERC721 = ({
  escrowAddress,
  tokenAddress,
  tokenId,
  releaseDate,
  payee,
  wallet,
  protocol
}) => {
  if (!escrowAddress || typeof escrowAddress !== 'string') {
    throw new InvalidException('Invalid escrowAddress')
  }

  if (!tokenAddress || typeof tokenAddress !== 'string') {
    throw new InvalidException('Invalid tokenAddress')
  }

  if (!tokenId || typeof tokenId !== 'string') {
    throw new InvalidException('Invalid tokenId')
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
}

module.exports.validateDateEscrowDepositERC1155 = ({
  escrowAddress,
  tokenAddress,
  tokenId,
  amount,
  releaseDate,
  payee,
  wallet,
  protocol
}) => {
  if (!escrowAddress || typeof escrowAddress !== 'string') {
    throw new InvalidException('Invalid escrowAddress')
  }

  if (!tokenAddress || typeof tokenAddress !== 'string') {
    throw new InvalidException('Invalid tokenAddress')
  }

  if (!tokenId || typeof tokenId !== 'string') {
    throw new InvalidException('Invalid tokenId')
  }

  if (!amount || typeof amount !== 'string') {
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
}

module.exports.validateDateEscrowWithdraw = ({
  escrowAddress,
  payee,
  wallet,
  protocol
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
}

module.exports.validateDateEscrowWithdrawERC = ({
  escrowAddress,
  tokenAddress,
  payee,
  wallet,
  protocol
}) => {
  if (!escrowAddress || typeof escrowAddress !== 'string') {
    throw new InvalidException('Invalid escrowAddress')
  }

  if (!tokenAddress || typeof tokenAddress !== 'string') {
    throw new InvalidException('Invalid tokenAddress')
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
}