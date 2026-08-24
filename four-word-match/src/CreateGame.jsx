import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton.jsx'
import { useState, useEffect} from "react";
import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } from 'obscenity';
import axios from "axios";

function CreateGame(){
    const {user, isAuthenticated, isLoading, loginWithRedirect} = useAuth0();
    const [data, setData] = useState(null);
    const [showBadWordFilter, setShowBadWordFilter] = useState(false);

    const apiURL = import.meta.env.VITE_API_URL;

    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
    });
    

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

    const sendJson = async (event) => {
        event.preventDefault();
        setShowBadWordFilter(false);

        const formData = new FormData(event.currentTarget);

        const formObj = Object.fromEntries(formData.entries());

        formObj.NickName = user.nickname
        formObj.AuthToken = user.sub

        const sendJson = JSON.stringify(formObj);

        if (await checkTextForProfanity(sendJson)) {
            setShowBadWordFilter(true);
            return;
        }

        try {
            const response = await axios.post(`${apiURL}four_word_match_table_create`, formObj)

            if (response.data) {
                window.location.href = `/${response.data}`
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
                            <input type="text" name="tableTitle" placeholder="Connection Game Title" className='bg-white rounded-lg w-[calc(102%-1rem)] border-2 border-black h-10 p-0.5' required />
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/2 mx-auto bg-straightforward rounded-lg">
                            <input type="text" name="sCat" placeholder="Straightforward Category Title" className='bg-white rounded-lg w-[calc(98%-1rem)] m-2 p-0.5' required />
                            <input type="text" name="s1" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="s2" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="s3" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="s4" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required />
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/2 mx-auto bg-medium rounded-lg">
                            <input type="text" name="mCat" placeholder='Medium Category Title' className='bg-white rounded-lg w-[calc(98%-1rem)] m-2 p-0.5' required />
                            <input type="text" name="m1" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="m2" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="m3" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="m4" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required />
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/2 mx-auto bg-hard rounded-lg">
                            <input type="text" name="hCat" placeholder='Hard Category Title' className='bg-white rounded-lg w-[calc(98%-1rem)] m-2 p-0.5' required />
                            <input type="text" name="h1" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="h2" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="h3" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="h4" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required />
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/2 mx-auto bg-trick rounded-lg">
                            <input type="text" name="tCat" placeholder='Tricky Category Title' className='bg-white rounded-lg w-[calc(98%-1rem)] m-2 p-0.5' required />
                            <input type="text" name="t1" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="t2" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="t3" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required /><strong>,</strong>
                            <input type="text" name="t4" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] m-2 p-0.5' required />
                        </div>
                    </div>

                    { showBadWordFilter && <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/4 mx-auto bg-red-400 rounded-lg">
                            <h1>Game not created: Table contains profanity</h1>
                        </div>
                    </div>}

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-1/4 mx-auto rounded-lg">
                            <button type="submit" className="text-3xl text-black bg-stone-200 rounded-lg p-2">Create Game</button>
                        </div>
                    </div>
                </form>

                <h1 className="text-lg text-red-800 bg-red-400 rounded-lg p-2 w-1/2 mb-5 mx-auto flex justify-center items-center text-center">Warning: All created tables are public. It is not recommended to include any sensitive data or personally identifiable information.</h1>

            </div>
        ) 
    )
}

export default CreateGame