const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./router');
const moment = require('moment')

const app = express();
const server = http.createServer(app);
const PORT = 5000 || process.env.PORT;

const {getUser, getRoomUsers, addUser, removeUser} = require('./users');

const io = socketio(server);

io.on('connection', socket => {
    console.log("have new connection");
    socket.on('newUser', ({username, room}) =>{

        const {error, user} = addUser({id: socket.id, name: username, room})
        if(error){
            console.log('error')
            return;
        }
        socket.broadcast.to(user.room).emit('message', {user: 'server', text: `${user.name} has joined`, time: moment().format('h:mm a')});
        socket.join(user.room);

    })

    socket.on('sendMessage', ({message, time}, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message, time});

        callback()
    })

    socket.on('disconnect', () => {
        console.log("user left");
        const user = removeUser(socket.id)
        io.to(user.room).emit('message', {user: 'server', text: `${user.name} has left`, time: moment().format('h:mm a')})
    })
})

app.use(router);

server.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));
