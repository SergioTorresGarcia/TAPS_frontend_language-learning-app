
import "./NewLevel.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetLevels, GetWordsLearnt } from "../../services/apiCalls";


export const NewLevel = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Redux writing mode
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const [levels, setLevels] = useState([]);
    const [words, setWords] = useState([]);
    const [loadedData1, setLoadedData1] = useState(false);
    const [loadedData2, setLoadedData2] = useState(false);

    useEffect(() => {
        const getLevel = async () => {
            try {
                const fetched = await GetLevels(tokenStorage);
                if (Array.isArray(fetched) && fetched.length > 0) {
                    setLevels(fetched);
                    setLoadedData1(true);
                }
            } catch (error) {
                console.error('Failed to fetch levels:', error);
            }
        };
        if (!loadedData1) {
            getLevel();
        }
    }, [loadedData1]);
    console.log(levels);
    console.log(levels[0]);

    useEffect(() => {
        const getLearntWords = async () => {
            try {
                const fetched = await GetWordsLearnt(tokenStorage);
                if (Array.isArray(fetched) && fetched.length > 0) {
                    setWords(fetched);
                    setLoadedData2(true);
                }
            } catch (error) {
                console.error('Failed to fetch learnt words:', error);
            }
        };
        if (!loadedData2) {
            getLearntWords();
        }
    }, [loadedData2]);
    console.log(words);
    const accomplishedLevel = (words.length + 1) / 10
    console.log(accomplishedLevel);

    return (
        <>
            <div className="newLevelDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData1 && loadedData2 && (
                            <div className="box">
                                <div className="border">
                                    <br />
                                    <h2><em><big>{levels[accomplishedLevel - 1].name}</big></em><br /> accomplished</h2>
                                    <h1>Congrats!</h1>
                                    <h3>You've passed level {accomplishedLevel} out of 5</h3>

                                    <div className="cButtonDesign">
                                        <h2 onClick={() => { navigate('/play') }}>⇨</h2>
                                    </div>
                                </div>

                            </div>
                        )}
                    </>
                ) : (
                    <div className="wordDesign">
                        <div className="circle"><span className="text">TAPS</span></div>
                    </div>
                )}
            </div >
        </>
    );
};
