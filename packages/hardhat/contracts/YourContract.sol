pragma solidity ^0.6.7;
//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YourContract is ERC20 {
    constructor() public ERC20("Rabbits", "🐰") {
        _mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 1000 ether);
        _mint(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 1000 ether);
        _mint(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, 1000 ether);
    }
}
