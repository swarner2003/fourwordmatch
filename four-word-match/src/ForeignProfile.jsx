import axios from "axios";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function ForeignProfile(){
    const [data, setData] = useState(null);
    const { profileID } = useParams();

    const fetchAPI = async (pID) => {
        try{
            const targetID = pID;

            const response = await axios.get(`http://localhost:8080/four_word_match_user_info/${targetID}`);

            setData(response.data);
        } catch (error) {
            console.error("Error Fetching Data:", error);
        }
    };

    useEffect(() => {
        fetchAPI(profileID);
    }, [profileID]);

    return (
        <div>
            <h1 className="flex justify-center items-center text-6xl mb-4">Profile</h1>
            <h1 className="flex justify-center items-center text-3xl mb-4">{data?.profile?.Nickname ?? "Error loading profile name"}</h1>
            <h1 className="flex justify-center items-center text-xl mb-6 underline">Most Recently Made Connections</h1>

            <div className="flex flex-wrap w-150 mx-auto mt-4">
                {data?.ownedGames?.slice(0, 10).map((game, index) =>(
                    <div key={game.TableID ?? index} className='w-150 flex items-center p-2 mb-4 bg-stone-200 rounded-lg ml-auto'>
                        <h1>{index + 1}. {game.TableName}</h1>
                        <a className='ml-auto' href={`/${game.TableID}`}>http://localhost:5173/{game.TableID}</a>
                    </div>
                ))}
            </div>

        </div>
    ) 

}

export default ForeignProfile