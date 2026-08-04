import axios from "axios";
import { useState, useEffect } from "react";
import './index.css'

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

    //loads default connection game
    useEffect(() => {
        fetchAPI();
    }, []);

    function loadGameTable(table_info) {
        let starightfoward = table_info.straightforward;
        let medium = table_info.medium;
        let hard = table_info.hard;
        let trick = table_info.trick;
        
        let cateArray = [starightfoward, medium, hard, trick];

        let cateNameArray = new Array(4);
        let answerArray = new Array(16);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                if (j == 0) {
                    cateNameArray[i] = cateArray[i][j];
                } else {
                    answerArray[i*4 + j - 1] = cateArray[i][j];
                }
            }
        }

        return [cateNameArray, answerArray];
    };

    //suffles an array (used for shuffle options of connection game)
    function stuffleArray(array) {
        for (let i = 0; i < array.length; i++) {
            let j = Math.floor(Math.random() * (i+1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array
    };

    //checks if data has loaded yet, if not displays loading...
    if (!data) {
        return <h1>loading...</h1>
    };

    //loads defualt table name and author
    let tableName = data.TableName;
    let tableAuthor = data.TableAuthor;

    const [categories, answers] = loadGameTable(data.table_info)

    let displayArray = Array.from({ length: 16 }, (_, index) => index);
    displayArray = stuffleArray(displayArray);

    return(
        <connectgame>
            <div class="pt-2 flex justify-center items-center">
                <h1 class="text-2xl"><b class="text-4xl pr-2">{tableName}</b> By: {tableAuthor}</h1>
            </div>

            <div class="flex flex-wrap gap-4 w-150 mx-auto pt-10">
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[0]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[1]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[2]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[3]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[4]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[5]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[6]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[7]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[8]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[9]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[10]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[11]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[12]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[13]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[14]]}</button>
                <button class="w-[calc(25%-1rem)] h-15 bg-yellow-50 text-sm sm:text-lg md:text-xl lg:text-1xl">{answers[displayArray[15]]}</button>
            </div>
        </connectgame>
    );
}

export default ConnectGame