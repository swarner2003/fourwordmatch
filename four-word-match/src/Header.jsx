import { useState } from "react";
import LoginButton from "./LoginButton";
import ProfileButton from "./ProfileButton";

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
                <a href="/"><img src="./The Fourman.svg" className="size-24"/></a>
                <a href="/"><h1 className="text-3xl text-barSP bg-barBGbg rounded-lg p-2">Four Connect Game!</h1></a>
            
                <form onSubmit={handleSubmit}>
                    <input type="text" id="gameID" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="ID..." className="text-3xl text-black bg-white mr-4 p-2 rounded-lg" />
                    <button type="submit" className="text-3xl text-barSP bg-barBGbg rounded-lg p-2">Load</button>
                </form>


                <a href=""><div className="text-3xl text-barSP  bg-barBGbg rounded-lg p-2">Create a Connection</div></a>
                <LoginButton />
                <ProfileButton />
            </div>
            
        </header>
    );

    
}

export default Header