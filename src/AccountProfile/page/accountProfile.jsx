import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";
import "../styleComponent/accountProfile.css";
import { PATH } from "../../helper/constant";
import PhoneNumberEdit from "../components/phoneNumberEdit";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
import { Modal } from "antd";
import VerifyPhoneNumber from "../components/verifyPhoneNumber";
const AccountProfile = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [visibleModal, setVisibleModal] = useState(false);
    const [info, setInfo] = useState([]);
    const [visible, setVisible] = useState(false);
    const [count_completed, setCount_completed] = useState(0);
    const [otpID, setOtpID] = useState('');

    const getData = async () => {
        const id = cookies.get('userID')
        await axiosService.get(`/user/get_detail`).then((res) => {
            if (res.data) {
                const rs = res.data;
                setInfo(rs);
                count(rs);
            }
        }).catch(err => {
            Modal.error({
                title: err.response.data,
                maskClosable: true,
            })
        })
    }

    const count = (rs) => {
        let count = 0;
        if (rs.user.first_name && rs.user.last_name) {
            count++;
        }
        if (rs.user.birth) {
            count++;
        }
        if (rs.user.phone_number) {
            count++;
        }
        if (rs.user.adress) {
            count++;
        }
        if (rs.user.account_informations[0].card_id) {
            count++;
        }
        setCount_completed(count)
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Account" />
                        <div
                            className="d-flex shadow w-100 m-auto align-items-center basic_profile px-3 mt-3"
                            onClick={() => navigate(PATH.PROFILEDETAIL_PATH)}
                        >
                            <img
                                src="https://res.cloudinary.com/da0i1amaa/image/upload/v1657787531/Untisastled-1_tusjce.png"
                                width="36px"
                                height="36px"
                                className="me-2"
                                alt=""
                            ></img>
                            <div className="profile ms-2 my-2">
                                <h5 className="fw-bold mb-0 ">
                                    Basic Profile{" "}
                                </h5>
                                <p className="mb-0">{count_completed < 5 ? 'UnCompleted' : 'Completed'}</p>
                            </div>
                            <div className={`${count_completed < 5 ? 'profile_Uncompleted' : 'profile_completed'} text-light`}>
                                {count_completed}/5
                            </div>
                        </div>
                        <div className="m-auto shadow align-items-center account_info px-3 mt-3">
                            <div className="fw-bold fs-5 pt-3 ps-3">User detail</div>
                            {info.user !== undefined &&
                                <>
                                    <span
                                        className="btn_update_profile ps-3"
                                        onClick={() => {
                                            setVisibleModal(true);
                                        }}
                                    >
                                        Update Profile
                                        <PhoneNumberEdit
                                            visibleModal={visibleModal}
                                            setVisibleModal={setVisibleModal}
                                            info={info}
                                            setVisible={setVisible}
                                            setOtpID={setOtpID}
                                        />
                                        <VerifyPhoneNumber visible={visible} setVisible={setVisible} otpID={otpID} setOtpID={setOtpID} setVisibleModal={setVisibleModal} getData={getData} />

                                    </span>
                                </>}
                            <div className="py-3">
                                {info.user !== undefined &&
                                    <>
                                        <div className="d-flex col-lg-12 ms-3">
                                            <div className="col-lg-6 text-start">
                                                <div className="fw-bold" >Full Name:</div>
                                                <p className="user_field ps-2">{info.user.first_name} {info.user.last_name}</p>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="fw-bold" >Address:</div>
                                                <p className="user_field ps-2">{info.user.adress || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex col-lg-12 ms-3">
                                            <div className="col-lg-6 text-start">
                                                <div className="fw-bold">Day of birth:</div>
                                                <p className="user_field ps-2">{info.user.birth || '-'}</p>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="fw-bold">ID Card:</div>
                                                <p className="user_field ps-2">{info.user.account_informations[0].card_id || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="ms-3">
                                            <div className="fw-bold">Phone:</div>
                                            <p className="user_field ps-2">{info.user.phone_number || '-'}
                                            </p>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountProfile;
