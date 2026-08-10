function Header(){

    return(
        <header>
            <div className="bg-barBG mb-15 flex items-center justify-evenly">
                <img src="./The Fourman.svg" className="size-24"/>
                <h1 className="text-3xl text-barSP bg-barBGbg rounded-lg p-2">Four Connect Game!</h1>
            
                <form action="/" method="GET">
                    <label for="site-search" class="visually-hidden" className="text-3xl text-barSP mr-4 bg-barBGbg rounded-lg p-2">Load Game By ID: </label>
                    <input type="search" id="site-search" name="q" placeholder="ID..." required className="text-3xl text-black bg-white mr-4 p-2 rounded-lg" />
                    <button type="submit" className="text-3xl text-barSP bg-barBGbg rounded-lg p-2">Load</button>
                </form>


                <a href=""><div className="text-3xl text-barSP  bg-barBGbg rounded-lg p-2">Create a Connection</div></a>
                <a href=""><div className="text-3xl text-barSP  bg-barBGbg rounded-lg p-2">Login</div></a>
            </div>
        </header>
    );
}

export default Header