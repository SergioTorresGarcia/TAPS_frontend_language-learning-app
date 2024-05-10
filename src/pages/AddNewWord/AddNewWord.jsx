
import "./AddNewWord.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { AddWord } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/functions";


export const AddNewWord = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const navigate = useNavigate();
    const [word, setWord] = useState({
        EN: "",
        JP: "",
        romanji: "",
        image: "",
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


    const createNewWord = () => {
        try {
            for (let element in word) {
                if (word[element] === "") {
                    throw new Error("All fields are required");
                }
            }

            AddWord(tokenStorage, word);
            console.log("New word created in DB");
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    };


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
                                value={word.level_id || ""}
                                onChangeFunction={(e) => inputHandlerWord(e)}
                            />
                            <CInput
                                className={"inputDesign"}
                                type={"number"}
                                placeholder={"challenge id"}
                                name={"challenge_id"}
                                value={word.challenge_id || ""}
                                onChangeFunction={(e) => inputHandlerWord(e)}
                            />
                            <CButton
                                className={"cButtonGreen cButtonDesign"}
                                title={<span className="blacktext">New <br />Word</span>}
                                functionEmit={createNewWord}
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
