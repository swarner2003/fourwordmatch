import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton.jsx'
import { useState, useEffect} from "react";
import axios from "axios";

function Profile(){
    const {user, isAuthenticated, isLoading} = useAuth0();
    const [data, setData] = useState(null);
    const [fourID, setFourID] = useState(0);
    const [gameDisplayIndex, setGameDisplayIndex] = useState(0);

    const apiURL = import.meta.env.VITE_API_URL;

    const fetchAPI = async (AID, Nick) => {
        try{
            const targetID = AID;
            const targetNickName = Nick;
            const response = await axios.get(`${apiURL}four_word_match_user/${encodeURIComponent(targetID)}/${encodeURIComponent(targetNickName)}`);
            const fid = await axios.get(`${apiURL}get_four_id/${encodeURIComponent(targetID)}`)

            setFourID(fid.data)
            setData(response.data);
        } catch (error) {
            console.error("Error Fetching Data:", error);
        }
    };

    const deleteTable = async (tid) => {
        try {
            const targetID = tid;
            const response = await axios.get(`${apiURL}delete_table/${encodeURIComponent(targetID)}`);
            window.location.reload()
        } catch (error) {
            console.error("Error Fetching Data:", error);
        }
    }

    const nextButton = async () => {
        if ((gameDisplayIndex + 8) < data?.ownedGames?.length) {
            setGameDisplayIndex(prev => prev + 8);
        }
    };

    const prevButton = async () => {
        if ((gameDisplayIndex - 8) < 0) {
            setGameDisplayIndex(0);
        } else {
            setGameDisplayIndex(prev => prev - 8);
        }
    }

    const copyButton = async (copyLink) => {
        try {
            await navigator.clipboard.writeText(copyLink)
        } catch (err) {
            console.error("Copy text error: ", err)
        }
    }

    useEffect(() => {
        if (!isLoading && isAuthenticated && user?.sub && user?.nickname) {
            fetchAPI(user.sub, user.nickname);
        }
    }, [isLoading, isAuthenticated, user?.sub, user?.nickname]);

    if (!isAuthenticated) {
        return (
            <h1 className="flex justify-center items-center text-2xl">Please login to view your profile</h1>
        )
    }

    if (isLoading) {
        return (
            <h1 className="flex justify-center items-center text-2xl">Loading Profile Information</h1>
        )
    }

    return (
        isAuthenticated && (
            <div>
                <div className="flex justify-center items-center ">
                    <h1 className="text-6xl mb-4">Profile</h1>
                    <button className="ml-4 text-sm text-green-800 bg-green-300 rounded-lg p-2" onClick={() => copyButton(`https://fourwordmatch.com/profile/${fourID}`)}>Share Profile</button>
                </div>

                <h1 className="flex justify-center items-center text-3xl mb-4">{user.nickname}</h1>
                <h1 className="flex justify-center items-center text-xl mb-6 underline">Connection Games</h1>

                <div className="flex flex-wrap w-1/2 mx-auto mt-4">
                    {data?.ownedGames?.slice(gameDisplayIndex, gameDisplayIndex+8).map((game, index) =>(
                        <div key={game.TableID ?? index} className='w-[calc(100%)] flex items-center p-2 mb-4 bg-stone-200 rounded-lg ml-auto'>
                            <h1>{index + 1 + gameDisplayIndex}. {game.TableName}</h1>
                            <div className='ml-auto'>
                                <a href={`/${game.TableID}`}>https://fourwordmatch.com/{game.TableID}</a>
                                <button className="ml-4 text-sm text-green-800 bg-green-300 rounded-lg p-2" onClick={() => copyButton(`https://fourwordmatch.com/${game.TableID}`)}>Copy Link</button>
                                <button className="ml-4 text-sm text-red-800 bg-red-300 rounded-lg p-2" onClick={() => deleteTable(game.TableID)}>Delete</button>
                            </div> 
                        </div>
                    ))}
                    <button className="text-3xl text-barSP bg-barBGbg rounded-lg p-2" onClick={() => prevButton()}>Prev</button>
                    <button className="text-3xl text-barSP bg-barBGbg rounded-lg p-2 flex ml-auto" onClick={() => nextButton()}>Next</button>
                </div>


                <div className="flex justify-center items-center pb-10">
                    <LogoutButton />
                </div>
            </div>
        ) 
    )
}

export default Profile