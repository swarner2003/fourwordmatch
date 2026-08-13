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
            fetchAPI(user.sub, user?.nickname);
        }
    }, [isLoading, isAuthenticated, user]);

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
                <h1 className="flex justify-center items-center text-2xl">Welcome to profile</h1>
                <h1 className="flex justify-center items-center text-xl">User ID: {user.sub}</h1>
                <h1 className="flex justify-center items-center text-xl">User Name: {user.nickname}</h1>
                <h1 className="flex justify-center items-center text-xl">Data: {data?.ownedGames?.[0]?.TableName ?? "Loading..."}</h1>
                <div className="flex justify-center items-center">
                    <LogoutButton />
                </div>
            </div>
        ) 
    )
}

export default Profile