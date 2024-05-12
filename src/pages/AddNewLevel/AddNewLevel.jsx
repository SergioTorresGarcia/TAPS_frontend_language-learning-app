
import "./AddNewLevel.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { AddLevel, DeleteLevel, GetLevels } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/functions";
import { FaTrash } from 'react-icons/fa'; // Import icons

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
                setLevels(fetched);
                setLoadedData(true);
            } catch (error) {
                console.error('Failed to fetch levels:', error);
            }
        };
        if (!loadedData) {
            getLevel();
        }
    }, [loadedData]);

    const createNewLevel = async () => {
        try {
            await AddLevel(tokenStorage, level);
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    };

    const deleteLevel = async (tokenStorage, id) => {
        try {
            await DeleteLevel(tokenStorage, id);
            const updatedLevels = levels.filter(level => level.id !== id);

            setLevels(updatedLevels);
            console.log("Level deleted in DB");

        } catch (error) {
            throw new Error('Failed to delete level: ', error.message);
        }
    };

    return (
        <div className="newDataDesign">
            {rdxUserData?.credentials?.token ? (
                <div className="">
                    <h4 className="">LEVELS:</h4>
                    {loadedData &&
                        (<div className="boxLevels">
                            {levels.map((level) => (
                                <p key={level.id}>
                                    {/* <FaEdit className="icon" onClick={() => editLevel(tokenStorage, value.id)} /> */}
                                    &nbsp;&nbsp;
                                    <FaTrash className="icon" onClick={() => deleteLevel(tokenStorage, level.id)} />
                                    &nbsp;&nbsp;&nbsp;
                                    {level.name}
                                </p>
                            ))}
                        </div>)}
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
