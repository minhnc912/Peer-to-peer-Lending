import {
    AiOutlineInfoCircle,
    AiOutlineMessage,
    AiOutlineHistory,
    AiOutlineUser,
    AiOutlineHome,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { GrCertificate } from "react-icons/gr";
import { BiLogOutCircle } from "react-icons/bi";
import { PATH } from "../../helper/constant";
import { getAuth, signOut } from "firebase/auth";
import { Cookies } from "react-cookie";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../src/login/fire";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { axiosService } from "../../axiosService";
const SideBar = () => {
    const navi = useNavigate();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const cookie = new Cookies();
    const [info, setInfo] = useState([]);
    const logout = () => {
        signOut(auth);
        cookie.remove("token");
        localStorage.clear();
        navi("/");
    };
    const getData = async () => {
        const id = cookie.get('userID')
        await axiosService.get(`/user/get_detail`).then((res) => {
            if (res.data) {
                const rs = res.data;
                setInfo(rs);
            }
        }).catch(err => {
            Modal.error({
                title: err.response.data,
                maskClosable: true,
            })
        })
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="col-auto col-md-3 col-xl-3 px-sm-2 px-0 bg-white rounded-start-20 shadow">
            <div className="d-flex flex-column align-items-center align-items-sm-start ms-3 px-3 pt-2 text-dark min-vh-100 ">
                <Link
                    to={PATH.LENDSERVICE_PATH}
                    className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
                >
                    <img
                        src={localStorage.getItem("photoURL")}
                        width="64px"
                        height="64px"
                        className="rounded-circle"
                        alt="Userimage"
                    ></img>
                    <div className="d-flex flex-column">
                        <span className="fs-6 d-none fw-bold text-dark d-sm-flex flex-column ms-2">
                            {localStorage.getItem("username")}
                        </span>
                        {info.user !== undefined &&
                        <span className="fs-6 d-none text-dark d-sm-flex flex-column ms-2">
                            {info.user.phone_number || '-'}
                        </span>
                        }
                    </div>
                </Link>
                <ul
                    className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start sidebar"
                    id="menu"
                >
                    <li className="nav-item">
                        <Link
                            to={PATH.LENDSERVICE_PATH}
                            className="nav-link text-dark align-middle px-0"
                        >
                            <AiOutlineHome className="mb-1" />
                            <span className="ms-1 d-none d-sm-inline">
                                Home
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={PATH.ACCOUNT_PATH}
                            className="nav-link text-dark align-middle px-0"
                        >
                            <AiOutlineUser className="mb-1" />
                            <span className="ms-1 d-none d-sm-inline">
                                Account
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={PATH.ACCOUNTHISTORY_PATH}
                            className="nav-link text-dark align-middle px-0"
                        >
                            <AiOutlineHistory className="mb-1" />
                            <span className="ms-1 d-none d-sm-inline">
                                Account history
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={PATH.TUTORIAL_PATH}
                            className="nav-link text-dark align-middle px-0"
                        >
                            <AiOutlineInfoCircle className="mb-1" />
                            <span className="ms-1 d-none d-sm-inline">
                                Tutorial
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={PATH.CONTACT_PATH}
                            className="nav-link text-dark align-middle px-0"
                        >
                            <AiOutlineMessage className="mb-1" />
                            <span className="ms-1 d-none d-sm-inline">
                                Contact
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={PATH.POLICY_PATH}
                            className="nav-link text-dark align-middle px-0"
                        >
                            <GrCertificate className="mb-1" />
                            <span className="ms-1 d-none d-sm-inline">
                                Terms, Policy
                            </span>
                        </Link>
                    </li>
                    <li
                        className="nav-item"
                        onClick={() => logout()}
                        style={{ cursor: "pointer" }}
                    >
                        <div
                            to="#"
                            className="nav-link text-dark align-middle px-0"
                        >
                            <BiLogOutCircle className="mb-1" />
                            <span className="ms-1 d-none d-sm-inline">
                                Log out
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
