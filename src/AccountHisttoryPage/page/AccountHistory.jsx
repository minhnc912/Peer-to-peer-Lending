import React, { useEffect, useState } from "react";
import Paging from "../../components/container/paging";
import SideBar from "../../components/sideBar/sideBar";
import HeaderTitle from "../../components/container/header-title";
import "../styleComponents/AccountHistory.css";
import { Spin } from "antd";
import { axiosService } from "../../axiosService";
import { currency } from "../../ulti/ultil";
import { Cookies } from "react-cookie";
import moment from "moment";
import { PATH } from "../../helper/constant";
import { useNavigate } from "react-router-dom";
import { IoMdFastforward } from "react-icons/io";


const AccountHistory = () => {
    const cookies = new Cookies();
    const [history, setHistory] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const size = 5;
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const navigate = useNavigate();

    const handlePageClick = (e) => {
        setPage(e.selected + 1);
    };
    const getData = () => {
        const userId = cookies.get("userID");
        axiosService
            .get(
                `account_history?user_id=${userId}&type_account=${localStorage.getItem(
                    "role"
                )}&page=1&limit=${size.toString()}`
            )
            .then((res) => {
                if (res.data) {
                    setHistory(res.data.rows);
                    setIsLoad(false);
                    setTotalPage(res.data.count / size);
                    setIsLoad(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setIsLoad(true);
        getData();
    }, [page]);

    useEffect(() => {
        setIsLoad(true);
        getData();
    }, []);

    const checkTypeRecieve = (content) => {
        if (content.toLowerCase().includes('recieve')) {
            return true;
        }
        return false;
    }

    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Account History" />
                        <Spin spinning={isLoad}>
                            {history &&
                                history.map((item) => {
                                    return (
                                        <div className="m-auto bg-white account_history mt-2">
                                            <div className="account_history_item px-3" onClick={() => navigate(PATH.HISTORYDETAIL_PATH)}>
                                                <div className="account_history_date d-flex align-items-center mx-3 pt-3">
                                                    <div className={`date_left text-white ${checkTypeRecieve(item.content) ? '' : 'bg_red'}`}>
                                                        {moment(
                                                            item.createdAt
                                                        ).format("D")}
                                                    </div>
                                                    <div className="date_right">
                                                        <div className="date_bold fw-bold">
                                                            {moment(
                                                                item.createdAt
                                                            ).format("dddd")}
                                                        </div>
                                                        <div className="">
                                                            {moment(
                                                                item.createdAt
                                                            ).format(
                                                                "MMMM YYYY"
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="account_history_main position-relative mx-3">
                                                    <div className="account_history_content my-3">
                                                        <div className="content_info col-lg-12">
                                                            <div className="col-lg-8 d-flex justify-content-between">
                                                                <div className=" description">
                                                                    <div className="content_description mb-1">
                                                                        {checkTypeRecieve(item.content) ? 'From:' : 'To:'} {item.reciever_name}
                                                                    </div>
                                                                    <div className="content_description mb-1">
                                                                        {item.content}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-4 content_transaction text-end fw-bold">
                                                                {checkTypeRecieve(item.content) ? '+' : '-'}
                                                                {currency.format(
                                                                    (item.amount || 0).toFixed(
                                                                        0
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </Spin>
                        <div className="history-list mt-3"></div>

                        <Paging
                            totalPages={totalPage}
                            handlePageClick={handlePageClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountHistory;
