
import "./Play.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWordToPlay } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";

export const Play = () => {
    const rdxUserData = useSelector(userData);

    const navigate = useNavigate();
    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);

    const [wordToPlay, setWordToPlay] = useState({});
    const [loadedData1, setLoadedData1] = useState(false);


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


    return (
        <>
            <div className="playDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData1 && (
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
