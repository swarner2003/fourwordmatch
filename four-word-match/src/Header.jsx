import { useState } from "react";

function Header(){

    const [userInput, setUserInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userInput) return;

        const targetURL = `/${encodeURIComponent(userInput)}`;

        window.location.href = targetURL;
    };
    
    return(
        <header>
            <div className="bg-barBG mb-15 flex items-center justify-evenly">
                <img src="./The Fourman.svg" className="size-24"/>
                <h1 className="text-3xl text-barSP bg-barBGbg rounded-lg p-2">Four Connect Game!</h1>
            
                <form onSubmit={handleSubmit}>
                    <input type="text" id="gameID" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="ID..." className="text-3xl text-black bg-white mr-4 p-2 rounded-lg" />
                    <button type="submit" className="text-3xl text-barSP bg-barBGbg rounded-lg p-2">Load</button>
                </form>


                <a href=""><div className="text-3xl text-barSP  bg-barBGbg rounded-lg p-2">Create a Connection</div></a>
                <a href=""><div className="text-3xl text-barSP  bg-barBGbg rounded-lg p-2">Login</div></a>
            </div>
            
        </header>
    );

    
}

export default Header