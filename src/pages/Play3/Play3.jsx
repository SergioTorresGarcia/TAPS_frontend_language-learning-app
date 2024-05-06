
import "./Play3.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWordToPlay, GetWordsLearnt, GetWordsToDivert } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
import { gotItRight, gotItWrong } from "../../utils/functions";


export const Play3 = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Redux writing mode
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const [currentWord, setCurrentWord] = useState([]);  // State to store current word to play
    const [otherWords, setOtherWords] = useState([]); // State to store fetched words already learnt
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
                // console.log(222222, fetched);
                // console.log(222222, fetched.data);

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



    return (
        <div className="playDesign">
            {loadedData && (
                <div className="game">
                    <div className="borderConcept">
                        <br />
                        <img className="img text" src={`../../src/assets/${currentWord.image.slice(2)}`} alt={currentWord.EN} />
                        <h3 className="text2">{learntWord.JP}</h3>
                        <h5 className="white">'{learntWord.romanji}'</h5>
                        {/* <h4 className="text2">{learntWord.EN}</h4> */}
                        <br />
                    </div>
                    <div className="rowBtns">
                        <CButton
                            className={"cButtonRed cButtonDesign"}
                            title={<span className="whiteCross">𐄂</span>}
                            functionEmit={() => { gotItRight() }}
                        />
                        <CButton
                            className={"cButtonGreen cButtonDesign"}
                            title={<span className="whiteTick">✓</span>}
                            functionEmit={() => { gotItWrong() }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
