import '../css/Chat.css';
import { use, useEffect, useRef, useState } from 'react';
import defaultavatar from "../assets/default-avatar.png";
import pencil from "../assets/pencil-edit.svg";
import sendicon from "../assets/send-icon.svg"
import Attachmenticon from "../assets/attachment-icon.svg"
import cameraicon from "../assets/camera.svg"
import chaticon from "../assets/chat-icon.svg"
import videocallicon from "../assets/videocall-icon.svg"
export function Chat(props){
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [temp, setTemp] = useState(0);
    const fileInputRef = useRef(null);
    const photoInputRef = useRef(null);
    const formRef = useRef(null);
    const msgEndRef = useRef(null);
    const handleButtonSubmit = (e) => {
        if(text === "") return;
        sendMessage();
        temp?setTemp(0):setTemp(1);
        msgEndRef.current.scrollTop = msgEndRef.current.scrollHeight;
    }
    useEffect(() => {
        msgEndRef.current.scrollTop = msgEndRef.current.scrollHeight;
    },[messages])
    const checkScrollHeight = () => {
        if(msgEndRef.current.scrollTop > msgEndRef.current.height){
            console.log("good work baby")
        }
    }
    const sendMessage = async (e) => {
        await fetch("http://localhost/chatapp/server/sendMessage.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user_id: props.user,content: text}),
        })
        setText("");
    }
    const getMessage = async (e) => {
        const res = await fetch("http://localhost/chatapp/server/getMessage.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json();
        let updatedMessages = [...data];
        for(let i=1;i<updatedMessages.length;i++){
            if(updatedMessages[i].sender_id == updatedMessages[i - 1].sender_id){
                updatedMessages[i] = { ...updatedMessages[i], grouped:"grouped"};
            }
            if(updatedMessages[i].sender_id == props.user){
                updatedMessages[i] = {...updatedMessages[i], mymessage:"mymessage"};
            }
        }
        setMessages(updatedMessages);
    }
    useEffect(() => {
        getMessage();
        // const interval = setInterval(getMessage, 5000);
        // return () => clearInterval(interval)
    }, [temp]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost/chatapp/server/logout.php",{
                method: "POST",
            });
            const data = await res.json();
            if(data.message=="Wylogowano"){
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                props.setVal(1);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div className="container">
                <div className="left-sidebar sidebar">
                    <div className="main-user">
                        <div className="user-info">
                            <img className="user-avatar" src={defaultavatar} alt="default avatar" />
                            <div className="user-desc">
                                <span className="name">Jakub Pik</span>
                                <span className="note">Jestem z epoki lodowcowej</span>
                            </div>
                        </div>
                        <div className="edit">
                            <img src={pencil} alt="pencil for edit" />
                        </div>
                    </div>
                    <div className="members">
                        <h2>Członkowie</h2>
                        <div className="users-info">
                            <div className="user">
                                <div className="user-info">
                                    <img className="user-avatar" src={defaultavatar} alt="default avatar" />
                                    <div className="user-desc">
                                        <span className="name">Jakub Pik</span>
                                        <span className="note">New member</span>
                                    </div>
                                </div>
                            </div>
                            <div className="user">
                                <div className="user-info">
                                    <img className="user-avatar" src={defaultavatar} alt="default avatar" />
                                    <div className="user-desc">
                                        <span className="name">Jakub Pik</span>
                                        <span className="note">New member</span>
                                    </div>
                                </div>
                            </div>
                            <div className="user">
                                <div className="user-info">
                                    <img className="user-avatar" src={defaultavatar} alt="default avatar" />
                                    <div className="user-desc">
                                        <span className="name">Jakub Pik</span>
                                        <span className="note">New member</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="logout">
                        <form onSubmit={handleSubmit}>
                            <button type="submit">Wyloguj</button>
                        </form>
                    </div>
                </div>
                <div className="conversation">
                    <div className="header">
                        <h2>Czat grupowy</h2>
                    </div>
                    <div className="chat" id="chat" ref={msgEndRef}>
                        {messages.map((msg, i) => (
                            <div key={i} className={(msg.grouped?'message grouped' : 'message') + (msg.mymessage?' mymessage':'')}>
                                {msg.text}
                            </div>
                        ))}        
                    </div>
                    <div className="menu-box">
                        <div className="menu">
                            <div className="typer">
                                <div className="left-side"></div>
                                <form 
                                    onSubmit={(e) =>{
                                        e.preventDefault();
                                        handleButtonSubmit();
                                    }} 
                                    onKeyDown={(e) => {
                                        if(e.key==="Enter")
                                            handleButtonSubmit();
                                    }}
                                >
                                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='Napisz coś..' />
                                </form>
                                <div className="right-side">
                                    <form ref={formRef}>
                                        <input type="file" ref={fileInputRef}/>
                                        <button onClick={() => fileInputRef.current.click()}>
                                            <img src={Attachmenticon} alt="zalacznik" />
                                        </button>
                                        <input type="file" ref={photoInputRef} />
                                        <button onClick={() => photoInputRef.current.click()}>
                                            <img src={cameraicon} alt="zdjecie" style={{width: 35+"px", height: 35+"px"}}/>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="send" onClick={handleButtonSubmit}>
                                <img src={sendicon} alt="send icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-sidebar sidebar">
                    <div className="content">
                        <div className="chat-info">
                            <img src={defaultavatar} alt="group avatar" />
                            <span>Grupa członkowska</span>
                        </div>
                        <div className="buttons">
                            <div className="chat-button button">
                                <div className="img-bg">
                                    <img src={chaticon} alt="ikona czatu" />
                                </div>
                                <span>Chat</span>
                            </div>
                            <div className="videocall-button button">
                                <div className="img-bg">
                                    <img src={videocallicon} alt="ikona czatu wideo" />
                                </div>
                                <span>Video Call</span>
                            </div>
                        </div>
                        <div className="attachments-box">
                            <h3>Attachments</h3>
                            <div className="attachments">
                                <span>View all</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}