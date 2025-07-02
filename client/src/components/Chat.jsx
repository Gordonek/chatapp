export function Chat(props){
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost/chat-api/logout.php",{
                method: "POST",
            });
            const data = await res.json();
            if(data.message=="Wylogowano"){
                props.setVal(1);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <h1>Konwersacja</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">Wyloguj</button>
            </form>
        </>
    )
}