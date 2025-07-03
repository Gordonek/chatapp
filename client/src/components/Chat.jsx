import '../css/Chat.css';
import defaultavatar from "../assets/default-avatar.png";
import pencil from "../assets/pencil-edit.svg";
export function Chat(props){
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost/chat-api/logout.php",{
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
                </div>
                <div className="conversation">

                </div>
                <div className="right-sidebar sidebar">

                </div>
            </div>
            {/* <form onSubmit={handleSubmit}>
                <button type="submit">Wyloguj</button>
            </form> */}
        </>
    )
}