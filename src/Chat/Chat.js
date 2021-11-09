import React, { useEffect, useState} from "react";
import './Chat.css';
import io from 'socket.io-client';
import QueryString from "query-string";
import Messages from "../Messages/Messages";

let socket;
const moment = require('moment')
const Chat = ({location}) =>{
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const {username, room} = QueryString.parse(location.search);
        console.log(username);
        console.log(room);

        socket = io(ENDPOINT);
        setUsername(username);
        setRoom(room);
        console.log(socket);
        socket.emit('newUser', {username, room});

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages]);

    const sendMessage = e => {
        e.preventDefault();

        if(message){
            let time = moment().format('h:mm a')
            socket.emit('sendMessage', {message, time}, () => setMessage(''));
        }
    }
    console.log(messages)
    return (
        <div className="App">
        <header className="App-header">
            <div className="chatbox">
            <div className="chatbox-users">
                <h4>room name</h4>
                <p>{room}</p>
                <h4>users online</h4>
                <ul>
                <li>shun lung</li>
                <li>NoraBobo</li>
                </ul>
            </div>
            <div className="chatbox-box">
                <Messages messages={messages} name={username}/>
            </div>
            <div className="chatbox-input">
                <input 
                type="text" placeholder="Type a message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                />
                <button type="submit">send</button>
            </div>
            </div>
        </header>
        </div>
    )
}

export default Chat;
