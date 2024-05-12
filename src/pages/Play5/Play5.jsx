
import "./Play5.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWordToPlay, GetWordsFromLevelToDivert, SetUpWordAsLearnt } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";

export const Play5 = () => {
    const rdxUserData = useSelector(userData);
    const navigate = useNavigate();
    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);

    const [wordToPlay, setWordToPlay] = useState({});
    const [wordsToDivert, setWordsToDivert] = useState({});
    const [loadedData1, setLoadedData1] = useState(false);
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
                    setWordsToDivert(fetched2.data);
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
        try {
            // const userId = rdxUserData?.credentials?.decoded?.userId;
            const wordId = wordToPlay?.id;
            // Add the learned word to the user_words table
            await SetUpWordAsLearnt(tokenStorage, wordId)
        } catch (error) {
            console.error('Failed to add learned word:', error);
        }
        if (wordToPlay.id % 10 === 0) {
            navigate('/play/congrats');
        } else {
            setTimeout(() => {
                navigate('/play');
                setAnswer(0);
            }, 1500);
        }
    }
    const gotItWrong = () => {
        setAnswer(2)
        setTimeout(() => {
            navigate('/play');
            setAnswer(0)
        }, 1500);
    }

    return (
        <div className="playDesign">
            {rdxUserData.credentials?.token ? (
                <>
                    {loadedData1 && (
                        <div className="game">
                            <div className="borderPlay5">
                                <br /><br />
                                <img className="img text " src={wordToPlay && wordToPlay?.image ? `../../src/assets/${wordToPlay?.image.slice(2)}` : ''} alt={wordToPlay?.EN} />
                                <br />
                                {wordToPlay?.id % 3 == 0
                                    // corresponding word
                                    ? (< div className="right">
                                        <h3 className="text2">{wordToPlay?.JP}</h3>
                                        <h5 className="white">'{wordToPlay?.romanji}'</h5>
                                    </div>)
                                    // diversion word
                                    : (< div className="wrong">
                                        <h3 className="text2">{oneToDivert?.JP}</h3>
                                        <h5 className="white">'{oneToDivert?.romanji}'</h5>
                                    </div>
                                    )
                                }
                                {answer == 1 ? <div className="layerUp">
                                    <div className="goodAnswer whiteTick cButtonGreen ">✓</div>
                                </div> : ""}
                                {answer == 2 ? <div className="layerUp">
                                    <div className="badAnswer whiteTick cButtonRed ">❌</div>
                                </div> : ""}
                                <br />
                            </div>
                            <div className="rowBtns">
                                <CButton
                                    className={"cButtonRed cButtonDesign cButtonDesign4"}
                                    title={<span className="whiteTick">x</span>}
                                    functionEmit={wordToPlay?.id % 3 != 0 ? () => gotItRight() : () => gotItWrong()}
                                />
                                <CButton
                                    className={"cButtonGreen cButtonDesign cButtonDesign4"}
                                    title={<span className="whiteTick">✓</span>}
                                    functionEmit={wordToPlay?.id % 3 == 0 ? () => gotItRight() : () => gotItWrong()}
                                />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="playDesign">
                    <div className="circle"><span className="text">TAPS</span></div>
                </div>
            )}
        </div >
    );
};
