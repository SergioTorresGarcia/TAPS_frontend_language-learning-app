
import "./Play.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWords } from "../../services/apiCalls";


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
        const getAllWords = async () => {
            try {
                const fetched = await GetWords(tokenStorage);
                setWords(fetched.data);
                setLoadedData(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (!loadedData) {
            getAllWords();
        }
    }, [loadedData]); // Call getAllWords only when loadedData changes

    return (
        <>
            <div className="playDesign">
                {rdxUserData.credentials?.token ? (
                    <>

                        {loadedData && (
                            <div>
                                {Object.entries(words).map(([key, value]) => (

                                    <div className="border" key={key}>
                                        <br />
                                        <img className="img text" src={`../../src/assets/${value.image.slice(2)}`} alt="" />
                                        <h3 className="text2">{value.JP}</h3>
                                        <h5 className="white">'{value.romanji}'</h5>
                                        <h4 className="text2">{value.EN}</h4>

                                        <div className="text2">[ Level: {value.levelId} | Challenge: {value.challengeId} ]</div>
                                        <br />
                                    </div>
                                ))}
                            </div>
                        )}

                    </>
                ) : (
                    <div className="playDesign">
                        <div className="circle"><span className="text">TAPS</span></div>
                    </div>
                )}
            </div >
            {/*  <div className="playDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        {words.data.length > 0 ? (
                            <>
                                <img src={words[0].image} alt="" />
                                <div>{words[0].EN}</div>
                                <div>{words[0].JP}</div>
                                <div>{words[0].romanji}</div>

                                <div onClick={() => { navigate('/play2') }}>
    
                                <span className="whiteTick">✓</span>
                            </div>
                            </>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </>
                ) : (
                    <div className="playDesign">
                        <div className="circle"><span className="text">TAPS</span></div>
                    </div>
                )}
            </div > */}
        </>
    );
};
