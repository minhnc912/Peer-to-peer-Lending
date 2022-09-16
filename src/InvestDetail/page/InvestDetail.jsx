import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../LendingDetail/styleComponent/LendingDetail.css";
import SideBar from "../../components/sideBar/sideBar";
import HeaderTitle from "../../components/container/header-title";
import { useParams } from "react-router-dom";
import { axiosService } from "../../axiosService";
import moment from "moment";
import { currency } from "../../ulti/ultil";
import { Modal } from "antd";
const InvestDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const getDetail = () => {
        axiosService
            .get(`/lending/invest_request/${id}`)
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
    const getType = () => {
        if (data?.lending_requests[0].type_of_lending === 1) {
            return "Basic";
        } else if (data?.lending_requests[0].type_of_lending === 2) {
            return "Multiple investor";
        } else {
            return "Multiple money";
        }
    };

    useEffect(() => {
        getDetail();
    }, []);

    return (
        <>
            <div className="body-page">
                <div className="container bg-light">
                    <div className="row flex-nowrap">
                        <SideBar />
                        <div className="col-9">
                            <HeaderTitle title="Investment Receipt" />
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
                                    <div className="container align-items-center justify-content-center d-flex">
                                        <div className="col-6 border-end text-center">
                                            <p className="">Amount to borrow</p>
                                            <p className="text_primary">
                                                {currency.format(
                                                    data?.lending_requests[0]
                                                        .amount_of_packet
                                                        ? data
                                                              ?.lending_requests[0]
                                                              .amount_of_packet
                                                        : data
                                                              ?.lending_requests[0]
                                                              .expected_money ||
                                                              ""
                                                )}
                                            </p>
                                        </div>
                                        <div className="col-6 text-center">
                                            <p className="">
                                                Total will receive
                                            </p>
                                            <p className="text_primary">
                                                {data?.lending_requests[0]
                                                    .amount_of_packet
                                                    ? currency.format(
                                                          (
                                                              data
                                                                  ?.lending_requests[0]
                                                                  .amount_of_packet ||
                                                              0
                                                          ).toFixed(0) -
                                                              (
                                                                  ((data
                                                                      ?.lending_requests[0]
                                                                      .amount_of_packet ||
                                                                      0) *
                                                                      (data
                                                                          ?.lending_requests[0]
                                                                          .interest_rate ||
                                                                          0) *
                                                                      3) /
                                                                  100
                                                              ).toFixed(0) +
                                                              Number(
                                                                  (
                                                                      (data
                                                                          ?.lending_requests[0]
                                                                          .amount_of_packet ||
                                                                          0) *
                                                                      (data
                                                                          ?.lending_requests[0]
                                                                          .interest_rate ||
                                                                          0)
                                                                  ).toFixed(0)
                                                              )
                                                      )
                                                    : currency.format(
                                                          (
                                                              data?.expected_money ||
                                                              0
                                                          ).toFixed(0) -
                                                              (
                                                                  ((data
                                                                      ?.lending_requests[0]
                                                                      .expected_money ||
                                                                      0) *
                                                                      (data
                                                                          ?.lending_requests[0]
                                                                          .interest_rate ||
                                                                          0) *
                                                                      5) /
                                                                  100
                                                              ).toFixed(0) +
                                                              Number(
                                                                  (
                                                                      (data
                                                                          ?.lending_requests[0]
                                                                          .expected_money ||
                                                                          0) *
                                                                      (data
                                                                          ?.lending_requests[0]
                                                                          .interest_rate ||
                                                                          0)
                                                                  ).toFixed(0)
                                                              )
                                                      )}
                                            </p>
                                        </div>
                                    </div>
                                    <hr className="dropdown-divider" />
                                    <div className="container col-12">
                                        <div className="container text-center d-flex">
                                            <div className="col-6">
                                                <div className="jss467">
                                                    <div className="container flex-column">
                                                        <p>Loan purpose</p>
                                                        <p className="fw-bold">
                                                            {data
                                                                ?.lending_requests[0]
                                                                .description ||
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
                                                                    data
                                                                        ?.lending_requests[0]
                                                                        .end_date
                                                                ).diff(
                                                                    data
                                                                        ?.lending_requests[0]
                                                                        .start_date,
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
                                                                data
                                                                    ?.lending_requests[0]
                                                                    .start_date ||
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
                                                                data
                                                                    ?.lending_requests[0]
                                                                    .end_date ||
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
                                                                data
                                                                    ?.lending_requests[0]
                                                                    .interest_rate *
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
                                                            {data
                                                                ?.lending_requests[0]
                                                                .amount_of_packet
                                                                ? currency.format(
                                                                      (
                                                                          (data
                                                                              ?.lending_requests[0]
                                                                              .amount_of_packet ||
                                                                              0) *
                                                                          (data
                                                                              ?.lending_requests[0]
                                                                              .interest_rate ||
                                                                              0)
                                                                      ).toFixed(
                                                                          0
                                                                      )
                                                                  )
                                                                : currency.format(
                                                                      (
                                                                          (data
                                                                              ?.lending_requests[0]
                                                                              .expected_money ||
                                                                              0) *
                                                                          (data
                                                                              ?.lending_requests[0]
                                                                              .interest_rate ||
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
                                                            {data
                                                                ?.lending_requests[0]
                                                                .amount_of_packet
                                                                ? currency.format(
                                                                      (
                                                                          ((data
                                                                              ?.lending_requests[0]
                                                                              .amount_of_packet ||
                                                                              0) *
                                                                              (data
                                                                                  ?.lending_requests[0]
                                                                                  .interest_rate ||
                                                                                  0) *
                                                                              3) /
                                                                          100
                                                                      ).toFixed(
                                                                          0
                                                                      )
                                                                  )
                                                                : currency.format(
                                                                      (
                                                                          ((data
                                                                              ?.lending_requests[0]
                                                                              .expected_money ||
                                                                              0) *
                                                                              (data
                                                                                  ?.lending_requests[0]
                                                                                  .interest_rate ||
                                                                                  0) *
                                                                              3) /
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvestDetail;
