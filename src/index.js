import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import InvestorHomePage from "./ServicePage/Page/ServicePage";
import UserLimit from "./UserLimit/page/UserLimit";
import LendingPage from "./LendingPage/page/LendingPage";
import LendingDetail from "./LendingDetail/page/LendingDetail";
import BorrowPage from "./BorrowPage/page/BorrowPage";
import BorrowCreate from "./createBorrow/page/BorrowCreate";
import LendingContract from "./LendingContract/page/LendingContract";
import Account from "./AccountPage/page/account";
import { useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie';
import BorrowDetail from "./BorrowDetail/page/BorrowDetail";
import AccountProfile from "./AccountProfile/page/accountProfile";
import ProfileDetail from "./ProfileDetail/page/profileDetail";
import ProfileIDCard from "./ProfileIDCard/page/ProfileIDCard";
import ProfileFacebook from "./ProfileFacebook/page/ProfileFacebook";
import DepositPage from "./DepositPage/page/DepositPage";
import AccountHistory from "./AccountHisttoryPage/page/AccountHistory";
import TransactionResult from "./DepositPage/page/TransactionResult";
import InvestDetail from "./InvestDetail/page/InvestDetail";
import AccountHistoryDetail from "./AccountHistoryDetail/page/accountHistoryDetail";

const RequireAuth = () => {
    const navi = useNavigate();
    const token = new Cookies().get('token');
    useEffect(() => {
        if (!token || token === undefined) {
            navi('/');
        }
    }, []);
    return (
        <div>
            <Outlet />
        </div>
    );
}

const RequireBorrow = () => {
    const navi = useNavigate();
    const roles = localStorage.getItem('role');
    console.log(roles);
    useEffect(() => {
        if (!roles || roles != 1) {
            navi('/service');
        }
    }, []);
    return (
        <div>
            <Outlet />
        </div>
    );
}

const RequireLending = () => {
    const navi = useNavigate();
    const roles = localStorage.getItem('role');
    useEffect(() => {
        if (!roles || roles != 2) {
            navi('/service');
        }
    }, []);
    return (
        <div>
            <Outlet />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/" element={<RequireAuth />}>
                    <Route path="/" element={<RequireBorrow />}>
                        <Route path="/borrowlimit" element={<UserLimit />} />
                        <Route path="/borrow" element={<BorrowPage />} />
                        <Route path="/borrowcreate" element={<BorrowCreate />} />
                        <Route path="/borrowdetail/:id" element={<BorrowDetail />} />
                    </Route>
                    <Route path="/" element={<RequireLending />}>
                        <Route path="/lending" element={<LendingPage />} />
                        <Route path="/lendlimit/:role" element={<UserLimit />} />
                        <Route path="/lendingdetail/:id" element={<LendingDetail />} />
                        <Route path="/InvestDetail/:id" element={<InvestDetail />} />
                        <Route path="/lendingcontract" element={<LendingContract />} />
                    </Route>
                    <Route path="/service" element={<InvestorHomePage />} />
                    <Route path="/service/:type" element={<InvestorHomePage />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/history" element={<AccountHistory />} />
                    <Route path="/profile" element={<AccountProfile />} />
                    <Route path="/profiledetail" element={<ProfileDetail />} />
                    <Route path="/profileidcard" element={<ProfileIDCard />} />
                    <Route path="/profilefacebook" element={<ProfileFacebook />} />
                    <Route path="/transaction/:type" element={<DepositPage />} />
                    <Route path="/payment/return" element={<TransactionResult />} />
                    <Route path="/history/detail" element={<AccountHistoryDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
