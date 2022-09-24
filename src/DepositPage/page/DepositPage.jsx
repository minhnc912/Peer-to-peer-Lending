import React, { useState } from "react";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";
import "../styleComponent/DepositPage.css";
import { useParams } from "react-router-dom";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
const DepositPage = () => {
    const { type } = useParams();
    const cookies = new Cookies();
    const [account, setAccount] = useState('');
    const [ammount, setAmmount] = useState('');
    const [description, setDescription] = useState('');
    const [bank, setBank] = useState('default');
    const [role, setRole] = useState('default');
    const [language, setLanguage] = useState('default');

    const sendData = () => {
        const body = {
            amount: ammount.toString(),
            bankCode: bank,
            language: language,
            orderDescription: description,
            user_id: cookies.get('userID'),
            user_type: localStorage.getItem('role')
        }
        axiosService.post('/payment/create_url_payment', body).then((res) => {
            if (res.status === 200) {
                window.open(res.data, '_blank');
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-lg-9">
                        <HeaderTitle title={`${type === 'withdraw' ? 'Withdraw' : 'Deposit'}`} />
                        <div className="deposit_content mt-3">
                            <div className="deposit_title">
                                Type account
                            </div>
                            <select
                                value={role}
                                class="form-select"
                                aria-label="Default select example"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value={'default'}>Select type account</option>
                                <option value="invest">
                                    Invest
                                </option>
                                <option value="borrow">
                                    Borrow
                                </option>
                            </select>
                            {type === 'withdraw' &&
                                <>
                                    <div className="deposit_title">
                                        Bank account number
                                    </div>
                                    <input
                                        value={account}
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter your bank account number"
                                        aria-label="amount"
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => setAccount(e)}
                                    />
                                </>
                            }
                            <div className="deposit_title">Deposit amount</div>
                            <input
                                value={ammount}
                                type="number"
                                className="form-control"
                                placeholder="Enter the amount to deposit"
                                aria-label="amount"
                                aria-describedby="basic-addon1"
                                onChange={(e) => setAmmount(e.target.value)}
                            />
                            <div className="deposit_title">Description</div>
                            <textarea
                                value={description}
                                type="number"
                                className="form-control"
                                placeholder="Enter the description"
                                aria-label="amount"
                                aria-describedby="basic-addon1"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className="deposit_title">Bank</div>
                            <select
                                value={bank}
                                class="form-select"
                                aria-label="Default select example"
                                onChange={(e) => setBank(e.target.value)}
                            >
                                <option value={'default'}>Select your bank</option>
                                <option value="VNPAYQR">
                                    Ngân hàng VNPAYQR
                                </option>
                                <option value="NCB">Ngân hàng NCB</option>
                                <option value="SCB">Ngân hàng SCB</option>
                                <option value="SACOMBANK">
                                    Ngân hàng SACOMBANK
                                </option>
                                <option value="EXIMBANK">
                                    Ngân hàng EXIMBANK
                                </option>
                                <option value="MSBANK">Ngân hàng MSBANK</option>
                                <option value="NAMABANK">
                                    Ngân hàng NAMABANK
                                </option>
                                <option value="VISA">Ngân hàng VISA</option>
                                <option value="VNMART">Ngân hàng VNMART</option>
                                <option value="VIETINBANK">
                                    Ngân hàng VIETINBANK
                                </option>
                                <option value="VIETCOMBANK">
                                    Ngân hàng VIETCOMBANK
                                </option>
                                <option value="HDBANK">Ngân hàng HDBANK</option>
                                <option value="DONGABANK">
                                    Ngân hàng DONGABANK
                                </option>
                                <option value="TPBANK">Ngân hàng TPBANK</option>
                                <option value="BIDV">Ngân hàng BIDV</option>
                                <option value="TECHCOMBANK">
                                    Ngân hàng TECHCOMBANK
                                </option>
                                <option value="VPBANK">Ngân hàng VPBank</option>
                                <option value="AGRIBANK">
                                    Ngân hàng AGRIBANK
                                </option>
                                <option value="MBBANK">Ngân hàng MBBANK</option>
                                <option value="ACB">Ngân hàng ACB</option>
                                <option value="OCB">Ngân hàng OCB</option>
                                <option value="SHB">Ngân hàng SHB</option>
                                <option value="IVB">Ngân hàng IVB</option>
                            </select>
                        </div>
                        <div className="deposit_title">Language</div>
                        <select
                            value={language}
                            class="form-select"
                            aria-label="Default select example"
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value={'default'}>Select language</option>
                            <option value="VN">Vietnamese</option>
                            <option value="US">English</option>
                        </select>

                        {type === 'withdraw' ?
                            <div onClick={() => sendData()} className="btn btn_deposit">
                                Withdraw
                            </div>
                            :
                            <div className="btn btn_deposit" onClick={() => sendData()}>
                                Deposit
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositPage;
