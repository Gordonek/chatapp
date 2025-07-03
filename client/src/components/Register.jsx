import { useState } from "react"
import "../css/Form.css"
export function Register(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [eye, setEye] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost/chatapp/server/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Zarejestrowano pomyślnie!");
                props.setVal(1);
            } else {
                setMessage(data.error || "Coś poszło nie tak");
            }
        } 
        catch (error) {
            setMessage("Błąd sieci");
        }
    };

    return (
        <> 
            <h1>Rejestracja</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nazwa użytkownika.." value={username} onChange={(e) => setUsername(e.target.value)} />
                <div>
                    <input type={eye?"text":"password"} placeholder="Hasło.." value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className="oko" onClick={() => eye?setEye(0):setEye(1)}>Oko</span>
                </div>
                <button type="submit">Zarejestruj</button>
                <div className="warnings">
                    <span className="changeForm" onClick={() => props.setVal(1)}>Zaloguj się</span>
                    <span className="info">
                        {message && <span>{message}</span>}
                    </span>
                </div>
            </form>
        </>
    )
}