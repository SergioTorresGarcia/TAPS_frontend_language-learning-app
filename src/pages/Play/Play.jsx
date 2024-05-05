
import "./Play.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWordToPlay } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";


export const Play = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Redux writing mode
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const [words, setWords] = useState([]); // State to store fetched words
    const [loadedData, setLoadedData] = useState(false);

    useEffect(() => {
        const getCurrentWord = async () => {
            try {
                const fetched = await GetWordToPlay(tokenStorage);
                console.log(111111, fetched);
                setWords(fetched.data.word);
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

                {/* ---dev info--- <br />
                "LEARN THE WORD" view<br />
                [ Level: {words.levelId} | Challenge: {words.challengeId} ]<br />
                -------------- */}
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData && (
                            <>
                                <div className="game">
                                    <div className="borderConcept">
                                        <br />
                                        <img className="img text" src={`../../src/assets/${words.image.slice(2)}`} alt="" />
                                        <h3 className="text2">{words.JP}</h3>
                                        <h5 className="white">'{words.romanji}'</h5>
                                        <h4 className="text2">{words.EN}</h4>
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
