import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";
import { PATH } from "../../helper/constant";

const TransactionResult = () => {
    const navigate = useNavigate();
    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-lg-9">
                        <HeaderTitle title="Transaction result" />
                        <div className="text-center">
                            <div className="text-success fs-5 mt-3">
                                Successful transaction
                            </div>
                            <div className="text-danger fs-5 mt-3">
                                Transaction failed
                            </div>
                            <button
                                type="button"
                                className="btn btn_deposit"
                                onClick={() => navigate(PATH.LENDSERVICE_PATH)}
                            >
                                Back to home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionResult;
