import axios from "axios";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function ForeignProfile(){
    const [data, setData] = useState(null);
    const { profileID } = useParams();
    const [gameDisplayIndex, setGameDisplayIndex] = useState(0);

    const fetchAPI = async (pID) => {
        try{
            const targetID = pID;

            const response = await axios.get(`http://localhost:8080/four_word_match_user_info/${targetID}`);

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

    useEffect(() => {
        fetchAPI(profileID);
    }, [profileID]);

    return (
        <div>
            <h1 className="flex justify-center items-center text-6xl mb-4">Profile</h1>
            <h1 className="flex justify-center items-center text-3xl mb-4">{data?.profile?.Nickname ?? "Error loading profile name"}</h1>
            <h1 className="flex justify-center items-center text-xl mb-6 underline">Most Recently Made Connections</h1>

            <div className="flex flex-wrap w-1/2 mx-auto mt-4">
                {data?.ownedGames?.slice(gameDisplayIndex, gameDisplayIndex + 8).map((game, index) =>(
                    <div key={game.TableID ?? index} className='w-[calc(100%)] flex items-center p-2 mb-4 bg-stone-200 rounded-lg ml-auto'>
                        <h1>{index + 1 + gameDisplayIndex}. {game.TableName}</h1>
                        <a className='ml-auto' href={`/${game.TableID}`}>http://localhost:5173/{game.TableID}</a>
                    </div>
                ))}

                <button className="text-3xl text-barSP bg-barBGbg rounded-lg p-2" onClick={() => prevButton()}>Prev</button>
                <button className="text-3xl text-barSP bg-barBGbg rounded-lg p-2 flex ml-auto" onClick={() => nextButton()}>Next</button>
            </div>

        </div>
    ) 

}

export default ForeignProfile