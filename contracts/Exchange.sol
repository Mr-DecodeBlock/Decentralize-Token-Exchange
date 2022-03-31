// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Token.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Exchange {
     using SafeMath for uint;
     address public feeAccount;
     uint256 public feePercent;
     address constant ETHER = address(0);
     mapping(address=>mapping(address=> uint256)) public tokens;
     mapping(uint256=>_Order) public orders;
     mapping(uint256=> bool) public orderCancelled;
     mapping(uint256=> bool) public orderFilled;
     uint256 public orderCount;
     event Deposite(address token, address user, uint amount, uint balance);
     event Withdraw(address token, address user, uint amount, uint balance);
     event Order(
         uint id,
         address user,
         address tokenGet,
         uint amountGet,
         address tokenGive,
         uint amountGive,
         uint timestamp
     );
     event Cancel(
         uint id,
         address user,
         address tokenGet,
         uint amountGet,
         address tokenGive,
         uint amountGive,
         uint timestamp
     );
    event Trade(
         uint id,
         address user,
         address tokenGet,
         uint amountGet,
         address tokenGive,
         uint amountGive,
         address userFill,
         uint timestamp
     );
    struct _Order{
        uint id;
        address user;
        address tokenGet;
        uint amountGet;
        address tokenGive;
        uint amountGive;
        uint timestamp;
    }

     constructor(address _feeAccount, uint256 _feePercent){
        feeAccount = _feeAccount;
        feePercent = _feePercent;
     }
     
     function depositeEther(address _ether) payable public{
       tokens[_ether][msg.sender] = tokens[_ether][msg.sender].add(msg.value);
       emit Deposite(_ether, msg.sender, msg.value,  tokens[_ether][msg.sender]);
     }

     function withdrawEther(uint _amount, address _ether) public{
        require(tokens[_ether][msg.sender] >= _amount);
        tokens[_ether][msg.sender] = tokens[_ether][msg.sender].sub(_amount);
        payable(msg.sender).transfer(_amount);
        emit Withdraw(_ether, msg.sender, _amount,  tokens[_ether][msg.sender]);
     }

     function depositeToken(address _token, uint _amount) public{
       Token(_token).transferFrom(msg.sender , address(this),_amount);
       tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);
       emit Deposite(_token, msg.sender , _amount,tokens[_token][msg.sender]);
     } 

     function withdrawTokens (address _token ,  uint _amount) public {
       require(tokens[_token][msg.sender] >= _amount);
       tokens[_token][msg.sender] = tokens[_token][msg.sender].sub(_amount);
       Token(_token).transferTo(msg.sender, _amount);
       emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
     }

     function balanceOf(address _token, address _user ) public view returns (uint256){
         return tokens[_token][_user];
     }

     function makeOrder(address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) public{
         orderCount++;
         orders[orderCount] = _Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive,_amountGive, block.timestamp);
         emit Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, block.timestamp);
     }

     function cancelOrder(uint _id) public{
         _Order storage _order = orders[_id];
         require(_order.user == msg.sender);
         require(_order.id== _id);
         orderCancelled[_id] = true;
         emit Cancel(_order.id, msg.sender, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive, _order.timestamp);
     }

     function fillOrder(uint _id) public{
        require(_id > 0 && _id <= orderCount); 
        require(!orderCancelled[_id]);
        require(!orderFilled[_id]);
        _Order storage _order = orders[_id];
        _trader(_order.id, _order.user, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive);
        orderFilled[_id] = true;
     }

     function _trader(uint _orderId, address _user, address _tokenGet, uint _amountGet , address _tokenGive, uint _amountGive) internal{
        uint _feeAmount = _amountGive.mul(feePercent).div(100);
        console.log(_amountGet, _amountGive);
        console.log(balanceOf(_tokenGet,msg.sender));
        console.log(balanceOf(_tokenGive,msg.sender));
        console.log(balanceOf(_tokenGive,_user));
        console.log(balanceOf(_tokenGet,_user));
        tokens[_tokenGet][msg.sender] = tokens[_tokenGet][msg.sender].sub(_amountGet.add(_feeAmount));
        tokens[_tokenGet][_user] = tokens[_tokenGet][_user].add(_amountGet);
        tokens[_tokenGet][feeAccount] = tokens[_tokenGet][feeAccount].add(_feeAmount);
        tokens[_tokenGive][_user]= tokens[_tokenGive][_user].sub(_amountGive);
        tokens[_tokenGive][msg.sender] = tokens[_tokenGive][msg.sender].add(_amountGive);
       
        emit Trade(_orderId, _user, _tokenGet, _amountGet, _tokenGive, _amountGive, msg.sender, block.timestamp);
     }

     fallback() external payable {}
     receive() external payable{}
}

// msg.sender = filling the order
// _user = created the order

// someone makes an order and other person fills the order
// say albert make an order i want to get 1 ether (ether is tokenget,1 token amountget) and give 2 DDAP (DDAP is the tokenGive, 2 is the amountget)
// Augustine say hey i wanna fill this order i need 2 DDAP i can give you 1 ether.
// order id.

// tokens[_tokenGet][msg.sender] = tokens[_tokenGet][msg.sender].sub(_amountGet);
// tokens[_tokenGet][_user] = tokens[_tokenGet][_user].add(_amountGet);
// tokens[_tokenGiven][_usser]= tokens[_tokenGive][_user].sub(_amoutGive)
// tokens[_tokenGive][msg.sender
