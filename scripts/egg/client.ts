import { io } from "socket.io-client";

//const socket = io('localhost:3001')
const socket = io('http://127.0.0.1:3000')
socket.on('connect',() => {
    console.log("connect success:",socket)
    socket.emit("file")
    socket.emit('difficulty','10000')
    socket.on('Ask',(data)=>{
        console.log("data",data)
    })
})

socket.on('disconnect',()=>{
    socket.off('Ask')
})