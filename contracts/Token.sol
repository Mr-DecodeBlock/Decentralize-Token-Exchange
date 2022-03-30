// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract Token {
    using SafeMath for uint;
    string public name = "Hyadum Coin";
    string public symbol = "HYC";
    uint256 public decimals = 18;
    uint256 public totalSupply;


    //track balances
    mapping(address => uint256) public balanceOf;
    mapping(address=>mapping(address=> uint256)) public allowance;
    event Transfer(address indexed from , address indexed to, uint256 amout);
    event Approval(address indexed approver, address indexed spender , uint256  indexed amount);
    //send tokens

    constructor (){
      totalSupply = 1000000 * (10 ** decimals);
      balanceOf[msg.sender] = totalSupply;
    }

    function transferTo(address _to, uint _value)public returns (bool success) {
     require(balanceOf[msg.sender] >= _value,'VM Exception while processing transaction: revert');
    _transferTo(msg.sender, _to, _value);
     return true;
    }

    function _transferTo(address _from, address _to, uint256 _value) internal virtual{
     balanceOf[_from] = balanceOf[_from].sub(_value);
     balanceOf[_to] = balanceOf[_to].add(_value);
     emit Transfer(_from, _to, _value);
    }

    function approve(address _spender, uint256 _amount ) public returns (bool success){
      allowance[msg.sender][_spender] = _amount;
      emit Approval(msg.sender,_spender, _amount);
      return true;
    }

    function transferFrom (address _from , address _to, uint256 _value) public returns (bool success) {
        console.log(_from,_to, _value);
    //    require(_value <= balanceOf[_from]);
    //    require(_value <= allowance[_from][msg.sender]);
    //    allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value);
    //   _transferTo(_from, _to, _value);
       return true;
    }


 

}