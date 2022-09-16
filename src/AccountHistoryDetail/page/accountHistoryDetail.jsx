import React from 'react';
import '../styleComponent/accountHistoryDetail.css';
import SideBar from "../../components/sideBar/sideBar";
import HeaderTitle from "../../components/container/header-title";
import { currency } from "../../ulti/ultil";

const AccountHistoryDetail = () => {
  return (
    <div className="body-page">
      <div className="container bg-light">
        <div className="row flex-nowrap">
          <SideBar />
          <div className="col-9 container">
            <HeaderTitle title="History Detail" />
            <div className='detail_type col-lg-8 m-auto bg-white mt-3 text-center py-3'>
              <div className='detail_title'>Title</div>
              <div className='fw-bold fs-4 detail_amount'>{currency.format(500000)}</div>
            </div>
            <div className='detail_type col-lg-8 m-auto bg-white mt-3 py-3'>
              <div className='d-flex align-items-center justify-content-between px-5'>
                <div className='text-start detail_title'>Transaction date</div>
                <div className=' text-end detail_infor'>03/09/2022</div>
              </div>
              <hr className="dropdown-divider mx-5"></hr>
              <div className='d-flex align-items-center justify-content-between px-5'>
                <div className='text-start detail_title'>Transaction fee</div>
                <div className=' text-end detail_infor'>{currency.format(5500)}</div>
              </div>
            </div>

            <div className='detail_type col-lg-8 m-auto bg-white mt-3 py-3'>
              <div className='d-flex align-items-center justify-content-between px-5'>
                <div className='text-start detail_title'>Trader</div>
                <div className=' text-end detail_infor'>Minh Nguyen</div>
              </div>
              <hr className="dropdown-divider mx-5"></hr>
              <div className='d-flex align-items-center justify-content-between px-5'>
                <div className='text-start detail_title'>Bank account</div>
                <div className=' text-end detail_infor'>00000000000</div>
              </div>
              <hr className="dropdown-divider mx-5"></hr>
              <div className='d-flex align-items-center justify-content-between px-5'>
                <div className='text-start detail_title'>Bank</div>
                <div className=' text-end detail_infor'>VietcomBank</div>
              </div>
            </div>
            <div className='detail_type col-lg-8 m-auto bg-white mt-3 py-3'>
              <div className='d-flex align-items-center justify-content-between px-5'>
                <div className='text-start detail_title'>From/To</div>
                <div className=' text-end detail_infor'>Minh Nguyen</div>
              </div>
              <hr className="dropdown-divider mx-5"></hr>
              <div className='d-flex align-items-center justify-content-between px-5'>
                <div className='text-start detail_title'>Content</div>
                <div className=' text-end detail_infor'>???</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountHistoryDetail