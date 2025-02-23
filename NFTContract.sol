// SPDX-License-Identifier: MIT

// TODO : Base uri json format structure
// {
// "name": "DecentraClasses",
// "description": "This is a simple NFT",
// "image": "ipfs://QmYzLarbWG9bMvqGYgV9XpiUiF3FiuSBCi4kz4Mzmd3cdo"
// }

pragma solidity ^0.8.19;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract dNFT is ERC721 {
    // TODO: add BASE URI FOR NFT, refer above for uri format
    string s_base_URI = "ipfs://QmTJmnqcDgC74LeHDZbtaF3NK2jpEQnPUUG1vTd738Nsz2";

    address public s_owner;

    address[] can_mint;

    event ownerChanged(address indexed prevOwner, address indexed newOwner);
    event newMinterAdded(address indexed newMinter);
    event minterRemoved(address indexed minter);

    uint256 private _tokenIdCounter = 0;

    modifier onlyOwner() {
        require(msg.sender == s_owner, "You are not the owner");
        _;
    }

    modifier ownerOrMinter() {
        require(
            msg.sender == s_owner || _isApproved(msg.sender) != 0,
            "You are not authorized to access this"
        );
        _;
    }

    // TODO: Change the name of NFT token
    constructor() ERC721("Decentra", "DCS") {
        s_owner = msg.sender;
    }

    function setBaseURI(string memory _URI) external onlyOwner {
        s_base_URI = _URI;
    }

    function safeMint(address to) public ownerOrMinter {
        uint256 tokenId = _tokenIdCounter;
        _mint(to, tokenId);
        _tokenIdCounter += 1;
    }

    function addMinter(address _add) external onlyOwner {
        can_mint.push(_add);
        emit newMinterAdded(_add);
    }

    function removeMemebers(address _remove) public onlyOwner {
        uint index = _isApproved(_remove);
        require(index != 0, "Minter does not exist");
        index -= 1;
        require(index < can_mint.length);
        can_mint[index] = can_mint[can_mint.length - 1];
        can_mint.pop();

        emit minterRemoved(_remove);
    }

    function _isApproved(address _add) internal view onlyOwner returns (uint) {
        uint len = can_mint.length;
        for (uint i = 0; i < len; i++) {
            if (can_mint[i] == _add) {
                return (i + 1);
            }
        }

        return (0);
    }

    function changeOwner(address _newOwner) external onlyOwner {
        address oldOwner = s_owner;
        s_owner = _newOwner;

        emit ownerChanged(oldOwner, _newOwner);
    }

    // The following functions are overrides

    function _update(
        address to,
        uint256 tokenId,
        address zero
    ) internal virtual override returns (address) {
        require(
            // !_exists(tokenId),
            // "This NFT is Non-transferable and Non-burnable"
            msg.sender == address(0),
            "This NFT is Non-transferable and Non-burnable"
        );
        super._update(to, tokenId, zero);
        return address(msg.sender);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721) returns (string memory) {
        require(_exists(tokenId), "Token ID does not exist");
        return s_base_URI;
    }

    function _exists(uint256 _tokenId) internal view returns (bool) {
        return (_tokenId < _tokenIdCounter);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
