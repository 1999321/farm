import { ethers } from "ethers";
import { readfs } from "./utils";
import threadStatus from "./global";
import { expose } from "threads/worker";

export function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export async function claim(
    endpoint: string,
    privateKey: string,
    wrapeggfarm: string,
    sumthreads: number,
    overDifficulty: number
) {
    const provider = new ethers.JsonRpcProvider(endpoint)
    const wallet = new ethers.Wallet(privateKey, provider)

    const ABI = [
        "function mine(bytes[] memory datas)",
        "function getEggFarm() external view returns(address)",
        "event NewDifficulty(uint256 difficulty)"
    ]

    const eventABI = [
        "event DifficultyAdjusted(uint256 oldDifficulty, uint256 newDifficulty)"
    ]
    
    const contract = new ethers.Contract(wrapeggfarm,ABI,wallet)
    contract.on("NewDifficulty", (difficulty, event) => {
        console.log("new difficulty",difficulty)
        threadStatus.updateDifficulty(difficulty + BigInt(overDifficulty))
    })
    let data = []
    let fetch_length = 50

    // const eggfarm_address = await contract.getEggFarm()
    // const event_contract = new ethers.Contract(eggfarm_address,eventABI,wallet)
    // event_contract.on("DifficultyAdjusted", (oldDifficulty, newDifficulty, event) => {
    //     threadStatus.updateDifficulty(newDifficulty + BigInt(overDifficulty))
    // })

    while(true){
        for(let i=0;i<sumthreads;i++){
            if(fetch_length <= 0){
                break
            }
            let _i = i + 1
            console.log("thread",_i,"fetching...")
            let msgData = readfs(_i,threadStatus.threadIter[i+1],fetch_length)
            if(msgData.length > 0){
                data.push(...msgData)
                threadStatus.incrementThreadIter(_i, msgData.length)
                console.log("thread",_i,"fetch success",msgData.length,threadStatus.threadIter[i+1])
            }
            fetch_length = fetch_length - msgData.length
            
        }
        console.log("data length",data.length)
        if(data.length >= 2){
            console.log("claiming...")
            try{
                const tx = await contract.mine(data, {gasLimit: 10000000})
                await tx.wait()
                data = []
                fetch_length = 50
                console.log("claim tx hash",tx.hash)
            }catch(e){
                console.log("claim error",e)
            }
        }else{
            await delay(2)
            continue
        }
    }
}

expose({
    claim
})