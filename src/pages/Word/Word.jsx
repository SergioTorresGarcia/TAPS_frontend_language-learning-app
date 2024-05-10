
import "./Word.css";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { DeleteWord, GetWords } from "../../services/apiCalls";
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import icons
import dayjs from "dayjs";

export const Word = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Redux writing mode
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [radio, setRadio] = useState('table');

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




    const deleteWord = async (tokenStorage, id) => {
        try {
            await DeleteWord(tokenStorage, id);
            const updatedWords = words.filter(word => word.id !== id);
            setWords(updatedWords);
            console.log("Word deleted");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="wordDesign">
                <div className="radioBtn">
                    <label>
                        <input
                            type="radio"
                            value="table"
                            checked={radio === 'table'}
                            onChange={() => setRadio('table')}
                        />
                        Table View
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="list"
                            checked={radio === 'list'}
                            onChange={() => setRadio('list')}
                        />
                        List View
                    </label>
                </div>
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData && (
                            <>
                                {radio == 'list'
                                    ? (Object.entries(words).map(([key, value]) => (
                                        <div className="borderAdmin" key={key}>
                                            <br />
                                            <img className="img text" src={`../../src/assets/${value.image.slice(2)}`} alt="" />
                                            <h3 className="text2">{value.JP}</h3>
                                            <h5 className="white">'{value.romanji}'</h5>
                                            <h4 className="text2">{value.EN}</h4>

                                            <div className="text2">[ Level: {value.levelId} ]</div>
                                            <br />
                                        </div>
                                    )))
                                    : (
                                        <div className="outTable">
                                            <table>
                                                <thead className="fixedHead">
                                                    <tr className="rowTable bg">
                                                        <div className="moving rowTable">
                                                            <th className="a">ID</th>
                                                            <th className="b">EN</th>
                                                            <th className="c">JP</th>
                                                            <th className="d">Romanji</th>
                                                            <th className="e">Image</th>
                                                            <th className="f">Created At</th>
                                                            <th className="g">Updated At</th>
                                                        </div>
                                                        <div className="fixed">
                                                            <th className="h">ACTIONS</th>
                                                        </div>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(words).map(([key, value]) => (
                                                        <div>
                                                            <tr className="rowTable" key={key}>
                                                                <div className="moving rowTable2">
                                                                    <td className="a">{value.id}</td>
                                                                    <td className="b">{value.EN}</td>
                                                                    <td className="c">{value.JP}</td>
                                                                    <td className="d">{value.romanji}</td>
                                                                    <td className="e">{value.image}</td>
                                                                    <td className="f">{dayjs(value.createdAt).format("ddd DD-MM-YYYY")}</td>
                                                                    <td className="g">{dayjs(value.updatedAt).format("ddd DD-MM-YYYY")}</td>
                                                                </div>
                                                                <div className="fixed">
                                                                    <td className="h">
                                                                        <FaEdit className="icon" onClick={() => navigate('/admin/words/update')} /><br />
                                                                        <FaTrash className="icon" onClick={() => deleteWord(tokenStorage, value.id)} />
                                                                    </td>
                                                                </div>
                                                            </tr>
                                                            <hr />

                                                        </div>

                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                }
                            </>
                        )};
                    </>
                ) : (
                    <div className="wordDesign">
                        <div className="circle"><span className="text">TAPS</span></div>
                    </div>)
                };
            </div >
        </>
    );
};

