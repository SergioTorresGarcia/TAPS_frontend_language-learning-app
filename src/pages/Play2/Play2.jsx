
import "./Play2.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWordToPlay, GetWordsLearnt, GetWordsToDivert } from "../../services/apiCalls";
import { gotItRight, gotItWrong } from "../../utils/functions";


export const Play2 = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Redux writing mode
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);

    const [otherWords, setOtherWords] = useState([]); // State to store fetched words already learnt
    const [currentWord, setCurrentWord] = useState([]);  // State to store current word to play
    const [learntWords, setLearntWords] = useState([]); // State to store fetched words to divert
    const [loadedData, setLoadedData] = useState(false);

    useEffect(() => {
        const getCurrentWord = async () => {
            try {
                const fetched = await GetWordToPlay(tokenStorage);
                setCurrentWord(fetched.data.word);
                setLoadedData(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (!loadedData) {
            getCurrentWord();
        }
    }, [loadedData]);
    console.log(1, "currentWord", currentWord);

    useEffect(() => {
        const getLearntWords = async () => {
            try {
                const fetched = await GetWordsLearnt(tokenStorage);

                setLearntWords(fetched.data);
                setLoadedData(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (!loadedData) {
            getLearntWords();
        }
    }, [loadedData]);
    console.log(2, "learntWords", learntWords);

    useEffect(() => {
        const getOtherWords = async () => {
            try {
                const fetched = await GetWordsToDivert(tokenStorage);

                setOtherWords(fetched.data);
                setLoadedData(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (!loadedData) {
            getOtherWords();
        }
    }, [loadedData]);
    console.log(3, "otherWords", otherWords);

    const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const learntWord = learntWords[random(0, learntWords.length)]
    console.log(4, "one of the learnt", learntWord?.word.JP);

    const loc = location.pathname;

    const gotItRight = () => {
        console.log('YEAH! THAT IS THE CORRECT ANSWER! :D');
        navigate(loc.slice(0, -1) + (parseInt(loc.slice(-1)) + 1));
        learntWords.append(currentWord);
    }

    const gotItWrong = () => {
        console.log('NOPE... THAT IS NOT THE CORRECT ANSWER, SORRY :(');
        navigate(loc.slice(0, -1) + (parseInt(loc.slice(-1)) + 1));
    }



    return (
        <>
            <div className="playDesign">

                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData && (
                            <>
                                <div className="game">
                                    <div className="borderPlay2">
                                        <br />
                                        <div className="wrong" onClick={() => { gotItWrong() }}>
                                            <h3 className="text3">{learntWord?.word.JP}</h3>
                                            <span className="white">'{learntWord?.word?.romanji}'</span><br /><br />
                                        </div>

                                        <img className="img text" src={currentWord && currentWord.image ? `../../src/assets/${currentWord.image.slice(2)}` : ''} alt="" />
                                        <div className="right" onClick={() => { gotItRight() }}>
                                            <h3 className="text3">{currentWord.JP}</h3>
                                            <span className="white">'{currentWord.romanji}'</span><br /><br />
                                            <br />
                                        </div>
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
