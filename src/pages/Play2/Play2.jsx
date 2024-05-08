
import "./Play2.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { AddUserWord, GetWords, GetWordsLearnt } from "../../services/apiCalls";

export const Play2 = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Redux writing mode
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const [words, setWords] = useState([]); // State to store fetched ALL words
    const [allConcepts, setAllConcepts] = useState([]); // State to store fetched ALL words
    const [learntWords, setLearntWords] = useState([]);// State to store fetched LEARNT words
    const [learntConcepts, setLearntConcepts] = useState([]);// State to store fetched LEARNT words

    const [wordToPlay, setWordToPlay] = useState({});
    const [wordToDivert, setWordToDivert] = useState({});
    const [loadedData1, setLoadedData1] = useState(false);
    const [loadedData2, setLoadedData2] = useState(false);

    const [answer, setAnswer] = useState(0);

    useEffect(() => {
        const getWordAtPlay = async () => {
            try {
                const fetched = await GetWordToPlay(tokenStorage); // ALL WORDS FROM THE GAME
                if (fetched && fetched.data) {
                    setWordToPlay(fetched.data);
                }
                setLoadedData1(true);
            } catch (error) {
                console.error('Failed to fetch all words:', error);
            }
        };
        if (!loadedData1) {
            getWordAtPlay();
        }
    }, [loadedData1]);


    useEffect(() => {
        const getAllWords = async () => {
            try {
                const fetched = await GetWords(tokenStorage); // ALL WORDS FROM THE GAME
                setWords(fetched.data);
                setLoadedData1(true);
            } catch (error) {
                console.error('Failed to fetch all words:', error);
            }
        };
        if (!loadedData1) {
            getAllWords();
        }
    }, [loadedData1]);

    // useEffect(() => {
    //     const fetchLearntWords = async () => { // ALL LEARNT WORDS
    //         try {
    //             const fetched = await GetWordsLearnt(tokenStorage);
    //             if (fetched && fetched.data) {
    //                 setLearntWords(fetched.data);
    //             } else {
    //                 // Handle the case when fetched data is empty
    //                 setLearntWords([]);
    //             }
    //             setLoadedData2(true);
    //         } catch (error) {
    //             console.error('Failed to fetch learnt words:', error);
    //             setLearntWords([]);
    //         }
    //     };
    //     if (!loadedData2) {
    //         fetchLearntWords();
    //     }
    // }, [loadedData2]);

    // useEffect(() => {
    //     if (words.length > 0) {
    //         const allConcepts = words.map(item => item.EN);
    //         setAllConcepts(allConcepts);
    //     }
    // }, [words]);

    // useEffect(() => {
    //     if (learntWords?.length > 0) {
    //         const learntConcepts = learntWords?.map(item => item.word.EN);
    //         setLearntConcepts(learntConcepts);
    //     }
    // }, [learntWords]);

    // useEffect(() => {
    //     const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
    //     const learntWord = learntWords[random(0, learntWords.length)]
    //     setWordToDivert(learntWord);

    //     if (allConcepts.length > 0 && (learntConcepts?.length ?? 0) > 0) {
    //         const wordToPlay = words.find(word => !learntConcepts.includes(word.EN));
    //         setWordToPlay(wordToPlay || words[0]); // If there are no learnt words -> use the first word from words
    //     } else if (allConcepts.length > 0) {
    //         // If there are no learnt concepts, set wordToPlay to the first word
    //         setWordToPlay(words[0]);
    //     }
    // }, [allConcepts, learntConcepts, words, learntWords]);

    // useEffect(() => {
    //     const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
    //     const learntWord = learntWords[random(0, learntWords.length)] || words[1]
    //     setWordToDivert(learntWord);
    // }, [learntWords]);

    // const loc = location.pathname;
    // const gotItRight = async () => {
    //     console.log('YEAH! THAT IS THE CORRECT ANSWER! :D');
    //     setAnswer(1);
    //     try {
    //         // Add the learned word to the user_words table
    //         await AddUserWord(rdxUserData?.credentials?.decoded?.userId, wordToPlay?.id);
    //     } catch (error) {
    //         console.error('Failed to add learned word:', error);
    //     }

    //     setTimeout(() => {
    //         navigate(loc.slice(0, -1) + (parseInt(loc.slice(-1)) + 1));
    //         setAnswer(0);
    //     }, 1500);
    // }

    // const gotItWrong = () => {
    //     setAnswer(2)
    //     console.log('NOPE... THAT IS NOT THE CORRECT ANSWER, SORRY :(');
    //     setTimeout(() => {
    //         navigate(loc.slice(0, -1) + (parseInt(loc.slice(-1)) + 1));
    //         setAnswer(0)
    //     }, 1500);
    // }

    return (
        <>
            <div className="playDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData1 && loadedData2 && (
                            <>
                                <div className="game">
                                    {/* <div className="borderPlay2">
                                        <br />
                                        <div className="right" onClick={() => { gotItRight() }}>
                                            <h3 className="text2">{wordToPlay?.JP}</h3>
                                            <h5 className="white">'{wordToPlay?.romanji}'</h5>
                                        </div>
                                        <br />

                                        <img className="img text " src={wordToPlay && wordToPlay?.image ? `../../src/assets/${wordToPlay?.image.slice(2)}` : ''} alt={wordToPlay?.EN} />
   
                                        <div className="wrong" onClick={() => { gotItWrong() }}>
                                            <h3 className="text2">{wordToDivert?.JP || words[1].JP}</h3>
                                            <h5 className="white">'{wordToDivert?.romanji || words[1].romanji}'</h5>
                                        </div>
                                        <div className="layerUp">
                                            {answer == 1 ? <div className="goodAnswer whiteTick cButtonGreen ">✓</div> : ""}
                                            {answer == 2 ? <div className="badAnswer whiteTick cButtonRed ">❌</div> : ""}
                                        </div>
                                        <br />
                                    </div> */}
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
