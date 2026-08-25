import axios from "axios";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const apiURL = import.meta.env.VITE_API_URL;

function ForeignProfile(){
    const [data, setData] = useState(null);
    const { profileID } = useParams();
    const [gameDisplayIndex, setGameDisplayIndex] = useState(0);

    const fetchAPI = async (pID) => {
        try{
            const targetID = pID;

            const response = await axios.get(`${apiURL}four_word_match_user_info/${targetID}`);

            setData(response.data);
        } catch (error) {
            console.error("Error Fetching Data:", error);
        }
    };

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
        fetchAPI(profileID);
    }, [profileID]);

    return (
        <div>
            <div className="flex justify-center items-center ">
                <h1 className="text-6xl mb-4">Profile</h1>
                <button className="ml-4 text-sm text-green-800 bg-green-300 rounded-lg p-2" onClick={() => copyButton(`https://fourwordmatch.com/profile/${profileID}`)}>Share Profile</button>
            </div>
            
            <h1 className="flex justify-center items-center text-3xl mb-4">{data?.profile?.Nickname ?? "Error loading profile name"}</h1>
            <h1 className="flex justify-center items-center text-xl mb-6 underline">Most Recently Made Connections</h1>

            <div className="flex flex-wrap w-1/2 mx-auto mt-4">
                {data?.ownedGames?.slice(gameDisplayIndex, gameDisplayIndex + 8).map((game, index) =>(
                    <div key={game.TableID ?? index} className='w-[calc(100%)] flex items-center p-2 mb-4 bg-stone-200 rounded-lg ml-auto'>
                        <h1>{index + 1 + gameDisplayIndex}. {game.TableName}</h1>
                        <div className='ml-auto'>
                            <button className="mr-4 text-sm text-green-800 bg-green-300 rounded-lg p-2" onClick={() => copyButton(`https://fourwordmatch.com/${game.TableID}`)}>Copy Link</button>
                            <a href={`/${game.TableID}`}>https://fourwordmatch.com/{game.TableID}</a>
                        </div>
                    </div>
                ))}

                <button className="text-3xl text-barSP bg-barBGbg rounded-lg p-2" onClick={() => prevButton()}>Prev</button>
                <button className="text-3xl text-barSP bg-barBGbg rounded-lg p-2 flex ml-auto" onClick={() => nextButton()}>Next</button>
            </div>

        </div>
    ) 

}

export default ForeignProfile