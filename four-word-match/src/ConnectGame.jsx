import axios from "axios";
import { useState, useEffect} from "react";
import './index.css'
import { useParams } from "react-router-dom";

const apiURL = import.meta.env.VITE_API_URL;

function ConnectGame(){

    //handles rendering variables + params
    const [data, setData] = useState(null);
    const [displayArray, setDisplayArray] = useState(Array.from({ length: 16 }, (_, index) => index));
    const [buttonColorArray, setButtonColorArray] = useState(Array.from({ length: 16 }, (_, index) => 'bg-stone-200'));
    const { gameID } = useParams();

    //controlling revealing the answers
    const [showStraightforward, setShowStraightforward] = useState(false);
    const [showMedium, setShowMedium] = useState(false);
    const [showHard, setShowHard] = useState(false);
    const [showTrick, setShowTrick] = useState(false);
    
    //variables that controll gamestate
    const [numSelect, setNumSelect] = useState(0);
    const [selectedID, setSelectedID] = useState([]);
    const [guessCounter, setGuessCounter] = useState(4);
    const [showDeselect, setDeselect] = useState(false);
    const [showSubmit, setShowSubmit] = useState(false);
    const [showWrong, setShowWrong] = useState(false);
    const [threeCorrect, setThreeCorrect] = useState(0);
    const [guessed, setGuessed] = useState([]);

    let gameTitle = "default";
    let gameAuthor = "person";

    const redMessageArray = ["wrong answer :(", "one away :)", "You have already guessed that :|", "You Lost...Game Over :,("]

    const fetchAPI = async (gID) => {
        try{
            const targetID = gID ?? 1;
            const response = await axios.get(`${apiURL}four_word_match_table_information/${targetID}`);

            setData(response.data);
        } catch (error) {
            console.error("Error Fetching Data:", error);
        }
    };

    const showAnswer = async (answerId) => {
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

    const selectConnect = async (cLoc) => {
        const isColorSelected = selectedID.indexOf(cLoc);

        if (isColorSelected == -1) {
            const res = await select(cLoc);
        } else {
            const res = await deselect(cLoc, isColorSelected);
        }

        if (!showDeselect) {
            setDeselect(true);
        }
    };

    const select = async (cLoc) => {
        if (numSelect === 4) {
            return -1;
        } else {
            setNumSelect(prev => prev + 1);
            setSelectedID(prev => [...prev, cLoc]);
            setButtonColorArray(prev => prev.map((color, index) => index === cLoc ? "bg-lime-400" : color));
        }

        if (numSelect === 3) {
            setShowSubmit(true);
        }

        return 1;
    };

    const deselect = async (cLoc, removeIndex) => {
        setNumSelect(prev => prev - 1);
        setSelectedID(selectedID.filter((_, index) => index !== removeIndex));
        setButtonColorArray(prev => prev.map((color, index) => index === cLoc ? "bg-stone-200" : color));

        if (numSelect === 1) {
            setDeselect(false);
        } else if (numSelect === 4) {
            setShowSubmit(false);
        }

        return 1;
    };

    const deSelectAll = async () => {
        for (let i = 0; i < selectedID.length; i++) {
            setButtonColorArray(prev => prev.map((color, index) => index === selectedID[i] ? "bg-stone-200" : color));
        }
        setNumSelect(0);
        setSelectedID([]);
        setDeselect(false);
    };

    const submit = async () => {

        await setShowWrong(false);

        if (numSelect !== 4) {
            return;
        } else if (await guessedBefore(selectedID)) {
            await setThreeCorrect(2);
            await setShowWrong(true);
            return;
        }

        await setGuessed(prev => [...prev, [...selectedID]]);
        await setThreeCorrect(0);

        const testAnswer = selectedID.map(sID => Math.floor(sID/4));
        let answerFreq = Array.from({ length: 4 }, (_, index) => 0);

        for (let i = 0; i < testAnswer.length; i++) {
            let index = testAnswer[i];
            answerFreq[index] = answerFreq[index] + 1;
        }

        for (let i = 0; i < answerFreq.length; i++) {
            if (answerFreq[i] === 4) {
                showAnswer(i);
                removeAnswerButton();
                setShowSubmit(false);
                return;
            } else if ((answerFreq[i] === 3)) {
                await setThreeCorrect(1);
            }
        }

        if (guessCounter === 1) {
            await setThreeCorrect(3);
            await setShowWrong(true);
            await deleteWholeBoard();
            for (let i = 0; i < 4; i++) {
                showAnswer(i);
            }
            await deSelectAll();
            setShowSubmit(false);
            setGuessCounter(prev => prev - 1);
            return;
        }
        
        await setShowWrong(true);
        setGuessCounter(prev => prev - 1);
    };

    const removeAnswerButton = async () => {
        for(let i = 0; i < selectedID.length; i ++) {
            let removeID = selectedID[i];
            setDisplayArray(prev => prev.filter(item => item !== removeID));
        }

        setNumSelect(0);
        setSelectedID([]);
        setDeselect(false);
    }

    const guessedBefore = async (currentGuess) => {
        return guessed.some(oldGuess =>
            compareTwoArrays(currentGuess, oldGuess)
        );
    }

    const deleteWholeBoard = async () => {
        setDisplayArray([]);
    }

    const compareTwoArrays = (aOne, aTwo) => {
        if (aOne.length !== aTwo.length) return false;

        const cAOne = [...aOne].sort();
        const cATwo = [...aTwo].sort();

        return cAOne.every((val, index) => val === cATwo[index]);
    }

    //loads default connection game
    useEffect(() => {
        fetchAPI(gameID);
    }, [gameID]);

    //shuffles board
    useEffect(() => {
        shuffleDisplay(); 
    }, []);

    function loadGameTable(table_info) {
        let straightforward = table_info.straightforward;
        let medium = table_info.medium;
        let hard = table_info.hard;
        let trick = table_info.trick;
        
        let cateArray = [straightforward, medium, hard, trick];

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
        setDisplayArray(prev => shuffleArray(prev))
    };

    //checks if data has loaded yet, if not displays loading...
    if (!data) {
        return <h1 className="flex justify-center items-center text-3xl">Error: Game not found</h1>
    };

    //loads default table name and author
    let tableName = data.TableName;
    let tableAuthor = data.TableAuthor;

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

            { showWrong && <div className="absolute top-6/30 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 animate-fade-in-out">
                <h1 className="rounded-lg bg-red-400 p-2 text-2xl">{redMessageArray[threeCorrect]}</h1>
            </div>}

            { showStraightforward && <div className="pr-4 pb-4">
                <div className="flex justify-center items-center w-[calc(40.5%-1rem)] h-16 mx-auto bg-straightforward rounded-lg">
                <h1 className="text-center text-lg"><div className="text-xl"><b>{categories[0]}</b></div>{answerToString[0]} </h1>
                </div>
            </div>}

            { showMedium && <div className="pr-4 pb-4">
                <div className="flex justify-center items-center w-[calc(40.5%-1rem)] h-16 mx-auto bg-medium rounded-lg">
                <h1 className="text-center text-lg"><div className="text-xl"><b>{categories[1]}</b></div>{answerToString[1]} </h1>
                </div>
            </div>}

            { showHard && <div className="pr-4 pb-4">
                <div className="flex justify-center items-center w-[calc(40.5%-1rem)] h-16 mx-auto bg-hard rounded-lg">
                <h1 className="text-center text-lg"><div className="text-xl"><b>{categories[2]}</b></div>{answerToString[2]} </h1>
                </div>
            </div>}

            { showTrick && <div className="pr-4 pb-4">
                <div className="flex justify-center items-center w-[calc(40.5%-1rem)] h-16 mx-auto bg-trick rounded-lg">
                <h1 className="text-center text-lg"><div className="text-xl"><b>{categories[3]}</b></div>{answerToString[3]} </h1>
                </div>
            </div>}

            <div className="flex flex-wrap gap-4 w-2/5 mx-auto">
                {displayArray.map((index) => (
                    <button key={index} onClick={() => selectConnect(index)}
                    className={`w-[calc(25%-1rem)] h-15 text-sm sm:text-lg md:text-xl lg:text-1xl rounded-lg ${buttonColorArray[index]}`}>
                        {answers[index]}
                    </button>
                ))}
            </div>

            <div className="pt-5 flex justify-center items-center">
                Mistakes remaining: {guessCounter} 
            </div>

            <div className="flex flex-wrap gap-5 w-2/5 mx-auto pt-5">
                <button onClick={shuffleDisplay} className="w-[calc(33%-1rem)] h-15 bg-stone-200 text-xl rounded-lg">Shuffle</button>
                <button onClick={deSelectAll} className={`w-[calc(33%-1rem)] h-15 text-xl rounded-lg 
                    ${showDeselect ? "bg-stone-200" : "bg-stone-100"} ${showDeselect ? "text-black" : "text-gray-400"}`}>Deselect All</button>
                <button onClick={submit} className={`w-[calc(33%-1rem)] h-15 text-xl rounded-lg 
                    ${showSubmit ? "bg-stone-200" : "bg-stone-100"} ${showSubmit ? "text-black" : "text-gray-400"}`}>Submit</button>
            </div>
        </connectgame>
    );
}

export default ConnectGame