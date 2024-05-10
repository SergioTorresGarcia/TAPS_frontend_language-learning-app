
import "./Word.css";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { GetWords } from "../../services/apiCalls";


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

    return (
        <>
            <div className="wordDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData && (
                            <div>
                                <>
                                    <br />
                                    <div>
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
                                    <br />
                                    {radio == 'list'
                                        ? (Object.entries(words).map(([key, value]) => (
                                            <div className="borderAdmin" key={key}>
                                                <br />
                                                <img className="img text" src={`../../src/assets/${value.image.slice(2)}`} alt="" />
                                                <h3 className="text2">{value.JP}</h3>
                                                <h5 className="white">'{value.romanji}'</h5>
                                                <h4 className="text2">{value.EN}</h4>

                                                <div className="text2">[ Level: {value.levelId} | Challenge: {value.challengeId} ]</div>
                                                <br />
                                            </div>
                                        )))
                                        : (
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>EN</th>
                                                        <th>JP</th>
                                                        <th>Romanji</th>
                                                        <th>Image</th>
                                                        <th>Created At</th>
                                                        <th>Updated At</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(words).map(([key, value]) => (
                                                        <tr className="" key={key}>
                                                            <td>{value.id}</td>
                                                            <td>{value.EN}</td>
                                                            <td>{value.JP}</td>
                                                            <td>{value.romanji}</td>
                                                            <td>{value.image}</td>
                                                            <td>{value.createdAt}</td>
                                                            <td>{value.updatedAt}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )
                                    }
                                </>
                            </div >
                        )};
                    </>
                ) : (
                    <div className="wordDesign">
                        <div className="circle"><span className="text">TAPS</span></div>
                    </div>)};
            </div>
        </>
    );
};

