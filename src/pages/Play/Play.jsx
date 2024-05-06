
import "./Play.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWords, GetWordsLearnt } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
import { Word } from "../Word/Word";


export const Play = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Redux writing mode
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const [loadedData, setLoadedData] = useState(false);

    const [words, setWords] = useState([]); // State to store fetched words
    const [wordToPlay, setWordToPlay] = useState([]); // State to store fetched words
    const [learntWords, setLearntWords] = useState([]);

    useEffect(() => {
        const getAllWords = async () => {
            try {
                const allWords = await GetWords(); // ALL WORDS FROM THE GAME
                setWords(allWords);
                setLoadedData(true);
            } catch (error) {
                console.error('Failed to fetch all words:', error);
            }
        };
        if (!loadedData) {
            getAllWords();
        }
    }, [loadedData]);

    useEffect(() => {
        const fetchLearntWords = async () => { // ALL LEARNT WORDS
            try {
                const words = await GetWordsLearnt(tokenStorage);
                console.log("words", words);
                setLearntWords(words.data);
                setLoadedData(true);
            } catch (error) {
                console.error('Failed to fetch learnt words:', error);
            }
        };

        if (!loadedData) {
            fetchLearntWords();
        }
    }, [loadedData]);

    useEffect(() => {
        // const getCurrentWord = () => {// ALL LEARNT WORDS
        //     try {
        const learntConcepts = learntWords.map(item => item.word.EN)
        console.log("words", learntWords);
        console.log("concepts", learntConcepts);
        // const wordToPlay = words.find(word => includes(word.word.EN));

        console.log(3333, learntWords);
        console.log(444, words);
        console.log(111111, wordToPlay);
        setWordToPlay(wordToPlay)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // };

        // if (learntWords.length) {
        //     getCurrentWord();
        // }
    }, [loadedData]);



    return (
        <>
            <div className="playDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData && (
                            <>
                                <div className="game">
                                    <div className="borderConcept">

                                        <br />
                                        <img className="img text" src={`../../src/assets/${wordToPlay.image.slice(2)}`} alt="" />
                                        <h3 className="text2">{wordToPlay.JP}</h3>
                                        <h5 className="white">'{wordToPlay.romanji}'</h5>
                                        <h4 className="text2">{wordToPlay.EN}</h4>
                                        <br />
                                    </div>
                                    <div className="rowBtns">
                                        <CButton
                                            className={"cButtonGreen cButtonDesign"}
                                            title={<span className="whiteTick">✓</span>}
                                            functionEmit={() => navigate("/play2")}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                    </>
                ) : (
                    <div className="playDesign">
                        <div className="circle"><span className="text">TAPS</span></div>
                    </div>
                )}
            </div >
        </>
    );
};
