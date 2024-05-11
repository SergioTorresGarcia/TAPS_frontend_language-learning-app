
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
    const [level, setLevel] = useState([]);
    const [words, setWords] = useState([]);
    const [loadedData1, setLoadedData1] = useState(false);
    const [loadedData2, setLoadedData2] = useState(false);

    useEffect(() => {
        const getLevel = async () => {
            try {
                const fetched = await GetLevels(tokenStorage);
                if (Array.isArray(fetched.data) && fetched.data.length > 0) {
                    setLevel(fetched.data.map(item => item.name));
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

    useEffect(() => {
        const getLearntWords = async () => {
            try {
                const fetched = await GetWordsLearnt(tokenStorage);
                if (Array.isArray(fetched) && fetched.length > 0) {
                    setWords(fetched.map(item => item.name));
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

    const accomplishedLevel = (words.length + 1) / 10

    return (
        <>
            <div className="newLevelDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData1 && loadedData2 && (
                            <div className="box">
                                <div className="border">
                                    <br />
                                    <h2><em><big>{level[accomplishedLevel - 1]}</big></em><br /> accomplished</h2>
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
