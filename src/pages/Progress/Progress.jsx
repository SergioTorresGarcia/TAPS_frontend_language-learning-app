
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
                setLevels(fetched.data);

                // .map(item => item.name)
                setLoadedData1(true);
            } catch (error) {
                console.error('Failed to fetch levels:', error);
            }
        };
        if (!loadedData1) {
            getLevel();
        }
    }, [loadedData1]);
    console.log(levels);
    useEffect(() => {

        const getLearntWords = async () => {
            try {
                const fetched = await GetWordsLearnt(tokenStorage);
                setWords(fetched);
                setLoadedData2(true);
            } catch (error) {
                console.error('Failed to fetch learnt words:', error);
            }
        };
        if (!loadedData2) {
            getLearntWords();
        }
    }, [loadedData2]);

    const accomplishedLevel = (words.length / 10)
    console.log(levels);
    console.log(words);
    console.log(accomplishedLevel);

    return (
        <>
            <div className="rulesDesign">
                {loadedData1 && loadedData2 && (
                    <div className="box">
                        <div className="border" onClick={() => showComments()}>
                            <div className="boxWords2">
                                {/* Render levels */}
                                {(() => {
                                    let message;
                                    switch (true) {
                                        case words.length < 10:
                                            message = <h4>You are learning <br /><em><big>{levels[0].name}</big></em><br /> japanese</h4>;
                                            break;
                                        case words.length < 20:
                                            message = <h4>You've accomplished <br /><em><big>{levels[0].name}</big></em><br /> and are at {levels[1].name}</h4>;
                                            break;
                                        case words.length < 30:
                                            message = <h4>You've accomplished <br /><em><big>{levels[1].name}</big></em><br /> and are at {levels[2].name}</h4>;
                                            break;
                                        case words.length < 40:
                                            message = <h4>You've accomplished <br /><em><big>{levels[2].name}</big></em><br /> and are at {levels[3].name}</h4>;
                                            break;
                                        default:
                                            message = <h4>You've accomplished <br /><em><big>{levels[3].name}</big></em><br /> and are at the last {levels[4].name}</h4>;
                                            break;
                                    }
                                    return message;
                                })()}
                            </div>
                            <br />
                            <h4>List of the <big>{words.length}</big> words you've learnt so far:</h4>
                            <div className="boxWords2">
                                {/* Render words */}
                                {words.map((item, index) => (
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

    // return (
    //     <>
    //         <div className="rulesDesign">
    //             {/* {loadedData1 && loadedData2 && ( */}
    //             <div className="box">
    //                 <div className="border" onClick={() => showComments()}>
    //                     {isShowComments && (
    //                         <div className="showComments" onClick={() => showComments()}>
    //                             All your STATS in one page!
    //                         </div>
    //                     )}

    //                     {/* <span className="cButtonDesign2">1</span> */}
    //                     {/* <h4>Accomplished levels ({accomplishedLevel} out of 5): </h4> */}
    //                     {/* .slice(0, accomplishedLevel) */}
    //                     <div>
    //                         {levels && levels.map((item, index) => (
    //                             <p key={index}>{item}</p>
    //                         ))}
    //                     </div>

    //                     {/* <span className="cButtonDesign2">2</span> */}
    //                     <h4>List of the <big>{words.length}</big> words you've learnt so far:</h4>
    //                     <div className="boxWords">

    //                         {/* {words.map((item, index) => (
    //                             // Assuming item is an object with properties JP and romanji
    //                             <p key={index}>{item.word.JP} - {item.word.EN} - {item.word.romanji}</p>
    //                         ))} */}
    //                     </div>
    //                     <p>⇕ scroll ⇕</p>

    //                 </div>
    //             </div>
    //             {/* )} */}
    //         </div>
    //     </>
    // );

};