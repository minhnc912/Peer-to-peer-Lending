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
                                    Ng??n h??ng VNPAYQR
                                </option>
                                <option value="NCB">Ng??n h??ng NCB</option>
                                <option value="SCB">Ng??n h??ng SCB</option>
                                <option value="SACOMBANK">
                                    Ng??n h??ng SACOMBANK
                                </option>
                                <option value="EXIMBANK">
                                    Ng??n h??ng EXIMBANK
                                </option>
                                <option value="MSBANK">Ng??n h??ng MSBANK</option>
                                <option value="NAMABANK">
                                    Ng??n h??ng NAMABANK
                                </option>
                                <option value="VISA">Ng??n h??ng VISA</option>
                                <option value="VNMART">Ng??n h??ng VNMART</option>
                                <option value="VIETINBANK">
                                    Ng??n h??ng VIETINBANK
                                </option>
                                <option value="VIETCOMBANK">
                                    Ng??n h??ng VIETCOMBANK
                                </option>
                                <option value="HDBANK">Ng??n h??ng HDBANK</option>
                                <option value="DONGABANK">
                                    Ng??n h??ng DONGABANK
                                </option>
                                <option value="TPBANK">Ng??n h??ng TPBANK</option>
                                <option value="BIDV">Ng??n h??ng BIDV</option>
                                <option value="TECHCOMBANK">
                                    Ng??n h??ng TECHCOMBANK
                                </option>
                                <option value="VPBANK">Ng??n h??ng VPBank</option>
                                <option value="AGRIBANK">
                                    Ng??n h??ng AGRIBANK
                                </option>
                                <option value="MBBANK">Ng??n h??ng MBBANK</option>
                                <option value="ACB">Ng??n h??ng ACB</option>
                                <option value="OCB">Ng??n h??ng OCB</option>
                                <option value="SHB">Ng??n h??ng SHB</option>
                                <option value="IVB">Ng??n h??ng IVB</option>
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
