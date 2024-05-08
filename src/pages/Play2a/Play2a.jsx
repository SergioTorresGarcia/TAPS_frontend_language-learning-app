
import "./Play2a.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWordToPlay, GetWordsFromLevelToDivert } from "../../services/apiCalls";

export const Play2a = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);

    const navigate = useNavigate();
    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);

    const [wordToPlay, setWordToPlay] = useState({});
    const [wordsToDivert, setWordsToDivert] = useState({});
    const [loadedData1, setLoadedData1] = useState(false);
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
                const levelId = 1
                const fetched = await GetWordsFromLevelToDivert(tokenStorage, levelId);
                if (fetched && fetched.data) {
                    setWordsToDivert(fetched.data);
                }
                setLoadedData1(true);
            } catch (error) {
                console.error('Failed to fetch words to divert:', error);
            }
        };
        if (!loadedData1) {
            getWordsToDivert();
        }
    }, [loadedData1]);

    const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const oneToDivert = wordsToDivert[random(0, wordsToDivert.length)];

    const gotItRight = async () => {
        setAnswer(1);
        setTimeout(() => {
            navigate('/play3');
            setAnswer(0);
        }, 1500);
    }

    const gotItWrong = () => {
        setAnswer(2)
        setTimeout(() => {
            navigate('/play3');
            setAnswer(0)
        }, 1500);
    }

    return (
        <>
            <div className="playDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData1 && (
                            <>
                                <div className="game">
                                    <div className="borderPlay2a">
                                        <br />
                                        {wordToPlay?.id % 3 == 0
                                            ?
                                            (<div className="right" onClick={() => { gotItRight() }}>
                                                <img className="img2a text " src={wordToPlay && wordToPlay?.image ? `../../src/assets/${wordToPlay?.image.slice(2)}` : ''} alt={wordToPlay?.EN} />

                                            </div>)
                                            : (<div className="wrong" onClick={() => { gotItWrong() }}>
                                                <img className="img2a text " src={oneToDivert && oneToDivert?.image ? `../../src/assets/${oneToDivert?.image.slice(2)}` : ''} alt={oneToDivert?.EN} />
                                            </div>)
                                        }

                                        <br />
                                        <h3 className="text2">{wordToPlay?.JP}</h3>
                                        <h5 className="white">'{wordToPlay?.romanji}'</h5>
                                        <br /><br />
                                        {wordToPlay?.id % 3 != 0
                                            ?
                                            (<div className="right" onClick={() => { gotItRight() }}>
                                                <img className="img2a text " src={wordToPlay && wordToPlay?.image ? `../../src/assets/${wordToPlay?.image.slice(2)}` : ''} alt={wordToPlay?.EN} />
                                            </div>)
                                            : (<div className="wrong" onClick={() => { gotItWrong() }}>
                                                <img className="img2a text " src={oneToDivert && oneToDivert?.image ? `../../src/assets/${oneToDivert?.image.slice(2)}` : ''} alt={oneToDivert?.EN} />
                                            </div>)
                                        }

                                        {answer == 1 ? <div className="layerUp">
                                            <div className="goodAnswer whiteTick cButtonGreen ">✓</div>
                                        </div> : ""}
                                        {answer == 2 ? <div className="layerUp">
                                            <div className="badAnswer whiteTick cButtonRed ">❌</div>
                                        </div> : ""}

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
