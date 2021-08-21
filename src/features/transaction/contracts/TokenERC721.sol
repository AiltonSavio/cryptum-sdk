// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol';
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';

contract TokenERC721 is ERC721Pausable, ERC721Enumerable, ERC721URIStorage, AccessControlEnumerable {
    bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
    bytes32 public constant PAUSER_ROLE = keccak256('PAUSER_ROLE');

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());
    }

    /**
     * @dev Function to mint tokens.
     * @param to The address that will receive the minted tokens.
     * @param tokenId The token id to mint.
     * @param tokenURI The token URI of the minted token.
     * @return A boolean that indicates if the operation was successful.
     */
    function mintWithTokenURI(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) onlyRole(MINTER_ROLE) public returns (bool) {
        require(hasRole(MINTER_ROLE, _msgSender()), 'must have minter role to mint');
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return true;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerable, ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
        return ERC721URIStorage._burn(tokenId);
    }

    function mintMultiple(
        address[] memory to,
        uint256[] memory tokenId,
        string[] memory tokenURI
    ) onlyRole(MINTER_ROLE) public returns (bool) {
        require(hasRole(MINTER_ROLE, _msgSender()), 'must have minter role to mint');
        for (uint256 i = 0; i < to.length; i++) {
            _mint(to[i], tokenId[i]);
            _setTokenURI(tokenId[i], tokenURI[i]);
        }
        return true;
    }

    function burn(uint256 tokenId) onlyRole(MINTER_ROLE) public virtual {
        require(_isApprovedOrOwner(_msgSender(), tokenId), 'caller is not owner nor approved');
        _burn(tokenId);
    }

    function safeTransfer(address to, uint256 tokenId) public {
        safeTransferFrom(_msgSender(), to, tokenId, '');
    }

    function pause() onlyRole(PAUSER_ROLE) public {
        _pause();
    }

    function unpause() onlyRole(PAUSER_ROLE) public {
        _unpause();
    }
}
