
import "./Play2.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWordToPlay } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";


export const Play2 = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Redux writing mode
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const [word, setWord] = useState([]);  // State to store current word to play
    const [otherWords, setOtherWords] = useState([]); // State to store fetched words to divert
    const [loadedData, setLoadedData] = useState(false);

    useEffect(() => {
        const getCurrentWord = async () => {
            try {
                const fetched = await GetWordToPlay(tokenStorage);
                console.log(111111, fetched);
                setWord(fetched.data.word);
                setLoadedData(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (!loadedData) {
            getCurrentWord();
        }


    }, [loadedData]); // Call getAllWords only when loadedData changes

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
                                        {/* <h3 className="text2">{otherWord.JP}</h3>
                                        <h5 className="white">'{otherWord.romanji}'</h5> */}
                                        <img className="img text" src={`../../src/assets/${word.image.slice(2)}`} alt="" />
                                        <h3 className="text2">{word.JP}</h3>
                                        <h5 className="white">'{word.romanji}'</h5>
                                        <h4 className="text2">{word.EN}</h4>
                                        <br />
                                    </div>
                                    <div className="rowBtns">
                                        <CButton
                                            className={"cButtonRed cButtonDesign"}
                                            title={<span className="whiteCross">𐄂</span>}
                                            functionEmit={() => navigate("/play")}
                                        />
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
