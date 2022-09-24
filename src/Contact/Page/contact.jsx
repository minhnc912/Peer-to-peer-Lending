import React from 'react'
import HeaderTitle from '../../components/container/header-title'
import SideBar from '../../components/sideBar/sideBar'
import '../styleComponent/contact.css'


const Contact = () => {
    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Contact" />
                        <div className='px-5'>
                            <div className='mt-3'>
                                <img src='https://res.cloudinary.com/da0i1amaa/image/upload/v1663668544/302366423_5533870196708094_5064422211412223897_n_popogx.png'
                                    width="240px"
                                    height='80px'
                                    alt=''></img>
                            </div>
                            <div className='contact_infor d-flex col-12 my-3 text-white fw-bold fs-5'>
                                <div className='col-6'>
                                    <div className='contact_hotline'>
                                        <img src='https://res.cloudinary.com/da0i1amaa/image/upload/v1663668570/302623558_614607453657640_3792018461671635525_n_shh5iv.png'
                                            width='64px'
                                            height='64px'
                                            alt=''></img>
                                        <span className='ms-3'>Hotline:</span>
                                        <div className='contact_detail'>
                                            <div>1900 xxxxxx</div>
                                            <div>098xxxxxxxx</div>
                                            <div>Support time:</div>
                                            <div>8:30 a.m. to 10:00 p.m</div>
                                        </div>
                                    </div>
                                    <div className='contact_hotline my-3'>
                                        <img src='https://res.cloudinary.com/da0i1amaa/image/upload/v1663668561/302448516_5750307548333042_3657795627870195332_n_wrwxa3.png'
                                            width='56px'
                                            height='40px'
                                            alt=''></img>
                                        <span className='ms-3'>Email address:</span>
                                        <div className='contact_detail'>
                                            <div>hotro@p2plending.vn</div>

                                        </div>
                                    </div>
                                    <div className='contact_hotline'>
                                        <img src='https://res.cloudinary.com/da0i1amaa/image/upload/v1663668607/298780158_8000253096711561_7343499209501631849_n_ufj8dr.png'
                                            width='64px'
                                            height='56px'
                                            alt=''></img>
                                        <span className='ms-3'>Facebook Messenger:</span>
                                        <div className='contact_detail'>
                                            <div>http://m.me/P2P.Lending</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 contact_address'>
                                    <div className='ms-5'>
                                        <h5 className='text-white'>Tp.Đà Nẵng:</h5>
                                        <p className='ms-5'>Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng 550000</p>
                                    </div>
                                    {/* <img className='ms-5' src="https://res.cloudinary.com/da0i1amaa/image/upload/v1663668559/264122074_602831950827013_3281319128930583279_n_wonjio.png"
                                        height='144px'
                                        width='248px'
                                        alt=''></img> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact