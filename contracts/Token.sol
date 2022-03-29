// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Token {
    using SafeMath for uint;
    string public name = "Hyadum Coin";
    string public symbol = "HYC";
    uint256 public decimals = 18;
    uint256 public totalSupply;

    //track balances
    mapping(address => uint256) public balanceOf;

    //send tokens

    constructor (){
      totalSupply = 1000000 * (10 ** decimals);
      balanceOf[msg.sender] = totalSupply;
    }

    function transferTo(address _to, uint _value)public returns (bool success) {
    //  require(totalSupply < 0 , 'not sufficient balance');
     balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
     balanceOf[_to] = balanceOf[_to].add(_value);
     return true;
    }


}