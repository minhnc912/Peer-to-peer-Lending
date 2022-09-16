import React, { useEffect, useState } from "react";
import SideBar from "../../components/sideBar/sideBar";
import HeaderTitle from "../../components/container/header-title";
import "../styleComponent/BorrowPage.css";
import { FiAlertTriangle } from "react-icons/fi";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../helper/constant";
import { currency } from "../../ulti/ultil";
import { Cookies } from "react-cookie";
import { axiosService } from "../../axiosService";
import { Modal, Spin } from "antd";
import moment from "moment";
import Paging from "../../components/container/paging";
const BorrowPage = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [listData, getListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(0);
    const getData = () => {
        axiosService
            .get(
                `/lending/borrow_request/${cookies.get(
                    "userID"
                )}/your_borrow_requests`
            )
            .then((res) => {
                if (res.status === 200) {
                    getListData(res.data.rows);
                    setLoading(false);
                }
            })
            .catch((err) => {
                Modal.error({
                    title: err.response.data,
                    maskClosable: true,
                });
            });
    };

    const getBorrowing = () => {
        const id = cookies.get('userID')
        axiosService.get(`/user/get_detail`).then((res) => {
            if (res.data) {
                const rs = res.data;
                setInfo(rs);
            }
        })
    }

    const getStatus = (data) => {
        let rs = {
            status: "",
            className: "",
        };
        if (data.status === 0) {
            rs = {
                status: "CANCEL",
                className: "item-status_cancel",
            };
        } else if (data.status === 1) {
            rs = {
                status: "OPEN",
                className: "item-status_process",
            };
        } else if (data.status === 2) {
            rs = {
                status: "INPROGESS",
                className: "item-status_done",
            };
        } else if (data.status === 3) {
            rs = {
                status: "FINISH",
                className: "item-status_done",
            };
        } else if (data.status === 4) {
            rs = {
                status: "WAIT_PAYMENT",
                className: "item-status_done",
            };
        } else if (data.status === 5) {
            rs = {
                status: "LATE_PAYMENT",
                className: "item-status_cancel",
            };
        } else {
            rs = {
                status: "DEBT",
                className: "item-status_cancel",
            };
        }
        return rs;
    };

    const getType = (type) => {
        if (type === 1) {
            return "Basic";
        } else if (type === 2) {
            return "Multiple investor";
        } else {
            return "Multiple money";
        }
    };
    useEffect(() => {
        setLoading(true);
        getData();
        getBorrowing();
    }, []);
    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Borrow" />
                        <div className="w-100 mt-2 justify-content-around borrow_detail">
                            <div className="borrow_limit d-block text-center">
                                <Icon
                                    icon="uil:money-insert"
                                    color="white"
                                    height="24px"
                                    width="24px"
                                />
                                <p className="text-light">Limit can borrow</p>
                                {
                                    info &&
                                    <p className="fw-bold text-light">
                                        {currency.format(info.user.limit_money)}
                                    </p>
                                }
                            </div>
                            <div className="borrow_borrowing d-block text-center">
                                <Icon
                                    icon="uil:money-insert"
                                    color="white"
                                    height="24px"
                                    width="24px"
                                />
                                <p className="text-light">Borrowing</p>
                                <p className="fw-bold text-light">
                                    {currency.format(info.loan_money)}
                                </p>
                            </div>
                            <button
                                className="btn-borrow d-flex justify-content-center m-auto py-2"
                                onClick={() => navigate(PATH.BORROWCREATE_PATH)}
                            >
                                Borrow Now
                            </button>
                        </div>
                        <div className="borrow_alert d-flex align-items-center my-2">
                            <FiAlertTriangle className="text-light icon_alert ms-4" />
                            <p className="text-light m-3 ">
                                Complete your profile to increase your limit!
                            </p>
                        </div>
                        <div>
                            <h3 className="fw-bold text-uppercase">
                                list of borrow contract
                            </h3>
                        </div>
                        <Spin spinning={loading}>
                            <div className="history-list mt-3">
                                {listData?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="history-item"
                                            onClick={() =>
                                                navigate(
                                                    `${PATH.BORROWDETAIL_PATH}/${item.id}`
                                                )
                                            }
                                        >
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <div className="d-flex">
                                                        <Icon
                                                            icon="majesticons:money-hand-line"
                                                            width="20px"
                                                            height="20px"
                                                        />
                                                        <p className="text-center fw-bold ms-2">
                                                            Transaction code:
                                                        </p>
                                                    </div>
                                                    <p>
                                                        <b>{item?.id}</b>
                                                    </p>
                                                    <p>
                                                        Start date:{" "}
                                                        <b>
                                                            {" "}
                                                            {moment(
                                                                item.start_date
                                                            ).format(
                                                                "dd/MM/YYYY"
                                                            )}
                                                        </b>
                                                    </p>
                                                </div>
                                                <div className="text-right float-end">
                                                    <h5>
                                                        {currency.format(
                                                            item?.expected_money
                                                        )}
                                                    </h5>
                                                    <p>
                                                        <b>
                                                            {getType(
                                                                item?.type_of_lending
                                                            )}
                                                        </b>
                                                    </p>
                                                    <div
                                                        className={`text-uppercase text-center ${getStatus(item)
                                                            .className
                                                            } `}
                                                    >
                                                        {getStatus(item).status}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Spin>
                        <Paging />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorrowPage;
