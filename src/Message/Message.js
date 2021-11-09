import React from "react";
import './Message.css';

const Message = ({message: {user, text, time}, name}) => {
    let isYour = false;

    if(user === name){
        isYour = true;
    }
    return(
        isYour
        ?(
            <div className="chatbox-box-message your">
                <span>{time}</span><p>{user}</p>
                <div className="chatbox-box-message-body your">
                    {text}
                </div>
            </div>
        )
        :(
            <div className="chatbox-box-message others">
                <p>{user}</p><span>{time}</span>
                <div className="chatbox-box-message-body others">
                    {text} 
                </div>
            </div>
        )
    )
}

export default Message