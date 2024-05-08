
import "./Play3.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWordToPlay, GetWordsFromLevelToDivert } from "../../services/apiCalls";

export const Play3 = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);

    const navigate = useNavigate();
    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);

    const [wordToPlay, setWordToPlay] = useState({});
    const [wordsToDivert, setWordsToDivert] = useState({});
    const [loadedData1, setLoadedData1] = useState(false);
    const [loadedData2, setLoadedData2] = useState(false);
    const [answer, setAnswer] = useState(0);

    useEffect(() => {
        const getWordAtPlay = async () => {
            try {
                const fetched = await GetWordToPlay(tokenStorage); // ALL WORDS FROM THE GAME
                if (fetched) {
                    setWordToPlay(fetched);
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
        const getWordsToDivert = async () => {
            try {
                const levelId = 1;
                const fetched = await GetWordsFromLevelToDivert(tokenStorage, levelId);
                if (fetched && fetched.data) {
                    const randomIndexes = new Set(); // Set to store unique random indexes
                    const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

                    while (randomIndexes.size < 3) {
                        const randomIndex = random(0, fetched.data.length);
                        randomIndexes.add(randomIndex);
                    }
                    const wordsToDivertArray = Array.from(randomIndexes).map(index => fetched.data[index]);
                    setWordsToDivert(wordsToDivertArray);
                    setLoadedData2(true);
                }
            } catch (error) {
                console.error('Failed to fetch words to divert:', error);
            }
        };
        if (!loadedData1) {
            getWordsToDivert();
        }
    }, [loadedData2]);

    const gotItRight = async () => {
        setAnswer(1);
        // try {
        //     // Add the learned word to the user_words table
        //     await AddUserWord(rdxUserData?.credentials?.decoded?.userId, wordToPlay?.id);
        // } catch (error) {
        //     console.error('Failed to add learned word:', error);
        // }
        setTimeout(() => {
            navigate('/play4');
            setAnswer(0);
        }, 1500);
    }

    const gotItWrong = () => {
        setAnswer(2)
        setTimeout(() => {
            navigate('/play4');
            setAnswer(0)
        }, 1500);
    }


    return (
        <>
            <div className="playDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData1 && loadedData2 && (
                            <>
                                <div className="game">
                                    <div className="borderPlay3">
                                        <br />
                                        <div className="row">
                                            <div className="wrong" onClick={() => { gotItWrong() }}>
                                                <h3 className="text2">{wordsToDivert[0]?.JP}</h3>
                                                <h5 className="white">'{wordsToDivert[0]?.romanji}'</h5>
                                            </div>
                                            <div className="right" onClick={() => { gotItRight() }}>
                                                <h3 className="text2">{wordToPlay.JP}</h3>
                                                <h5 className="white">'{wordToPlay.romanji}'</h5>
                                            </div>
                                        </div>
                                        <br />

                                        <img className="img text " src={wordToPlay && wordToPlay.image ? `../../src/assets/${wordToPlay.image.slice(2)}` : ''} alt={wordToPlay.EN} />

                                        <div className="row">
                                            <div className="wrong" onClick={() => { gotItWrong() }}>
                                                <h3 className="text2">{wordsToDivert[1]?.JP}</h3>
                                                <h5 className="white">'{wordsToDivert[1]?.romanji}'</h5>
                                            </div>
                                            <div className="wrong" onClick={() => { gotItWrong() }}>
                                                <h3 className="text2">{wordsToDivert[2]?.JP}</h3>
                                                <h5 className="white">'{wordsToDivert[2]?.romanji}'</h5>
                                            </div>
                                        </div>
                                        <div className="layerUp">
                                            {answer == 1 ? <div className="goodAnswer whiteTick cButtonGreen ">✓</div> : ""}
                                            {answer == 2 ? <div className="badAnswer whiteTick cButtonRed ">❌</div> : ""}
                                        </div>
                                        <br />
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

