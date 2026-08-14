import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton.jsx'
import { useState, useEffect} from "react";
import axios from "axios";

function CreateGame(){
    const {user, isAuthenticated, isLoading, loginWithRedirect} = useAuth0();
    const [data, setData] = useState(null);

    if (!isAuthenticated) {
        return (
            <h1 className="flex justify-center items-center text-4xl">Please login to access Connections Creator</h1>
        )
    }

    if (isLoading) {
        return (
            <h1 className="flex justify-center items-center text-2xl">Loading Game Creator</h1>
        )
    }

    return (
        isAuthenticated && (
            <div>
                <h1 className="flex justify-center items-center text-6xl mb-4">Game Creator</h1>

                <form>
                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-146 mx-auto">
                            <input type="text" name="tableTitle" placeholder="Connection Game Title" className='bg-white rounded-lg w-[calc(98%-1rem)] border-2 border-black h-10 p-0.5'/>
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-146 h-18 mx-auto bg-straightforward rounded-lg">
                            <input type="text" name="sCat" placeholder="Straightforward Category Title" className='bg-white rounded-lg w-[calc(98%-1rem)] p-0.5'/>
                            <input type="text" name="s1" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="s2" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="s3" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="s4" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/>
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-146 h-18 mx-auto bg-medium rounded-lg">
                            <input type="text" name="mCat" placeholder='Medium Category Title' className='bg-white rounded-lg w-[calc(98%-1rem)] p-0.5'/>
                            <input type="text" name="m1" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="m2" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="m3" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="m4" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/>
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-146 h-18 mx-auto bg-hard rounded-lg">
                            <input type="text" name="hCat" placeholder='Hard Category Title' className='bg-white rounded-lg w-[calc(98%-1rem)] p-0.5'/>
                            <input type="text" name="h1" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="h2" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="h3" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="h4" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/>
                        </div>
                    </div>

                    <div className="pr-4 pb-4">
                        <div className="flex justify-center items-center flex-wrap w-146 h-18 mx-auto bg-trick rounded-lg">
                            <input type="text" name="tCat" placeholder='Tricky Category Title' className='bg-white rounded-lg w-[calc(98%-1rem)] p-0.5'/>
                            <input type="text" name="t1" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="t2" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="t3" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/><strong>,</strong>
                            <input type="text" name="t4" placeholder='Answer' className='bg-white rounded-lg w-[calc(24%-1rem)] mx-2 p-0.5'/>
                        </div>
                    </div>
                </form>

            </div>
        ) 
    )
}

export default CreateGame