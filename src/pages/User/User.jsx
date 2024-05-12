
import { useNavigate } from "react-router-dom";
import { GetLevels, GetUsers } from "../../services/apiCalls";
import "./User.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import icons
import dayjs from "dayjs";


export const User = () => {
    // Redux reading mode
    const rdxUserData = useSelector(userData);
    // Redux writing mode
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenStorage, setTokenStorage] = useState(rdxUserData.credentials.token);
    const [isShowComments, setIsShowComments] = useState(false)
    const [levels, setLevels] = useState(false)
    const [users, setUsers] = useState(false)
    const [loadedData1, setLoadedData1] = useState(false)
    const [loadedData2, setLoadedData2] = useState(false)

    const showComments = () => {
        setIsShowComments(!isShowComments)
    }


    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetched = await GetUsers(tokenStorage);
                setUsers(fetched.data);
                setLoadedData1(true);
            } catch (error) {
                console.error('Failed to fetch levels:', error);
            }
        };
        if (!loadedData1) {
            getUsers();
        }
    }, [loadedData1]);

    const deleteProfile = async () => {
        const role = rdxUserData.credentials.decoded.roleName;
        try {
            if (role == 'admin') {
                alert('Admin profile cannot be deleted')
                navigate('/profile/me');
            } else {
                await DeleteProfile(tokenStorage);
                console.log("Profile deleted");

                logOut();
            }


        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="userDesign">
                {loadedData1 && (
                    <div className="box">
                        <div className="outTable">

                            {/* <span className="cButtonDesign2">1</span> */}
                            <h4>Total of {users.length}: </h4>
                            <table>
                                <thead className="fixedHead">
                                    <tr className="rowTable bg">
                                        <div className="moving rowTable">
                                            <th className="a">Index</th>
                                            <th className="a"></th>
                                            <th className="a">User Id</th>
                                            <th className="b">USERNAME</th>
                                            <th className="b">EMAIL</th>
                                            <th className="b">Created At</th>
                                            <th className="b">Updated At</th>
                                        </div>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(users).map(([key, value]) => (
                                        <div>
                                            <tr className="rowTable" key={key}>
                                                <div className="moving rowTable2">
                                                    <td className="a">{key}</td>
                                                    <td className="a">
                                                        {value.role.name != 'admin' ?
                                                            <FaTrash className="icon" onClick={() => deleteUser(tokenStorage, value.id)} /> : null}
                                                    </td>
                                                    <td className="a">{value.id}</td>
                                                    <td className="b">{value.username}</td>
                                                    <td className="cb">{value.email}</td>
                                                    <td className="b">{dayjs(value.createdAt).format("DD-MM-YYYY")}</td>
                                                    <td className="b">{dayjs(value.updatedAt).format("DD-MM-YYYY")}</td>

                                                </div>
                                            </tr>
                                            <hr />

                                        </div>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p>⇕ scroll ⇕</p>
                    </div>
                )}
            </div>
        </>
    );

};