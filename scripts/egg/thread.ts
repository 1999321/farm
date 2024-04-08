import { ethers } from "ethers";
import { getMsgData, checkWallet, writefs } from "./utils";
import threadStatus from "./global";

export function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export async function mine(threadIndex:number, recipient: string) {
    let times_ = 0
    while(true){
        times_++
        // if(times_%20000 == 0)
        //     await delay(2)
        const account = ethers.Wallet.createRandom()
        let wallet_check = await checkWallet(account, threadStatus.getTarget())
        if(wallet_check.valid){
            let msgData = await getMsgData(wallet_check.hash, account, recipient)
            writefs(msgData, threadIndex, threadStatus.threadIter[threadIndex])
            threadStatus.resetThreadIter(threadIndex)
        }
    }
}

// test
// const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545')
// const wallet = new ethers.Wallet('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e', provider)

// const ABI = [
//     "function mine(bytes[] memory datas)",
//     "function getEggFarm() external view returns(address)"
// ]

// const eventABI = [
//     "event DifficultyAdjusted(uint256 oldDifficulty, uint256 newDifficulty)"
// ]

// const contract = new ethers.Contract('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',ABI,wallet)
// let data = []
// let fetch_length = 200

// console.log("into claim")

// async function getEvent(){
//     const k = await contract.getEggFarm()
//     return k
// }

// getEvent().then((k)=>console.log(k))