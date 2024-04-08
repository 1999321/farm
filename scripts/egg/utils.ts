import {ethers} from 'ethers'
import * as fs from 'fs'
import * as path from 'path'

export async function getMsgData(hash:string, account: ethers.HDNodeWallet, recipient: string): Promise<string> {
    const _datastring =  ethers.solidityPacked(
        ["bytes32"],
        [hash]
    )
    const _bytes = ethers.getBytes(_datastring)

    const si = await account.signMessage(_bytes)
    const iface = new ethers.Interface([
        "function mine(bytes memory signature, address nonce, address recipient)"
    ])
    return iface.encodeFunctionData("mine", [si, account.address, recipient])
}

interface WalletCheck {
    valid: boolean,
    hash: string,
}
export async function checkWallet(account: ethers.HDNodeWallet, target: bigint): Promise<WalletCheck> {
    const hash = ethers.keccak256(account.address)
    const hashnum = BigInt(hash)
    return {
        valid: true,//hashnum < target,
        hash
    }
}


export function writefs(newData:string,threadIndex:number,iter:number){
    try{
        const file_path = path.join(__dirname,'./mine/'+threadIndex+'.json')
        let file_exist = fs.existsSync(file_path)
        if(!file_exist)
            fs.writeFileSync(file_path, "[]")
        
        let data = fs.readFileSync(file_path, 'utf8')
        let obj = JSON.parse(data)
        obj = obj.slice(iter)
        obj.push(newData)
        fs.writeFileSync(file_path, JSON.stringify(obj))
    }catch(e){
        console.log("writefs error",e)
    }
    // fs.readFile(path.join(__dirname,'./mine/'+threadIndex+'.json'), 'utf8', function readFileCallback(err, data){
    //     if (err){
    //         console.log(err);
    //         try{
    //             var obj = JSON.parse("{}");
    //             obj = [newData];
    //             var json = JSON.stringify(obj); //convert it back to json
    //             fs.writeFile(path.join(__dirname,'./mine/'+threadIndex+'.json'), json, 'utf8', ()=>{}); // write it back
    //             console.log("writefs success init")
    //         }catch(e){
    //             console.log("writefs error",e)
    //         }
    //     } else {
    //         try {
    //             var obj = JSON.parse(data); //now it an object
    //             var obj = obj.slice(iter)
    //             obj.push(newData); //add some data
    //             var json = JSON.stringify(obj); //convert it back to json
    //             fs.writeFile(path.join(__dirname,'./mine/'+threadIndex+'.json'), json, 'utf8', ()=>{}); // write it back 
    //             console.log("writefs success append")
    //         } catch (error) {
    //             console.log("writefs error",error)
    //         }
        
    // }});
    // console.log("writefs end")
}

export function readfs(threadIndex:number, iter:number, len:number): string[]{
        try{
            const file_path = path.join(__dirname,'./mine/'+threadIndex+'.json')
            let file_exist = fs.existsSync(file_path)
            console.log("file_exist",file_exist)
            if(!file_exist){
                return []
            }
            const data = fs.readFileSync(file_path, 'utf8')
            const obj = JSON.parse(data)
            const allLen = obj.length
            console.log("allLen",allLen,iter,len)
            return obj.slice(iter,iter+len > allLen ? allLen : iter+len)
        }catch(e){
            console.log("readfs error",e)
            return []
        }
        // fs.readFile(path.join(__dirname,'./mine/'+threadIndex+'.json'), 'utf8', function readFileCallback(err, data){
        //     if (err){
        //         console.log(err);
        //         resolve([])
        //     } else {
        //         try {
        //             var obj = JSON.parse(data); //now it an object
        //             var allLen = obj.length
        //             resolve(obj.slice(iter,iter+len > allLen ? allLen : iter+len))
        //         } catch (error) {
        //             console.log("readfs error",error)
        //             resolve([])
        //         }
        //     }
        // });
}

// writefs("test",1,0)