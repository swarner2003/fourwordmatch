import axios from "axios";
import { useState, useEffect } from "react";
import './index.css'

function ConnectGame(){

    const [data, setData] = useState(null);
    const [displayArray, setdisplayArray] = useState(Array.from({ length: 16 }, (_, index) => index));

    //controlling revealing the answers
    const [showStraightforward, setShowStraightforward] = useState(false);
    const [showMedium, setShowMedium] = useState(false);
    const [showHard, setShowHard] = useState(false);
    const [showTrick, setShowTrick] = useState(false);

    let gameTitle = "defualt";
    let gameAuthor = "person";

    const fetchAPI = async () => {
        try{
            const response = await axios.get("http://localhost:8080/four_word_match_table_information/1")
            setData(response.data)
        } catch (error) {
            console.error("Error Fetching Data:", error)
        }
    };

    const showAnswer = (answerId) => {
        switch (answerId) {
            case 0:
                setShowStraightforward(true);
                break;
            case 1:
                setShowMedium(true);
                break;
            case 2:
                setShowHard(true);
                break;
            case 3:
                setShowTrick(true);
                break;
            default:
                setShowStraightforward(true);
        }
    };

    //loads default connection game
    useEffect(() => {
        fetchAPI();
    }, []);

    //shuffles board
    useEffect(() => {
        shuffleDisplay(); 
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

    function loadAnswersText(aArray) {
        let answerStringArray = new Array(4);

        for (let i = 0; i < 4; i++) {
            let buildAString = "";

            for (let j = 0; j < 4; j++) {
                buildAString += aArray[i*4 + j];
                if (j != 3) {
                    buildAString += ", "
                }
            }

            answerStringArray[i] = buildAString;
        }

        return answerStringArray;
    };

    //suffles an array (used for shuffle options of connection game)
    function shuffleArray(array) {
        const localArray = [...array];

        for (let i = 0; i < localArray.length; i++) {
            let j = Math.floor(Math.random() * (i+1));
            [localArray[i], localArray[j]] = [localArray[j], localArray[i]];
        }

        return localArray
    };

    //suffles the game using shuffle fuction
    const shuffleDisplay = async () => {
        setdisplayArray(prev => shuffleArray(prev))
    };

    //checks if data has loaded yet, if not displays loading...
    if (!data) {
        return <h1>loading...</h1>
    };

    //loads defualt table name and author
    let tableName = data.TableName;
    let tableAuthor = data.TableAuthor;

    let guessCounter = 4;

    const [categories, answers] = loadGameTable(data.table_info)
    const answerToString = loadAnswersText(answers)
    
    return(
        <connectgame>
            <div className="pt-2 flex justify-center items-center">
                <h1 className="text-2xl"><b className="text-4xl pr-2">{tableName}</b> By: {tableAuthor}</h1>
            </div>

            <div className="pt-5 pb-5 flex justify-center items-center">
                Create four groups of four! 
            </div>

            { showStraightforward && <div className="pr-4 pb-4">
                <div className="flex justify-center items-center w-146 h-18 mx-auto bg-yellow-200 rounded-lg">
                <h1 className="text-center text-lg"><div className="text-xl"><b>{categories[0]}</b></div>{answerToString[0]} </h1>
                </div>
            </div>}

            { showMedium && <div className="pr-4 pb-4">
                <div className="flex justify-center items-center w-146 h-18 mx-auto bg-green-400 rounded-lg">
                <h1 className="text-center text-lg"><div className="text-xl"><b>{categories[1]}</b></div>{answerToString[1]} </h1>
                </div>
            </div>}

            { showHard && <div className="pr-4 pb-4">
                <div className="flex justify-center items-center w-146 h-18 mx-auto bg-indigo-300 rounded-lg">
                <h1 className="text-center text-lg"><div className="text-xl"><b>{categories[2]}</b></div>{answerToString[2]} </h1>
                </div>
            </div>}

            { showTrick && <div className="pr-4 pb-4">
                <div className="flex justify-center items-center w-146 h-18 mx-auto bg-purple-400 rounded-lg">
                <h1 className="text-center text-lg"><div className="text-xl"><b>{categories[3]}</b></div>{answerToString[3]} </h1>
                </div>
            </div>}

            <div className="flex flex-wrap gap-4 w-150 mx-auto">
                {displayArray.map((index) => (
                    <button key={index} className="w-[calc(25%-1rem)] h-15 bg-slate-200 text-sm sm:text-lg md:text-xl lg:text-1xl rounded-lg">
                        {answers[index]}
                    </button>
                ))}
            </div>

            <div className="pt-5 flex justify-center items-center">
                Mistakes remaining: {guessCounter} 
            </div>

            <div className="flex flex-wrap gap-4 w-150 mx-auto pt-5">
                <button onClick={shuffleDisplay} className="w-[calc(33%-1rem)] h-15 bg-slate-200 text-xl rounded-lg">SHUFFLE</button>
            </div>
        </connectgame>
    );
}

export default ConnectGame