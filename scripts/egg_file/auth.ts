import { ethers } from "ethers";
import { readfs, writeBackup, writeDiff } from "./utils";
import threadStatus from "./global";

export function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export async function claim(
    endpoint: string,
    privateKey: string,
    wrapeggfarm: string,
    sumthreads: number
) {
    const provider = new ethers.JsonRpcProvider(endpoint)
    const wallet = new ethers.Wallet(privateKey, provider)

    const ABI = [
        "function mine(bytes[] memory datas)",
        "function getEggFarm() external view returns(address)",
        "event NewDifficulty(uint256 difficulty)"
    ]
    
    const contract = new ethers.Contract(wrapeggfarm,ABI,wallet)
    // contract.on("NewDifficulty", (difficulty, event) => {
    //     console.log("new difficulty",difficulty)
    //     writeDiff(difficulty + overDifficulty)
    // })
    let data = []
    let fetch_length = 50
    let trytimes = 0

    while(true){
        for(let i=0;i<sumthreads;i++){
            if(fetch_length <= 0){
                break
            }
            let _i = i + 1
            let msgData = readfs(_i,threadStatus.threadIter[i+1],fetch_length)
            if(msgData.length > 0){
                data.push(...msgData)
                threadStatus.incrementThreadIter(_i, msgData.length)
                fetch_length = fetch_length - msgData.length
            }
            
        }
        console.log("data length",data.length)
        if(data.length >= 1){
            console.log("claiming...")
            try{
                trytimes++
                if(trytimes >= 5){
                    trytimes = 0
                    writeBackup(data)
                    data = []
                    fetch_length = 50
                    console.log("claiming failed, retrying...")
                    continue
                }
                const tx = await contract.mine(data, {gasLimit: 10000000})
                await tx.wait()
                data = []
                fetch_length = 50
                console.log("claim tx hash",tx.hash)
            }catch(e){
                console.log("claim error",e)
            }
        }else{
            await delay(10000)
            continue
        }
    }
}

export async function listener(
    endpoint: string,
    privateKey: string,
    wrapeggfarm: string,
    overDifficulty: number
) {
    const provider = new ethers.JsonRpcProvider(endpoint)
    const wallet = new ethers.Wallet(privateKey, provider)

    const ABI = [
        "function mine(bytes[] memory datas)",
        "function getEggFarm() external view returns(address)",
        "event NewDifficulty(uint256 difficulty)"
    ]
    
    const contract = new ethers.Contract(wrapeggfarm,ABI,wallet)
    console.log("listener started")
    contract.on("NewDifficulty", (difficulty, event) => {
        console.log("new difficulty",difficulty)
        writeDiff(Number(difficulty) + overDifficulty)
    })
}