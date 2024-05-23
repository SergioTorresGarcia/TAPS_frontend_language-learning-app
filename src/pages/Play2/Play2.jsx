
import "./Play2.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWordToPlay, GetWordsFromLevelToDivert } from "../../services/apiCalls";

export const Play2 = () => {
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
        const getWordsToDivert = async () => {
            try {
                const fetched1 = await GetWordToPlay(tokenStorage); // ALL WORDS FROM THE GAME
                if (fetched1) {
                    setWordToPlay(fetched1);
                }
                setLoadedData1(true);

                const fetched2 = await GetWordsFromLevelToDivert(tokenStorage, fetched1?.levelId || 1);
                if (fetched2 && fetched2.data) {
                    const randomIndexes = new Set(); // Set to store unique random indexes
                    const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

                    while (randomIndexes.size < 3) {
                        const randomIndex = random(0, fetched2.data.length);
                        randomIndexes.add(randomIndex);
                    }
                    const wordsToDivertArray = Array.from(randomIndexes).map(index => fetched2.data[index]);
                    setWordsToDivert(wordsToDivertArray);
                    setLoadedData2(true);
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
            navigate('/play2a');
            setAnswer(0);
        }, 1500);
    }

    const gotItWrong = () => {
        setAnswer(2)
        setTimeout(() => {
            navigate('/play2a');
            setAnswer(0)
        }, 1500);
    }

    return (
        <div className="playDesign">
            {rdxUserData.credentials?.token ? (
                <>
                    {loadedData1 && (
                        <div className="game">
                            <div className="borderPlay2">
                                <br />
                                {wordToPlay?.id % 2 == 0
                                    ? (<div className="right" onClick={() => { gotItRight() }}>
                                        <h3 className="text2">{wordToPlay?.JP}</h3>
                                        <h5 className="white">'{wordToPlay?.romanji}'</h5>
                                    </div>)
                                    : (<div className="wrong" onClick={() => { gotItWrong() }}>
                                        <h3 className="text2">{oneToDivert?.JP}</h3>
                                        <h5 className="white">'{oneToDivert?.romanji}'</h5>
                                    </div>)
                                }
                                <br />
                                <img className="img text " src={wordToPlay && wordToPlay?.image ? `src/assets/${wordToPlay?.image}` : ''} alt={wordToPlay?.EN} />
                                <br />
                                {wordToPlay?.id % 2 != 0 ?
                                    (<div className="right" onClick={() => { gotItRight() }}>
                                        <h3 className="text2">{wordToPlay?.JP}</h3>
                                        <h5 className="white">'{wordToPlay?.romanji}'</h5>
                                    </div>)
                                    : (<div className="wrong" onClick={() => { gotItWrong() }}>
                                        <h3 className="text2">{oneToDivert?.JP}</h3>
                                        <h5 className="white">'{oneToDivert?.romanji}'</h5>
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
                    )}
                </>
            ) : (
                <div className="playDesign">
                    <div className="circle"><span className="text">TAPS</span></div>
                </div>
            )}
        </div>
    );
};
