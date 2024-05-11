
import "./AddNewLevel.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { AddLevel, GetLevels } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/functions";
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import icons

export const AddNewLevel = () => {
    const rdxUserData = useSelector(userData);
    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const [loadedData, setLoadedData] = useState(false)
    const navigate = useNavigate();
    const [level, setLevel] = useState({
        name: "",
    })
    const [levels, setLevels] = useState([])
    const [levelError, setLevelError] = useState({
        nameError: "",
    })

    const inputHandlerLevel = (e) => {
        //binding...
        setLevel((prevState) => ({
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

    useEffect(() => {
        const getLevel = async () => {
            try {
                const fetched = await GetLevels(tokenStorage);
                setLevels(fetched.data);
                setLoadedData(true);
            } catch (error) {
                console.error('Failed to fetch levels:', error);
            }
        };
        if (!loadedData) {
            getLevel();
        }
    }, [loadedData]);

    const createNewLevel = () => {
        try {
            AddLevel(tokenStorage, level);
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="newDataDesign">
            {rdxUserData.credentials?.token ? (
                <div className="">
                    <h4 className="">LEVELS:</h4>
                    <div className="boxLevels">
                        {Object.entries(levels).map(([key, value]) => (
                            <p key={key}>
                                {/* <FaEdit className="icon" onClick={() => editLevel(tokenStorage, value.id)} /> */}
                                &nbsp;&nbsp;
                                <FaTrash className="icon" onClick={() => deleteLevel(tokenStorage, value.id)} />
                                &nbsp;&nbsp;&nbsp;
                                {value}
                            </p>
                        ))}


                    </div>


                    <br />
                    <div className="addLevel">
                        <CInput
                            className={`inputDesign ${levelError.nameError !== "" ? "inputDesignError" : ""}`}
                            type={"text"}
                            placeholder={"level title"}
                            name={"name"}
                            value={level.name || ""}
                            onChangeFunction={(e) => inputHandlerLevel(e)}
                            onBlurFunction={(e) => checkErrorLevel(e)}
                        />
                        <CButton
                            className={"cButtonGreen cButtonDesign"}
                            title={<span className="blacktext">New <br />Level</span>}
                            functionEmit={createNewLevel}
                        />
                    </div>
                </div>
            ) : (
                <div className="newDataDesign">
                    <div className="circle"><span className="text">TAPS</span></div>
                </div>
            )}
        </div >
    );
};
