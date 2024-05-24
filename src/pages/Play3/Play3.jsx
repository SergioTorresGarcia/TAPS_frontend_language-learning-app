
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
            } catch (error) {
                console.error('Failed to fetch words to divert:', error);
            }
        };
        if (!loadedData1) {
            getWordsToDivert();
        }
    }, [loadedData1]);

    // Function to shuffle array elements
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const gotItRight = async () => {
        setAnswer(1);
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
    const shuffledOptions = shuffleArray([wordToPlay, wordsToDivert[0], wordsToDivert[1], wordsToDivert[2]]);

    return (
        <div className="playDesign">
            {rdxUserData.credentials?.token ? (
                <>
                    {loadedData1 && loadedData2 && (
                        <div className="game">
                            <div className="borderPlay3">
                                <br />
                                <div className="container">
                                    {/* Shuffle all options including right and wrong answers */}
                                    {/* First two options */}
                                    <div className="row">
                                        {(shuffledOptions.slice(0, 2)).map((word, index) => (
                                            <div key={index} className="option" onClick={word === wordToPlay ? gotItRight : gotItWrong}>
                                                <h3 className="text2">{word.JP}</h3>
                                                <h5 className="white">'{word.romanji}'</h5>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Image */}
                                    <img className="img text" src={wordToPlay && wordToPlay.image ? `/assets/${wordToPlay.image}` : ''} alt={wordToPlay.EN} />
                                    {/* Last two options */}
                                    <div className="row">
                                        {(shuffledOptions.slice(2)).map((word, index) => (
                                            <div key={index} className="option" onClick={word === wordToPlay ? gotItRight : gotItWrong}>
                                                <h3 className="text2">{word.JP}</h3>
                                                <h5 className="white">'{word.romanji}'</h5>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {answer === 1 ?
                                <div className="layerUp">
                                    <div className="answer">
                                        <div className="goodAnswer whiteTick cButtonGreen ">✓</div>
                                    </div>
                                </div> : ""}
                            {answer === 2 ?
                                <div className="layerUp">
                                    <div className="answer">
                                        <div className="badAnswer whiteTick cButtonRed ">❌</div>
                                    </div>
                                </div> : ""}
                            <br />
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

