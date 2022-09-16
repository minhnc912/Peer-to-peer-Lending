import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../styleComponent/UserLimit.css";
import { Carousel } from "antd";
import SideBar from "../../components/sideBar/sideBar";
import HeaderTitle from "../container/header-title_userlimit";
import { Cookies } from "react-cookie";
import { currency } from "../../ulti/ultil";
import { useParams } from "react-router-dom";
import { axiosService } from "../../axiosService";
const UserLimit = () => {
    const [info, setInfo] = useState(0);
    const getData = async () => {
        const id = cookies.get('userID')
        await axiosService.get(`/user/get_detail`).then((res) => {
            if (res.data) {
                const rs = res.data;
                setInfo(rs);
            }
        })
    }
    const cookies = new Cookies();
    const { role } = useParams();
    const [roles, setRoles] = useState(role);
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="body_page">
            <div className="container">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9">
                        <HeaderTitle
                        title={`${roles === "borrower" ? "Borrow" : "Invest"
                            }`}
                        roles={roles}
                        setRoles={setRoles}
                        />
                        <div className="col-12 row mt-2 justify-content-around">
                            <div className="col-6 body-balance">
                                <p className="text-white">Account balance</p>
                                {info &&
                                    <p className="fw-bold text-white">
                                        {currency.format(roles === 'borrower' ? info.user.account_informations[0].balance : info.user.account_informations[1].balance)}
                                    </p>
                                }
                            </div>
                            {roles === "borrower" ? (
                                <div className="col-6 body-lending">
                                    <p className="text-white">Borrowing</p>
                                    <p className="fw-bold text-white">{currency.format(info.loan_money)}</p>
                                </div>
                            ) : (
                                <div className="col-6 body-lending">
                                    <p className="text-white">Investing</p>
                                    <p className="fw-bold text-white">{currency.format(info.invest_money)}</p>
                                </div>
                            )}
                        </div>
                        <h4 className="fw-bold text-dark mt-3">
                            Service Limit
                        </h4>
                        <Carousel autoplay>
                            <div>
                                <div className="contentStyle bg_consumer_loan">
                                    <div className="p-3">
                                        <h4 className="text-white fw-bold">
                                            Consumer Loan
                                        </h4>
                                        <h5 className="text-white pt-4">
                                            {currency.format(0)}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="contentStyle bg_business_loan">
                                    <div className="p-3">
                                        <h4 className="text-white fw-bold">
                                            business Loan
                                        </h4>
                                        <h5 className="text-white pt-4">
                                            {currency.format(0)}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLimit;
