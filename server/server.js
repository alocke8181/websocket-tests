"use strict";

const app = require('./app');
const { PORT } = require('./config');
const {createServer} = require('http');
const {Server} = require('socket.io');

const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: 'http://localhost:3000'
    }
})

// app.listen(PORT, function (){
//     console.log(`Started on http://localhost:${PORT}`);
// })

app.get('/',(req,res,next)=>{
    res.send({message:'hello world'});
})

io.on('connect', (socket)=>{
    console.log('client connected');
    socket.emit('connected',{message: 'hello world!'});
});

io.on('disconnect',(socket)=>{
    console.log('client disconnected');
})

httpServer.listen(3001);