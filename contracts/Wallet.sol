// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet{

    address public owner;
    mapping (address => uint) public balance;
    event WithdrawMoney(address indexed to, uint amount);
    event DepositMoney (address indexed to, uint amount);

    struct Record{
        address user;
        uint256 amount;
        uint256 timestamp; // to track when the deposit was made
        string txHash; // to track the transaction hash
    }
    Record[]public records;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner,"Only owner can call this function!");
        _;
    }

    receive() external payable {

    }

    function deposit() public payable {
        require(msg.value > 0, "You should have enough balance to send money!");
        balance[msg.sender] += msg.value;
        
        records.push(Record({
            user: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            txHash: "" //Update in frontend after transaction
        }));
        emit DepositMoney(msg.sender, msg.value);
    }

    fallback() external payable {
    }
    
    function withdraw(address payable _to, uint _amount) public onlyOwner() {
        require(address(this).balance >= _amount ,"Insufficient balance");
        _to.transfer(_amount);
        balance[_to] += _amount;

        records.push(Record({
            user: _to,
            amount: _amount,
            timestamp: block.timestamp,
            txHash: "" //Update in frontend after transaction
        }));

        emit WithdrawMoney(_to, _amount);
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }
    
    function getTransfer() public view returns(Record[] memory){
        uint recordCount = records.length;
        Record[] memory result = new Record[](recordCount);

        for(uint i=0; i<recordCount; i++){
            result[i] = records[i];
        }
        return result;
    }
}