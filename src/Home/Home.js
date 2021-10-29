import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div>
            <div>
                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
                <select name="room" onChange={(e) => setRoom(e.target.value)}>
                    <option>Choose a room</option>
                    <option value="Room1">Room1</option>
                    <option value="Room2">Room2</option>
                    <option value="Room3">Room3</option>
                </select>
                <Link onClick={e => (!username || !room)?e.preventDefault():null} to={`/chat?username=${username}&room=${room}`}>
                    <button type="submit">Sign in</button>
                </Link>
                
            </div>
        </div>
    )
}

export default Home;