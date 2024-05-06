
import "./Play.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWords, GetWordsLearnt } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";

export const Play = () => {
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
    const [loadedData1, setLoadedData1] = useState(false);
    const [loadedData2, setLoadedData2] = useState(false);

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

    useEffect(() => {
        const fetchLearntWords = async () => { // ALL LEARNT WORDS
            try {
                const fetched = await GetWordsLearnt(tokenStorage);
                setLearntWords(fetched.data);
                setLoadedData2(true);
            } catch (error) {
                console.error('Failed to fetch learnt words:', error);
            }
        };
        if (!loadedData2) {
            fetchLearntWords();
        }
    }, [loadedData2]);

    useEffect(() => {
        if (words.length > 0) {
            const allConcepts = words.map(item => item.EN);
            setAllConcepts(allConcepts);
        }
    }, [words]);
    useEffect(() => {
        if (learntWords.length > 0) {
            const learntConcepts = learntWords.map(item => item.word.EN);
            setLearntConcepts(learntConcepts);
        }
    }, [learntWords]);

    useEffect(() => {
        if (allConcepts.length > 0 && learntConcepts.length > 0) {
            const wordToPlay = words.find(word => !learntConcepts.includes(word.EN));
            setWordToPlay(wordToPlay);
        }
    }, [allConcepts, learntConcepts]);

    return (
        <>
            <div className="playDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData1 && loadedData2 && (
                            <>
                                <div className="game">
                                    <div className="borderConcept">

                                        <br />
                                        <img className="img text" src={wordToPlay && wordToPlay.image ? `../../src/assets/${wordToPlay.image.slice(2)}` : ''} alt="" />
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
