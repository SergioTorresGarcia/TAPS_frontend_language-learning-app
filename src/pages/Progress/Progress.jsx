
import { useNavigate } from "react-router-dom";
import { GetLevels, GetWordsLearnt } from "../../services/apiCalls";
import "./Progress.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

// PAGE TO BE UPDATED!
export const Progress = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Redux writing mode
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const [isShowComments, setIsShowComments] = useState(false)
    const [levels, setLevels] = useState(false)
    const [words, setWords] = useState(false)
    const [loadedData1, setLoadedData1] = useState(false)
    const [loadedData2, setLoadedData2] = useState(false)

    const showComments = () => {
        setIsShowComments(!isShowComments)
    }


    useEffect(() => {
        const getLevel = async () => {
            try {
                const fetched = await GetLevels(tokenStorage);
                console.log(fetched);
                setLevels(fetched.data.map(item => item.name));
                setLoadedData1(true);
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
                setWords(fetched.data);
                setLoadedData2(true);
            } catch (error) {
                console.error('Failed to fetch learnt words:', error);
            }
        };
        if (!loadedData2) {
            getLearntWords();
        }
    }, [loadedData2]);

    const accomplishedLevel = words.length / 10


    return (
        <>
            <div className="rulesDesign">
                {loadedData1 && loadedData2 && (
                    <div className="box">
                        <div className="border" onClick={() => showComments()}>
                            {isShowComments && (
                                <div className="showComments" onClick={() => showComments()}>
                                    All your STATS in one page!
                                </div>
                            )}

                            {/* <span className="cButtonDesign2">1</span> */}
                            <h4>Accomplished levels ({accomplishedLevel} out of 5): </h4>

                            <div>
                                {levels.slice(0, accomplishedLevel).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </div>

                            {/* <span className="cButtonDesign2">2</span> */}
                            <h4>List of the <big>{words.length}</big> words you've learnt so far:</h4>
                            <div className="boxWords">

                                {words.map((item, index) => (
                                    // Assuming item is an object with properties JP and romanji
                                    <p key={index}>{item.word.JP} - {item.word.EN} - {item.word.romanji}</p>
                                ))}
                            </div>
                            <p>⇕ scroll ⇕</p>

                        </div>
                    </div>
                )}
            </div>
        </>
    );

};