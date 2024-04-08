import { ethers } from "hardhat";
import { ethers as OK} from "ethers";
async function main() {
    const [singer] = await ethers.getSigners();
    const eggFarm = await ethers.getContractFactory("EggFarm");
    const eggFarmContract = await eggFarm.deploy(singer.address);

    const wrapeggfarm = await ethers.getContractFactory("WrapEggFarm");
    const wrapeggfarmContract = await wrapeggfarm.deploy(eggFarmContract.target);

    console.log("EggFarm deployed to:", eggFarmContract.target);
    console.log("WrapEggFarm deployed to:", wrapeggfarmContract.target);

    // const random = OK.Wallet.createRandom()

    // const account = OK.Wallet.createRandom()
    // const sd = OK.keccak256(OK.solidityPacked(["address"],[account.address]))
    // const test =  OK.solidityPacked(
    //             ["bytes32"],
    //             [OK.keccak256(OK.solidityPacked(["address"],[account.address]))]
    //             )
    // const testBytes = OK.getBytes(test)
    // const testHash = OK.hashMessage(testBytes)

    // const si = await account.signMessage(testBytes)
    
    // const recoverAddress = OK.verifyMessage(testBytes,si)
    // console.log(OK.keccak256(OK.solidityPacked(["address"],[account.address])))
    // console.log("singer address             ",account.address)
    // console.log("recover address from ethers",recoverAddress)
    // console.log(si)
    // console.log("recover address from contract",await eggFarmContract.recoverSigner(si,account.address))
    // console.log(si.slice(0,66),'0x'+ si.slice(66,130),'0x'+ si.slice(130,132))
    // console.log(
    //     "testEcrecover",
    //     await eggFarmContract.testEcrecover(testHash,si.slice(0,66),'0x'+ si.slice(66,130),'0x'+ si.slice(130,132))
    // )
    // console.log(
    //     "",
    //     await eggFarmContract._splitSignature(si)
    // )

    // let ABI = [
    //     "function mine(bytes memory signature, address nonce, address recipient)",
    //     "function getEggFarm() external view returns(address)"
    // ]

    // let iface = new OK.Interface(ABI)
    // let data = iface.encodeFunctionData("mine", [si,account.address,account.address])
    // let wrapContract = new OK.Contract(wrapeggfarmContract.target,ABI,singer)
    // console.log("eggfarm address:",await wrapContract.getEggFarm())

    // let ABI2 = [
    //     "event DifficultyAdjusted(uint256 oldDifficulty, uint256 newDifficulty)"
    // ]

    // //0x10c6f7a0b5ed8d36b4c7f34938583621fafc8b0079a2834d26fa3fcc9ea9

    // let contract = new OK.Contract(eggFarmContract.target,ABI2,singer)
    // contract.on("DifficultyAdjusted", (oldDifficulty, newDifficulty, event) => {
    //     console.log("DifficultyAdjusted", newDifficulty + BigInt(1))
    //     console.log("oldDifficulty",oldDifficulty.toString())
    //     console.log("newDifficulty",newDifficulty.toString())
    // })
    // // eggFarmContract.on("DifficultyAdjusted", (oldDifficulty, newDifficulty, event) => {
    // //     console.log("DifficultyAdjusted")
    // //     console.log("oldDifficulty",oldDifficulty.toString())
    // //     console.log("newDifficulty",newDifficulty.toString())
    // // })

    // await wrapeggfarmContract.mine([data])

    // const account = OK.Wallet.createRandom()
    // console.log(account)
    // const hash = OK.keccak256(
    //     OK.solidityPacked(
    //         ["string", "bytes32"],
    //         ["\x19Ethereum Signed Message:\n32", OK.keccak256(account.address)]
    //         )
    //     )
    // console.log(OK.keccak256(account.address))
    // console.log(hash)
    // // const abicoder = OK.AbiCoder.defaultAbiCoder()
    // const sk = await account.signingKey.sign(hash)
    // console.log(sk.r.concat(sk.s.slice(2)).concat(sk.v.toString()))
    // console.log(await eggFarmContract.recoverSigner(sk.r.concat(sk.s.slice(2)).concat(sk.v.toString()),account.address))
    // const account2 = new OK.Wallet("e17b5a30decf63312c8a5aa486c09bd699005ad7b3cb9d87105a6f935ba9b97b")
    // console.log(account2)
    // const hash2 = OK.keccak256(
    //     OK.solidityPacked(
    //         ["string", "bytes32"],
    //         ["\x19Ethereum Signed Message:\n32", OK.keccak256(account2.address)]
    //         )
    //     )
    // console.log(OK.keccak256(account2.address))
    // console.log(hash2)
    // const sk2 = await account.signMessage(OK.solidityPacked(
    //     ["string", "bytes32"],
    //     ["\x19Ethereum Signed Message:\n32", OK.keccak256(account2.address)]
    //     ))
    // console.log(await eggFarmContract._splitSignature(sk2))
    // console.log(await eggFarmContract.recoverSigner(sk2,account2.address))
    // console.log(OK.verifyMessage(OK.solidityPacked(
    //     ["string", "bytes32"],
    //     ["\x19Ethereum Signed Message:\n32", OK.keccak256(account2.address)]
    //     ),sk2))
}
main()