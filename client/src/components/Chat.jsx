import '../css/Chat.css';
import { useRef } from 'react';
import defaultavatar from "../assets/default-avatar.png";
import pencil from "../assets/pencil-edit.svg";
import sendicon from "../assets/send-icon.svg"
import Attachmenticon from "../assets/attachment-icon.svg"
import cameraicon from "../assets/camera.svg"
export function Chat(props){
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost/chatapp/server/logout.php",{
                method: "POST",
            });
            const data = await res.json();
            if(data.message=="Wylogowano"){
                localStorage.removeItem("token");
                props.setVal(1);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const fileInputRef = useRef(null);
    const photoInputRef = useRef(null);
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
                    <div className="chat">
                            <div className="message">Jestem jakis takis1</div>
                            <div className="message">Jestem jakis takis2</div>
                            <div className="message">Jestem jakis takis3</div>
                            <div className="message">Jestem jakis takis4</div>
                            <div className="message">Jestem jakis takis5</div>
                    </div>
                    <div className="menu-box">
                        <div className="menu">
                            <div className="typer">
                                <div className="left-side"></div>
                                <form>
                                    <input type="text" placeholder='Napisz coś..' />
                                </form>
                                <div className="right-side">
                                    <form>
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
                            <div className="send">
                                <img src={sendicon} onClick={() => handleSend} alt="send icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-sidebar sidebar">

                </div>
            </div>
        </>
    )
}