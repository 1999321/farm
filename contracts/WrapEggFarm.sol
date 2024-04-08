// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

import "hardhat/console.sol";

interface IEggFarm {
    function difficulty() external view returns(uint256);
}

contract WrapEggFarm {

    address private eggFarm;

    uint public successCount;
    uint public failCount;

    event NewDifficulty(uint256 difficulty);

    constructor(address _eggFarm) {
        eggFarm = _eggFarm;
    }

    function getEggFarm() external view returns(address) {
        return eggFarm;
    }

    function mine(bytes[] memory datas) external {
        for(uint i = 0; i < datas.length; i++) {
            (bool success, ) = eggFarm.call(datas[i]);
            if(success) {
                successCount++;
            } else {
                failCount++;
            }
            console.log("Success: %s, Fail: %s", successCount, failCount);
            emit NewDifficulty(IEggFarm(eggFarm).difficulty());
        }
    }
}