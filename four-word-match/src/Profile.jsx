import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton.jsx'
import { useState, useEffect} from "react";
import axios from "axios";

function Profile(){
    const {user, isAuthenticated, isLoading} = useAuth0();
    const [data, setData] = useState(null);

    const fetchAPI = async (AID, Nick) => {
        try{
            const targetID = AID;
            const targetNickName = Nick;
            const response = await axios.get(`http://localhost:8080/four_word_match_user/${encodeURIComponent(targetID)}/${encodeURIComponent(targetNickName)}`);

            setData(response.data);
        } catch (error) {
            console.error("Error Fetching Data:", error);
        }
    };

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
                <h1 className="flex justify-center items-center text-6xl mb-4">Profile</h1>
                <h1 className="flex justify-center items-center text-3xl mb-4">{user.nickname}</h1>
                <h1 className="flex justify-center items-center text-xl mb-6 underline">Most Recently Made Connections</h1>

                <div className="flex flex-wrap w-150 mx-auto mt-4">
                    {data?.ownedGames?.slice(0, 10).map((game, index) =>(
                        <div key={game.TableID ?? index} className='w-150 flex items-center p-2 mb-4 bg-stone-200 rounded-lg ml-auto'>
                            <h1>{index + 1}. {game.TableName}</h1>
                            <a className='ml-auto' href={`/${game.TableID}`}>http://localhost:5173/{game.TableID}</a>
                        </div>
                    ))}
                </div>


                <div className="flex justify-center items-center">
                    <LogoutButton />
                </div>
            </div>
        ) 
    )
}

export default Profile