import { program } from "commander"
import { delay, mine } from "./thread"
import threadStatus from "./global"
import * as os from "os"
import { spawn, Worker } from "threads"
import { claim, listener } from "./auth"
// import Koa from "koa"//而不是import * as Koa from 'koa'
// import { createServer } from "http";
// import { Server } from "socket.io";
// import { readfs } from "./utils"

// const app = new Koa();
// const httpServer = createServer(app.callback());

// const io = new Server(httpServer, { 
//   cors:{
//     origin:'http://localhost:3000'
//   }
// });

console.log("cpu threads",os.cpus().length)

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('difficulty', (newDiff:string) => {
//     console.log("new difficulty",newDiff)
//     threadStatus.updateDifficulty(BigInt(newDiff))
//   })
//   socket.on('file', ()=>{
//     let data = []
//     for(let i=0;i<os.cpus().length - 1;i++){
//         let _i = i + 1
//         let msgData = readfs(_i,threadStatus.threadIter[i+1],200)
//         if(msgData.length > 0){
//             data.push(...msgData)
//             threadStatus.incrementThreadIter(_i, msgData.length)
//         }
//     }
//     socket.emit('Ask',data)
//   })
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// httpServer.listen(3000);

async function main() {
    const params = program
                    .version("1.0.0")
                    .requiredOption("-k, --privatekey <string>", "fee payer address's private key")
                    .requiredOption("-r, --recipient <string>", "egg recipient address")
                    .requiredOption("-e, --endpoint <string>", "base network endpoint ")
                    .requiredOption("-c, --choose <number>", "script choose")
                    .requiredOption("-o, --overdifficulty <number>", "difficulty", "0")
                    .requiredOption("-w, --wrap <string>", "wrap egg farm contract address", "0x0")
                    //.requiredOption("-d, --difficulty <number>", "difficulty", "10000")
                    .parse(process.argv)
                    .opts();
    
    const privateKey = String(params.privatekey)
    const recipient = String(params.recipient)
    const endpoint = String(params.endpoint)
    // const sumthreads = Number(params.thread)
    const overDifficulty = Number(params.overdifficulty)
    const wrapeggfarm = String(params.wrap)
    //const difficulty = Number(params.difficulty)
    const choose = Number(params.choose)

    if(choose == 1){
      for(let i=0;i<os.cpus().length - 2;i++){
        console.log("thread",i+1,"mining...")
        threadStatus.addThread(i+1)
      }
      await claim(endpoint, privateKey, wrapeggfarm, os.cpus().length - 2)
    }else if(choose == 2){
      await listener(endpoint, privateKey, wrapeggfarm, overDifficulty)
    }else{
      for(let i=0;i<os.cpus().length - 2;i++){
        console.log("thread",i+1,"mining...")
        threadStatus.addThread(i+1)
        mine(i+1, recipient)
      }
    }

}

main()