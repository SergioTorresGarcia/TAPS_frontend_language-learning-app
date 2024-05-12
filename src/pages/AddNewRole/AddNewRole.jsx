
import "./AddNewRole.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { AddLevel, AddRole, DeleteRole, GetLevels, GetRoles, UpdateRole } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/functions";
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import icons


export const AddNewRole = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const [loadedData, setLoadedData] = useState(false)
    const navigate = useNavigate();

    const [role, setRole] = useState({
        name: "",
    })
    const [roles, setRoles] = useState([])
    const [roleError, setRoleError] = useState({
        nameError: "",
    })

    const inputHandlerRole = (e) => {
        //binding...
        setRole((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const checkErrorRole = (e) => {
        const error = validame(e.target.name, e.target.value);

        setRoleError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };


    useEffect(() => {
        const getRoles = async () => {
            try {
                const fetched = await GetRoles(tokenStorage);
                setRoles(fetched.data);
                setLoadedData(true);
            } catch (error) {
                console.error('Failed to fetch roles:', error);
            }
        };
        if (!loadedData) {
            getRoles();
        }
    }, [loadedData]);


    const createNewRole = () => {
        try {
            AddRole(tokenStorage, role);
            console.log("New role created in DB");
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    };

    const deleteRole = async (tokenStorage, id) => {
        try {
            await DeleteRole(tokenStorage, id);
            const updatedRoles = roles.filter(role => role.id !== id);

            setRoles(updatedRoles);
            console.log("Role deleted in DB");

        } catch (error) {
            throw new Error('Failed to delete role: ', error.message);
        }
    };



    return (
        <>
            <div className="roleDesign">
                {rdxUserData.credentials?.token ? (
                    <>
                        {loadedData && (
                            <div className="">
                                <h4 className="">ROLES:</h4>
                                <div className="boxRoles">
                                    {Object.entries(roles).map(([key, value]) => (
                                        <div className="window" key={key}>

                                            {/* <FaEdit className="icon" onClick={() => editRole(tokenStorage, value.id)} /> */}

                                            <span>id: {value.id}&nbsp;</span>

                                            <CInput
                                                className={`inputDesign ${roleError.nameError !== "" ? "inputDesignError" : ""}`}
                                                type={"text"}
                                                placeholder={"Role name"}
                                                name={"name"}
                                                value={value.name || ""}
                                                onChangeFunction={(e) => inputHandlerRole(e)}
                                                onBlurFunction={(e) => checkErrorRole(e)}
                                            />
                                            <span>&nbsp;&nbsp;</span>
                                            {value.name != 'admin' ?
                                                <FaTrash className="icon" onClick={() => deleteRole(tokenStorage, value.id)} /> : null}
                                        </div>)
                                    )}
                                </div>


                                <br />
                                <div className="addRole">
                                    <CInput
                                        className={`inputDesign ${roleError.nameError !== "" ? "inputDesignError" : ""}`}
                                        type={"text"}
                                        placeholder={"Role name"}
                                        name={"name"}
                                        value={role.name || ""}
                                        onChangeFunction={(e) => inputHandlerRole(e)}
                                        onBlurFunction={(e) => checkErrorRole(e)}
                                    />
                                    <CButton
                                        className={"cButtonGreen cButtonDesign"}
                                        title={<span className="blacktext">New <br />Role</span>}
                                        functionEmit={createNewRole}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="roleDesign">
                        <div className="circle"><span className="text">TAPS</span></div>
                    </div>
                )}
            </div >
        </>
    );
};
