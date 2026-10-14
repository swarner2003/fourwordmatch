import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton.jsx'
import { useState, useEffect} from "react";
import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } from 'obscenity';
import axios from "axios";
import { useParams } from "react-router-dom";

function EditGame(){
    const {user, isAuthenticated, isLoading, loginWithRedirect} = useAuth0();
    const [data, setData] = useState(null);
    const [showBadWordFilter, setShowBadWordFilter] = useState(false);
    const { gameID } = useParams();

    const apiURL = import.meta.env.VITE_API_URL;

    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
    });

    const fetchAPI = async (gID) => {
        try{
            const targetID = gID;
            const response = await axios.get(`${apiURL}four_word_match_table_information/${targetID}`);
            console.log(response);
            setData(response.data);
        } catch (error) {
            console.error("Error Fetching Data:", error);
        }
    };

    useEffect(() => {
        fetchAPI(gameID);
    }, [gameID]);

    if (!isAuthenticated) {
        return (
            <h1 className="flex justify-center items-center text-4xl">Please login to access Connections Creator</h1>
        )
    };

    if (isLoading) {
        return (
            <h1 className="flex justify-center items-center text-2xl">Loading Game Creator</h1>
        )
    };

    if (!data) {
        return <h1 className="flex justify-center items-center text-3xl">Error: Game not found</h1>
    };

    if (data && data.AuthTokenID != user.sub) {
        return <h1 className="flex justify-center items-center text-3xl">Error: You do not own this game</h1>
    };

    const sendJson = async (event) => {
        event.preventDefault();
        setShowBadWordFilter(false);

        const formData = new FormData(event.currentTarget);

        const formObj = Object.fromEntries(formData.entries());

        formObj.AuthToken = user.sub
        formObj.tableID = gameID

        const sendJson = JSON.stringify(formObj);

        if (await checkTextForProfanity(sendJson)) {
            setShowBadWordFilter(true);
            return;
        }

        try {
            const response = await axios.post(`${apiURL}four_word_match_table_alter`, formObj)

            if (response.data) {
                window.location.href = `/${gameID}`
            }

            console.log("Success: ", response.data)
        } catch (error) {

            if (error.response) {
              console.error(`Backend returned code ${error.response.status}:`, error.response.data);
            } else {
              console.error("Error setting up request:", error.message);
            }

        }
    };

    const checkTextForProfanity = async (jsonInfo) => {
        const jsonParseObj = JSON.parse(jsonInfo);
        const checkValues = Object.values(jsonParseObj);

        for (let i = 0; i < checkValues.length; i++) {
            let checkString = checkValues[i];

            if (matcher.hasMatch(checkString)) {
                return true;
            }
        }

        return false;
    };

    const showProfanityText = async () => {
        setShowBadWordFilter(true);
    };

    return (
        isAuthenticated && (
            <div>
                <h1 className="flex justify-center items-center text-6xl mb-4">Game Creator</h1>

                <form onSubmit={sendJson}>
                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/2 mx-auto">
                            <input type="text" name="tableTitle" defaultValue={`${data.TableName}`} className='bg-white rounded-lg w-[calc(102%-1rem)] border-2 border-black h-10 p-0.5' required />
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/2 mx-auto bg-straightforward rounded-lg">
                            <input type="text" name="sCat" defaultValue={`${data.table_info.straightforward[0]}`} className='bg-white rounded-lg w-[calc(98%-1rem)] m-2 p-0.5' required />
                            <input type="text" name="s1" defaultValue={`${data.table_info.straightforward[1]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="s2" defaultValue={`${data.table_info.straightforward[2]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="s3" defaultValue={`${data.table_info.straightforward[3]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="s4" defaultValue={`${data.table_info.straightforward[4]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required />
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/2 mx-auto bg-medium rounded-lg">
                            <input type="text" name="mCat" defaultValue={`${data.table_info.medium[0]}`} className='bg-white rounded-lg w-[calc(98%-1rem)] m-2 p-0.5' required />
                            <input type="text" name="m1" defaultValue={`${data.table_info.medium[1]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="m2" defaultValue={`${data.table_info.medium[2]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="m3" defaultValue={`${data.table_info.medium[3]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="m4" defaultValue={`${data.table_info.medium[4]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required />
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/2 mx-auto bg-hard rounded-lg">
                            <input type="text" name="hCat" defaultValue={`${data.table_info.hard[0]}`} className='bg-white rounded-lg w-[calc(98%-1rem)] m-2 p-0.5' required />
                            <input type="text" name="h1" defaultValue={`${data.table_info.hard[1]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="h2" defaultValue={`${data.table_info.hard[2]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="h3" defaultValue={`${data.table_info.hard[3]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="h4" defaultValue={`${data.table_info.hard[4]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required />
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/2 mx-auto bg-trick rounded-lg">
                            <input type="text" name="tCat" defaultValue={`${data.table_info.trick[0]}`} className='bg-white rounded-lg w-[calc(98%-1rem)] m-2 p-0.5' required />
                            <input type="text" name="t1" defaultValue={`${data.table_info.trick[1]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="t2" defaultValue={`${data.table_info.trick[2]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="t3" defaultValue={`${data.table_info.trick[3]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="t4" defaultValue={`${data.table_info.trick[4]}`} className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required />
                        </div>
                    </div>

                    { showBadWordFilter && <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/4 mx-auto bg-red-400 rounded-lg">
                            <h1>Game not created: Table contains profanity</h1>
                        </div>
                    </div>}

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/4 mx-auto rounded-lg">
                            <button type="submit" className="text-3xl text-black bg-stone-200 rounded-lg p-2">Submit Changes</button>
                        </div>
                    </div>
                </form>

                <h1 className="text-lg text-red-800 bg-red-400 rounded-lg p-2 w-1/2 mb-5 mx-auto flex justify-center items-center text-center">Warning: All created tables are public. It is not recommended to include any sensitive data or personally identifiable information.</h1>

            </div>
        ) 
    )
}

export default EditGame