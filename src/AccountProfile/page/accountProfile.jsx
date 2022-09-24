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
import { FaAngleRight } from "react-icons/fa";
const AccountProfile = () => {
    const navigate = useNavigate();
    const [visibleModal, setVisibleModal] = useState(false);
    const [info, setInfo] = useState([]);
    const [visible, setVisible] = useState(false);
    const [otpID, setOtpID] = useState('');

    const getData = async () => {
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
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Account" />
                        <div
                            className="d-flex shadow w-100 m-auto align-items-center basic_profile px-3 mt-3"
                            onClick={() => navigate(PATH.PROFILEIDCARD_PATH)}
                        >
                            <img
                                src="https://res.cloudinary.com/da0i1amaa/image/upload/v1657787531/Untisastled-1_tusjce.png"
                                width="36px"
                                height="36px"
                                className="me-2"
                                alt=""
                            ></img>
                            <div className="profile ms-2 my-2 p-2">
                                <h5 className="fw-bold mb-0 text-uppercase">
                                    Id card{" "}
                                </h5>
                                {/* <div className={`${!info?.identification && info?.identification?.img_front && info?.identification?.img_back ? 'profile_Uncompleted' : 'profile_completed'} text-light`}> */}
                                {/* </div> */}
                            </div>
                            <FaAngleRight />
                        </div>
                        <div
                            className="d-flex shadow w-100 m-auto align-items-center basic_profile px-3 mt-3"
                            onClick={() => navigate(PATH.PROFILEFACEBOOK_PATH)}
                        >
                            <div className="profile ms-2 my-2">
                                <h5 className="fw-bold mb-0 text-uppercase">
                                    Declaration facebook{" "}<span className="required_field">*</span>
                                </h5>
                                <p className="mb-0">Please enter the correct facebook account</p>
                            </div>
                            <div className=''>
                                <FaAngleRight />
                            </div>
                        </div>
                        <div className="m-auto shadow align-items-center account_info px-3 mt-3">
                            <div className="fw-bold fs-5 pt-3 ps-3">Basic profile</div>
                            <div className="py-3">
                                {info.user !== undefined &&
                                    <>
                                        <div className="d-flex col-lg-12 ms-5">
                                            <div className="col-lg-6 text-start">
                                                <div className="fw-bold" >Full Name:</div>
                                                <p className="user_field pb-3 ps-2">{info.user.first_name} {info.user.last_name}</p>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="fw-bold" >Address:</div>
                                                <div className="d-flex">
                                                    <p className="user_field pb-3 ps-2 col-8">{info?.user?.identification?.address || '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex col-lg-12 ms-5">
                                            <div className="col-lg-6 text-start">
                                                <div className="fw-bold">Day of birth:</div>
                                                <p className="user_field pb-3 ps-2">{info?.user?.identification?.birth || '-'}</p>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="fw-bold">Phone:</div>
                                                <div className="d-flex"><p className="user_field pb-3 ps-2 col-8">{info.user.phone_number || '-'}
                                                </p>

                                                    <div className="edit_infor" onClick={() => {
                                                        setVisibleModal(true);
                                                    }}>
                                                        <img className="" src="https://res.cloudinary.com/da0i1amaa/image/upload/v1663642990/299595195_1138539526870889_1605252907453023341_n_renb7i.png"
                                                            width="24px" height='24px' alt=""></img>
                                                        <PhoneNumberEdit
                                                            visibleModal={visibleModal}
                                                            setVisibleModal={setVisibleModal}
                                                            info={info}
                                                            setVisible={setVisible}
                                                            setOtpID={setOtpID}
                                                        />
                                                        <VerifyPhoneNumber visible={visible} setVisible={setVisible} otpID={otpID} setOtpID={setOtpID} setVisibleModal={setVisibleModal} getData={getData} />
                                                    </div>
                                                </div>

                                            </div>
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
