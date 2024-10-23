// server.js  

const express = require('express');  
const http = require('http');  
const socketIo = require('socket.io');  
const path = require("path")
const app = express();  
const server = http.createServer(app);  
const io = socketIo(server);  

const games = {};
app.use(express.static(path.join(__dirname,"./public")))
app.use(express.static('public'));  
let players = [];
io.on("connection", (socket)=>{
    let name;
    socket.on("ujoin",(data)=>{
        if (data.p1_name == data.p2_name) {socket.emit("err")}
        if(!players.includes(data.p1_name)){ players.push(data.p1_name); console.log(data) }
        if(players.includes(data.p2_name)){
                let ps = 'O';
                socket.emit("playas",{ps,data})
                socket.emit("connected-2-p")
                return; 
        } else { 
            ps = 'X' 
            socket.emit("playas",{ps,data})
            socket.emit("connected-2-p")
        }

        
    })
    socket.on("move",(data)=>{
        console.log(data)
        socket.broadcast.emit("rec",data)
    })
    socket.on('win',(data)=>{
        console.log(players)
        const p1 = players.indexOf(data.p1_name);
        const p2 = players.indexOf(data.p2_name);
        if (p1 != -1){
            players.splice(p1);
        }
        if (p2 != -1){
            players.splice(p2);
        }
    })
})  

const PORT = process.env.PORT || 4000;  
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));