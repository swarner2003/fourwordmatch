import axios from "axios";
import { useState, useEffect } from "react";

function ConnectGame(){

    const [data, setData] = useState(null)

    let gameTitle = "defualt";
    let gameAuthor = "person"

    const fetchAPI = async () => {
        try{
            const response = await axios.get("http://localhost:8080/four_word_match_table_information/1")
            setData(response.data)
        } catch (error) {
            console.error("Error Fetching Data:", error)
        }
    };

    useEffect(() => {
        fetchAPI()
    }, []);

    if (!data) {
        return <h1>loading...</h1>
    }

    let tableName = data.TableName
    let tableAuthor = data.TableAuthor

    return(
        <connectgame>
            <h1>{tableName}</h1>
            <h2>{tableAuthor}</h2>
        </connectgame>
    );
}

export default ConnectGame