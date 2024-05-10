
import "./Admin.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { AddLevel, AddWord, GetWords } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/functions";


export const Admin = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Redux writing mode
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const [words, setWords] = useState([]);
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
    const [level, setLevel] = useState({
        name: "",
    })
    const [levelError, setLevelError] = useState({
        nameError: "",
    })
    const [loadedData, setLoadedData] = useState(false);
    const [loadedLevel, setLoadedLevel] = useState(false);
    const [loadedWord, setLoadedWord] = useState(false);


    const inputHandlerLevel = (e) => {
        //binding...
        setLevel((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const inputHandlerWord = (e) => {
        //binding...
        setWord((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkErrorLevel = (e) => {
        const error = validame(e.target.name, e.target.value);

        setLevelError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };
    const checkErrorWord = (e) => {
        const error = validame(e.target.name, e.target.value);

        setLevelError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    // useEffect(() => {
    //     const getAllWords = async () => {
    //         try {
    //             const fetched = await GetWords(tokenStorage);
    //             setWords(fetched.data);
    //             setLoadedData(true);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     if (!loadedData) {
    //         getAllWords();
    //     }
    // }, [loadedData]); // Call getAllWords only when loadedData changes


    // const createLevel = async () => {
    //     await AddLevel(tokenStorage);
    // }



    // const createNewWord = async () => {
    //     try {
    //         for (let element in word) {
    //             if (word[element] === "") {
    //                 throw new Error("All fields are required");
    //             }
    //         }

    //         await AddWord(tokenStorage, word);
    //         console.log("New word created in DB");
    //         // navigate('/admin');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };



    return (
        <>
            <div className="adminDesign">


                {rdxUserData.credentials?.token ? (
                    <>

                        {/* 
                        BOTON CON ROLES
                        BOTON CREAR ROLE
                        BOTON CAMBIAR ROLE (hacer admin)

                        BOTON CON USUARIOS (poder borrar)

                        BOTON CON NIVELES (poder editar/borrar)
                        BOTON CREAR NIVEL

                        BOTON CON PALABRAS CARDS
                        BOTON CON PALABRAS TABLA */}






                    </>
                ) : (
                    <div></div>
                    //     <div className="wordDesign">
                    //         <div className="circle"><span className="text">TAPS</span></div>
                    //     </div>
                )}
            </div >
        </>
    );
};
