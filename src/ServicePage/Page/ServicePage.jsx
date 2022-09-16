import React, { useState, useEffect } from "react";
import "../styleComponent/ServicePage.css";
import "antd/dist/antd.css";
import SideBar from "../../components/sideBar/sideBar";
import SelectRole from "../container/selectRole";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { PATH } from "../../helper/constant";
import { currency } from "../../ulti/ultil";
import { Cookies } from "react-cookie";
import { Carousel, Modal } from "antd";
import { axiosService } from "../../axiosService";
import HeaderTitle from "../../UserLimit/container/header-title_userlimit";
const InvestorHomePage = () => {
    const { type } = useParams();
    const cookies = new Cookies();
    const navi = useNavigate();
    const [roles, setRoles] = useState(type ? type : "investor");
    const [showMoney, setShowMoney] = useState(false);
    const [info, setInfo] = useState(0);
    const getData = () => {
        const id = cookies.get("userID");
        axiosService
            .get(`/user/get_detail`)
            .then((res) => {
                if (res.data) {
                    const rs = res.data;
                    setInfo(rs);
                }
            })
            .catch((err) => {
                Modal.error({
                    title: err.response.data,
                    maskClosable: true,
                });
            });
    };
    useEffect(() => {
        localStorage.setItem("role", roles === "investor" ? 2 : 1);
        getData();
    }, [roles]);
    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <div className="body-block position-relative">
                            <HeaderTitle
                                title="Services"
                                roles={roles}
                                setRoles={setRoles}
                            />
                            <div className="body-board position-absolute">
                                <div className="d-flex body-board-surplus my-3 ">
                                    <p className="surplus-text fs-5 flex-grow-1 px-5">
                                        Surplus
                                    </p>
                                    {showMoney ? (
                                        <>
                                            <p className="surplus-number fs-5 px-3">
                                                {roles === "investor"
                                                    ? currency.format(
                                                        info.user
                                                            .account_informations[1]
                                                            .balance
                                                    )
                                                    : currency.format(
                                                        info.user
                                                            .account_informations[0]
                                                            .balance
                                                    )}
                                            </p>
                                            <AiFillEye
                                                className="surplus-visible me-4 my-1"
                                                onClick={() =>
                                                    setShowMoney(false)
                                                }
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <p className="surplus-number fs-5 px-3">
                                                ********
                                            </p>
                                            <AiFillEyeInvisible
                                                className="surplus-visible me-4 my-1"
                                                onClick={() =>
                                                    setShowMoney(true)
                                                }
                                            />
                                        </>
                                    )}
                                </div>
                                <div className="d-flex">
                                    <hr className="dropdown-divider-invetor"></hr>
                                    <FaAngleDown
                                        className="button-userLimit"
                                        onClick={() =>
                                            navi(
                                                `${PATH.LENDLIMIT_PATH}/${roles}`
                                            )
                                        }
                                    />
                                </div>

                                <div className="d-flex body-board-surplus my-3 me-3">
                                    <p className="surplus-text fs-5 flex-grow-1 px-5">
                                        {roles === "investor"
                                            ? "Investing"
                                            : "Borrowing"}
                                    </p>
                                    <p className="surplus-number fw-bold fs-5 px-3">
                                        {roles === "investor"
                                            ? currency.format(info.invest_money)
                                            : currency.format(info.loan_money)}
                                    </p>
                                </div>
                                <hr className="dropdown-divider-invetor"></hr>

                                <div className="row d-flex justify-content-around align-items-center mt-2">
                                    {roles === "borrower" ? (
                                        <div className="col-3 text-center body-feature">
                                            <div
                                                className="body-board-feature shadow d-flex justify-content-center align-items-center"
                                                onClick={() =>
                                                    navi(PATH.BORROW_PATH)
                                                }
                                            >
                                                <Icon
                                                    icon="fa6-solid:hand-holding-dollar"
                                                    color="white"
                                                    width="24px"
                                                    height="24px"
                                                />
                                            </div>
                                            <p>Borrow</p>
                                        </div>
                                    ) : (
                                        <div className="col-3 text-center body-feature">
                                            <div
                                                className="body-board-feature shadow d-flex justify-content-center align-items-center"
                                                onClick={() =>
                                                    navi(PATH.LENDDING_PATH)
                                                }
                                            >
                                                <Icon
                                                    icon="majesticons:money-hand-line"
                                                    color="white"
                                                    width="24px"
                                                    height="24px"
                                                />
                                            </div>
                                            <p>Invest</p>
                                        </div>
                                    )}
                                    <div
                                        className="col-3 text-center body-feature"
                                        onClick={() => navi(PATH.DEPOSIT_PATH)}
                                    >
                                        <div className="body-board-feature shadow d-flex justify-content-center align-items-center">
                                            <Icon
                                                icon="majesticons:money-plus"
                                                color="white"
                                                width="24px"
                                                height="24px"
                                            />
                                        </div>
                                        <p>Deposit</p>
                                    </div>
                                    <div className="col-3 text-center body-feature"
                                        onClick={() => navi(PATH.WITHDRAW_PATH)}>
                                        <div className="body-board-feature shadow d-flex justify-content-center align-items-center">
                                            <Icon
                                                icon="uil:money-withdraw"
                                                color="white"
                                                width="24px"
                                                height="24px"
                                            />
                                        </div>
                                        <p>Withdraw</p>
                                    </div>
                                </div>
                                <h4 className="fw-bold text-dark mt-3 ms-3">
                                    Service Limit
                                </h4>
                                {info &&
                                    <Carousel autoplay>
                                        <div>
                                            <div className="contentStyle bg_consumer_loan">
                                                <div className="p-3">
                                                    {roles === "borrower" ? (
                                                        <>
                                                            <h4 className="text-white fw-bold">
                                                                Consumer borrowing
                                                            </h4>
                                                            <h5 className="text-white pt-4">
                                                                {currency.format(info?.borrower_type_money?.for_personal || 0)}
                                                            </h5>
                                                        </>

                                                    ) : (
                                                        <>
                                                            <h4 className="text-white fw-bold">
                                                                Consumer investing
                                                            </h4>
                                                            <h5 className="text-white pt-4">
                                                                {currency.format(info?.investor_type_money?.for_personal || 0)}
                                                            </h5>
                                                        </>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="contentStyle bg_business_loan">
                                                <div className="p-3">
                                                    {roles === "borrower" ? (
                                                        <>
                                                            <h4 className="text-white fw-bold">
                                                                Business borrowing
                                                            </h4>
                                                            <h5 className="text-white pt-4">
                                                                {currency.format(info.borrower_type_money.for_business || 0)}
                                                            </h5>
                                                        </>

                                                    ) : (
                                                        <>
                                                            <h4 className="text-white fw-bold">
                                                                Business investing
                                                            </h4>
                                                            <h5 className="text-white pt-4">
                                                                {currency.format(info.investor_type_money.for_business || 0)}
                                                            </h5>
                                                        </>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </Carousel>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorHomePage;
