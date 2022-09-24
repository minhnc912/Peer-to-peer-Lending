import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../styleComponent//LendingDetail.css";
import SideBar from "../../components/sideBar/sideBar";
import HeaderTitle from "../../components/container/header-title";
import { useParams } from "react-router-dom";
import { axiosService } from "../../axiosService";
import moment from "moment";
import { currency } from "../../ulti/ultil";
import ButtonLend from "../container/buttonLend";
import { Modal } from "antd";
import { Cookies } from "react-cookie";
const LendingDetail = () => {
    const { id } = useParams();
    const cookies = new Cookies();
    const [data, setData] = useState(null);
    const [minimunAmount, setMinimunAmount] = useState(0);
    const [valid, setValid] = useState({
        minimunAmount: { valid: false, msg: "" },
    });
    const getDetail = () => {
        axiosService
            .get(`lending/borrow_request/${id}`)
            .then((res) => {
                if (res.data) {
                    const temp = res.data;
                    setData(temp);
                }
            })
            .catch((err) => {
                Modal.error({
                    title: err.response.data,
                    maskClosable: true,
                });
            });
    };

    const checkInvest = (listUser) => {
        const id = cookies.get("userID");
        const userInvest = listUser.filter(item => item.user_id == id);
        if (userInvest.length > 0)
            return true;
        return false
    }

    const getType = () => {
        if (data?.type_of_lending === 1) {
            return "Basic";
        } else if (data?.type_of_lending === 2) {
            return "Multiple investor";
        } else {
            return "Multiple money";
        }
    };

    const validate = () => {
        const temp = {
            minimunAmount: { valid: false, msg: "" },
        };
        if (!minimunAmount) {
            temp.minimunAmount.valid = true;
            temp.minimunAmount.msg = "Please input amount to invest";
        }
        else if (minimunAmount < data?.minimum_money) {
            temp.minimunAmount.valid = true;
            temp.minimunAmount.msg = "Amount to invest must be greater than or equal to the amount requested by the borrower";
        }
        else if (minimunAmount > data?.expected_money) {
            temp.minimunAmount.valid = true;
            temp.minimunAmount.msg = "Amount to invest must be less than or equal to total amount";
        }
        else {
            temp.minimunAmount.valid = false;
            temp.minimunAmount.msg = "";
        }
        setValid(temp);
        return !temp.minimunAmount.valid;
    };

    useEffect(() => {
        getDetail();
    }, []);

    return (
        <>
            <div className="body-page">
                <div className="container bg-white">
                    <div className="row flex-nowrap">
                        <SideBar />
                        <div className="col-9">
                            <HeaderTitle title="Borrow Contract Detail" />
                            <div>
                                <div className="lending-detail">
                                    <hr className="dropdown-divider mt-2" />
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-10 text_primary">
                                            <p className="m-auto title">
                                                100% SAFETY GUARANTEE
                                            </p>
                                        </div>
                                        <div className="col-2 text-right">
                                            <img
                                                src="https://res.cloudinary.com/da0i1amaa/image/upload/v1653641595/70653wqqs42_lit4nd.png"
                                                width="40px"
                                                height="40px"
                                                alt="guarantee"
                                                className="float-end"
                                            ></img>
                                        </div>
                                    </div>
                                    <hr className="dropdown-divider" />
                                    {data?.type_of_lending === 3 ? (
                                        <div className="container align-items-center justify-content-center d-flex">
                                            <div className="col-4 border-end text-center">
                                                <p className="">Amount to borrow</p>
                                                <p className="text_primary">
                                                    {currency.format(
                                                        data?.amount_of_packet
                                                            ? data?.amount_of_packet
                                                            : data?.expected_money ||
                                                            ""
                                                    )}
                                                </p>
                                            </div>
                                            <div className="col-4 border-end text-center">
                                                <p className="">Minimum invest money</p>
                                                <p className="text_primary">
                                                    {currency.format(
                                                        data?.amount_of_packet
                                                            ? data?.amount_of_packet
                                                            : data?.minimum_money ||
                                                            ""
                                                    )}
                                                </p>
                                            </div>
                                            <div className="col-4 text-center">
                                                <p className="">
                                                    Total will receive
                                                </p>
                                                <p className="text_primary">
                                                    {data?.amount_of_packet
                                                        ? currency.format(
                                                            data?.amount_of_packet.toFixed(
                                                                0
                                                            ) -
                                                            (
                                                                ((data?.amount_of_packet ||
                                                                    0) *
                                                                    (data?.interest_rate ||
                                                                        0) *
                                                                    5) /
                                                                100
                                                            ).toFixed(0) +
                                                            Number(
                                                                (
                                                                    (data?.amount_of_packet ||
                                                                        0) *
                                                                    (data?.interest_rate ||
                                                                        0)
                                                                ).toFixed(0)
                                                            )
                                                        )
                                                        : currency.format(
                                                            data?.expected_money.toFixed(
                                                                0
                                                            ) -
                                                            (
                                                                ((data?.expected_money ||
                                                                    0) *
                                                                    (data?.interest_rate ||
                                                                        0) *
                                                                    5) /
                                                                100
                                                            ).toFixed(0) +
                                                            Number(
                                                                (
                                                                    (data?.expected_money ||
                                                                        0) *
                                                                    (data?.interest_rate ||
                                                                        0)
                                                                ).toFixed(0)
                                                            )
                                                        )}
                                                </p>
                                            </div>

                                        </div>) : (<div className="container align-items-center justify-content-center d-flex">
                                            <div className="col-6 border-end text-center">
                                                <p className="">Amount to borrow</p>
                                                <p className="text_primary">
                                                    {currency.format(
                                                        data?.amount_of_packet
                                                            ? data?.amount_of_packet
                                                            : data?.expected_money ||
                                                            ""
                                                    )}
                                                </p>
                                            </div>
                                            <div className="col-6 text-center">
                                                <p className="">
                                                    Total will receive
                                                </p>
                                                <p className="text_primary">
                                                    {data?.amount_of_packet
                                                        ? currency.format(
                                                            data?.amount_of_packet.toFixed(
                                                                0
                                                            ) -
                                                            (
                                                                ((data?.amount_of_packet ||
                                                                    0) *
                                                                    (data?.interest_rate ||
                                                                        0) *
                                                                    5) /
                                                                100
                                                            ).toFixed(0) +
                                                            Number(
                                                                (
                                                                    (data?.amount_of_packet ||
                                                                        0) *
                                                                    (data?.interest_rate ||
                                                                        0)
                                                                ).toFixed(0)
                                                            )
                                                        )
                                                        : currency.format(
                                                            data?.expected_money.toFixed(
                                                                0
                                                            ) -
                                                            (
                                                                ((data?.expected_money ||
                                                                    0) *
                                                                    (data?.interest_rate ||
                                                                        0) *
                                                                    5) /
                                                                100
                                                            ).toFixed(0) +
                                                            Number(
                                                                (
                                                                    (data?.expected_money ||
                                                                        0) *
                                                                    (data?.interest_rate ||
                                                                        0)
                                                                ).toFixed(0)
                                                            )
                                                        )}
                                                </p>
                                            </div>

                                        </div>)}
                                    <hr className="dropdown-divider" />
                                    <div className="container col-12">
                                        <div className="col-12">
                                            <div className="row">
                                                <p>Borrower</p>
                                                <p className="text-uppercase fw-bold">
                                                    {data?.account
                                                        ?.first_name || ""}{" "}
                                                    {data?.account?.last_name ||
                                                        ""}
                                                </p>
                                            </div>
                                            <hr className="dropdown-divider divider-primary" />
                                        </div>
                                        <div className="container text-center d-flex">
                                            <div className="col-6">
                                                <div className="jss467">
                                                    <div className="container flex-column">
                                                        <p>Loan purpose</p>
                                                        <p className="fw-bold">
                                                            {data?.description ||
                                                                ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="jss467">
                                                    <div className="container flex-column">
                                                        <p>Borrowed time</p>
                                                        <p className="fw-bold">
                                                            {Number(
                                                                moment(
                                                                    data?.end_date
                                                                ).diff(
                                                                    data?.start_date,
                                                                    "M"
                                                                )
                                                            )}{" "}
                                                            month
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container text-center d-flex">
                                            <div className="col-6">
                                                <div className="jss467">
                                                    <div className="container flex-column">
                                                        <p>Loan date</p>
                                                        <p className="fw-bold">
                                                            {moment(
                                                                data?.start_date ||
                                                                ""
                                                            ).format(
                                                                "DD/MM/YYYY"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="jss467">
                                                    <div className="container flex-column">
                                                        <p>Due date</p>
                                                        <p className="fw-bold">
                                                            {moment(
                                                                data?.end_date ||
                                                                ""
                                                            ).format(
                                                                "DD/MM/YYYY"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container text-center d-flex">
                                            <div className="col-6">
                                                <div className="jss467">
                                                    <div className="container flex-column">
                                                        <p>Interest rate</p>
                                                        <p className="fw-bold">
                                                            {(
                                                                data?.interest_rate *
                                                                100
                                                            ).toFixed(0) || ""}
                                                            %
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="jss467">
                                                    <div className="container text-center flex-column">
                                                        <p>Interest</p>
                                                        <p className="fw-bold">
                                                            {data?.amount_of_packet
                                                                ? currency.format(
                                                                    (
                                                                        (data?.amount_of_packet ||
                                                                            0) *
                                                                        (data?.interest_rate ||
                                                                            0)
                                                                    ).toFixed(
                                                                        0
                                                                    )
                                                                )
                                                                : currency.format(
                                                                    (
                                                                        (data?.expected_money ||
                                                                            0) *
                                                                        (data?.interest_rate ||
                                                                            0)
                                                                    ).toFixed(
                                                                        0
                                                                    )
                                                                )}{" "}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container text-center d-flex">
                                            <div className="col-6">
                                                <div className="jss467">
                                                    <div className="container flex-column">
                                                        <p>Service charge</p>
                                                        <p className="fw-bold">
                                                            {data?.amount_of_packet
                                                                ? currency.format(
                                                                    (
                                                                        ((data?.amount_of_packet ||
                                                                            0) *
                                                                            (data?.interest_rate ||
                                                                                0) *
                                                                            5) /
                                                                        100
                                                                    ).toFixed(
                                                                        0
                                                                    )
                                                                )
                                                                : currency.format(
                                                                    (
                                                                        ((data?.expected_money ||
                                                                            0) *
                                                                            (data?.interest_rate ||
                                                                                0) *
                                                                            5) /
                                                                        100
                                                                    ).toFixed(
                                                                        0
                                                                    )
                                                                )}{" "}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="jss467">
                                                    <div className="container text-center flex-column">
                                                        <p>Type of contract</p>
                                                        <p className="fw-bold">
                                                            {getType()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {data?.type_of_lending ===
                                3 && !checkInvest(data.investment_requests) &&(
                                    <>
                                        <div className="amount_mul_money m-auto my-3">
                                            <p className="m-0">
                                                Amount to invest
                                                <b className="required_field">*</b>
                                            </p>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter the amount"
                                                aria-label="amount"
                                                aria-describedby="basic-addon1"
                                                required
                                                value={minimunAmount}
                                                onChange={(e) => setMinimunAmount(e.target.value)}
                                            />
                                            {
                                                valid.minimunAmount.valid &&
                                                <div className="text-danger">
                                                    {valid.minimunAmount.msg}
                                                </div>
                                            }
                                        </div>
                                    </>
                                )}
                            {data && !checkInvest(data.investment_requests) &&
                                <ButtonLend
                                    title="Accept to invest"
                                    idDetail={id}
                                    data={data}
                                    minimunAmount={minimunAmount}
                                    validate={validate}
                                    typeLending={data?.type_of_lending}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LendingDetail;
