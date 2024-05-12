
import "./UpdateWord.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/functions";
import { GetWordById, UpdateAWord } from "../../services/apiCalls";


export const UpdateWord = (id) => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const navigate = useNavigate();
    const [loadedData, setLoadedData] = useState(false);

    const [word, setWord] = useState({
        EN: "",
        JP: "",
        romanji: "",
        image: "",
        levelId: ""
    });
    const [wordError, setWordError] = useState({
        ENError: "",
        JPError: "",
        romanjiError: "",
        imageError: "",
    });


    const inputHandlerWord = (e) => {
        //binding...
        setWord((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkErrorWord = (e) => {
        const error = validame(e.target.name, e.target.value);

        setWordError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };


    useEffect(() => {
        const getWordToUpdate = async (id) => {
            try {
                const fetched = await GetWordById(tokenStorage, id);
                console.log(fetched);

                setWord({
                    EN: fetched.data.EN,
                    JP: fetched.data.JP,
                    romanji: fetched.data.romanji,
                    image: fetched.data.image,
                    levelId: fetched.data.levelId
                })
                setLoadedData(true);

                // setWrite("disabled")
            } catch (error) {
                console.log(error);
            }
        };
        if (!loadedData) {
            getWordToUpdate();
        }
    }, [word]);

    const updateWord = async (id) => {
        const wordData = {
            EN: word.EN,
            JP: word.JP,
            romanji: word.romanji,
            image: word.image,
            levelId: word.levelId
        };
        try {

            const updatedWord = await UpdateAWord(tokenStorage, id, wordData);


            setWord(updatedWord)
            setWrite("disabled")
        } catch (error) {
            console.log(error);
        }
    };

    // const updateWord = async (id, updatedData) => {
    //     try {
    //         const updatedWord = await UpdateAWord(tokenStorage, id, updatedData);
    //         console.log(updatedWord);

    //         // setWord({
    //         //     EN: fetched.EN,
    //         //     JP: fetched.word.JP,
    //         //     romanji: fetched.data.romanji,
    //         //     image: fetched.data.word.image,
    //         //     levelId: fetched.data.word.levelId
    //         // })
    //         setWord(prevWords =>
    //             prevWords.map(word =>
    //                 word.id === id ? updatedWord : word
    //             ))

    //         setWrite("disabled")
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };



    return (
        <>
            <div className="newDataDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        <div className="addWord">
                            <CInput
                                className={`inputDesign ${wordError.ENError !== "" ? "inputDesignError" : ""}`}
                                type={"text"}
                                placeholder={"english word"}
                                name={"EN"}
                                // disabled={write}
                                value={word.EN || ""}
                                onChangeFunction={(e) => inputHandlerWord(e)}
                                onBlurFunction={(e) => checkErrorWord(e)}
                            />
                            <CInput
                                className={`inputDesign ${wordError.JPError !== "" ? "inputDesignError" : ""}`}
                                type={"text"}
                                placeholder={"japanese word"}
                                name={"JP"}
                                value={word.JP || ""}
                                onChangeFunction={(e) => inputHandlerWord(e)}
                                onBlurFunction={(e) => checkErrorWord(e)}
                            />
                            <CInput
                                className={`inputDesign ${wordError.romanjiError !== "" ? "inputDesignError" : ""}`}
                                type={"text"}
                                placeholder={"romanji writing"}
                                name={"romanji"}
                                value={word.romanji || ""}
                                onChangeFunction={(e) => inputHandlerWord(e)}
                                onBlurFunction={(e) => checkErrorWord(e)}
                            />
                            <CInput
                                className={`inputDesign ${wordError.imageError !== "" ? "inputDesignError" : ""}`}
                                type={"text"}
                                placeholder={"image url"}
                                name={"image"}
                                value={word.image || ""}
                                onChangeFunction={(e) => inputHandlerWord(e)}
                                onBlurFunction={(e) => checkErrorWord(e)}
                            />
                            <CInput
                                className={"inputDesign"}
                                type={"number"}
                                placeholder={"level id"}
                                name={"level_id"}
                                value={word.levelId || ""}
                                onChangeFunction={(e) => inputHandlerWord(e)}
                            />

                            <CButton
                                className={"cButtonGreen cButtonDesign"}
                                title={<span className="blacktext">Edit</span>}
                                functionEmit={() => updateWord(word.id)}
                            />
                            <div className="error">{wordError.nameError}</div>
                        </div>
                    </>
                ) : (
                    <div className="newDataDesign">
                        <div className="circle"><span className="text">TAPS</span></div>
                    </div>
                )}
            </div >
        </>
    );
};
