import { Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";
import "../styleComponent/ProfileIDCard.css";
import { API_KEY } from "../../AccountProfile/helper/constant";
import { Modal } from "antd";
import { axiosService } from "../../axiosService";

const ProfileIDCard = () => {
    const [loadingFront, setLoadingFront] = useState(false);
    const [loadingBack, setLoadingBack] = useState(false);

    const [info, setInfo] = useState();
    const [idFrontImage, setIdFrontImage] = useState('');
    const [idBackImage, setIdBackImage] = useState('');

    const getData = () => {
        axiosService
            .get(`/user/get_detail`)
            .then((res) => {
                if (res.data) {
                    setInfo(res.data.user.identification);
                    setIdFrontImage(res.data.user.identification.img_front);
                    setIdBackImage(res.data.user.identification.img_back);
                }
            })
            .catch((err) => {
                Modal.error({
                    title: err.response.data,
                    maskClosable: true,
                });
            });

    };
    useEffect(() => {
        getData();
    }, [])

    const onInputClick = (event) => {
        const element = event.target
        element.value = ''
    }
    const saveFrontImg = (url) => {
        axiosService.post('save_link', {
            type_img: 1,
            url: url,
        }).then(res => {
            if (res.status === 200) {
                Modal.success({
                    title: 'Update front image Successfully',
                })
            }
        }).catch(err => {
            Modal.error({
                title: err.response.data,
                maskClosable: true,
            });
        })
    }
    const saveBackImg = (url) => {
        axiosService.post('save_link', {
            type_img: 2,
            url: url,
        }).then(res => {
            if (res.status === 200) {
                Modal.success({
                    title: 'Update back image Successfully',
                })
            }
        }).catch(err => {
            Modal.error({
                title: err.response.data,
                maskClosable: true,
            });
        })
    }

    const uploadFrontImg = (file) => {
        const formdata = new FormData();
        formdata.append('upload_preset', 'gkwmyrco');
        formdata.append('file', file);
        fetch('https://api.cloudinary.com/v1_1/douchplum/image/upload', {
            method: 'POST',
            body: formdata,
        })
            .then(response => response.text())
            .then(result => {
                setIdFrontImage(JSON.parse(result).url);
                setLoadingFront(false);
                saveFrontImg(JSON.parse(result).url);
            })
            .catch(err => {
                Modal.error({
                    title: err.response.data,
                    maskClosable: true,
                });
                setLoadingFront(false);
            });
    }

    const uploadBackImg = (file) => {
        const formdata = new FormData();
        formdata.append('upload_preset', 'gkwmyrco');
        formdata.append('file', file);
        fetch('https://api.cloudinary.com/v1_1/douchplum/image/upload', {
            method: 'POST',
            body: formdata,
        })
            .then(response => response.text())
            .then(result => {
                setIdBackImage(JSON.parse(result).url);
                setLoadingBack(false);
                saveBackImg(JSON.parse(result).url);
            })
            .catch(err => {
                Modal.error({
                    title: err.response.data,
                    maskClosable: true,
                });
                setLoadingBack(false);
            });
    }


    const handleIdFrontIMG = (e) => {
        const file = e.target.files[0];
        const body = new FormData();
        body.append('image', file);
        setLoadingFront(true);
        fetch('https://api.fpt.ai/vision/idr/vnm/', {
            method: 'POST',
            headers: {
                "api-key": API_KEY
            },
            body
        }).then((res) => res.json())
            .then((resFront) => {
                if (resFront.errorCode !== 0) {
                    Modal.error({
                        title: resFront.errorMessage,
                    })
                    setLoadingFront(false);
                } else {
                    if (resFront.data[0].type === 'old_back' || resFront.data[0].type === 'new_back') {
                        Modal.error({
                            title: 'Please input front of ID card',
                        })
                        setLoadingFront(false);
                    } else {
                        const body = {
                            "id": resFront.data[0].id,
                            "name": resFront.data[0].name,
                            "dob": resFront.data[0].dob,
                            "home": resFront.data[0].home,
                            "address": resFront.data[0].address,
                            "type_new": resFront.data[0].type,
                            "id_prob": resFront.data[0].id_prob,
                            "name_prob": resFront.data[0].name_prob,
                            "dob_prob": resFront.data[0].dob_prob,
                            "home_prob": resFront.data[0].home_prob,
                            "address_prob": resFront.data[0].address_prob
                        }
                        axiosService.post('user/update_identification', body).then(
                            res => {
                                if (res) {
                                    uploadFrontImg(file);
                                    getData();
                                }
                            }
                        )
                    }
                }
            })
    }
    const handleIdBackIMG = (e) => {
        const file = e.target.files[0];
        const body = new FormData();
        body.append('image', file);
        setLoadingBack(true);
        fetch('https://api.fpt.ai/vision/idr/vnm/', {
            method: 'POST',
            headers: {
                "api-key": API_KEY
            },
            body
        }).then((res) => res.json())
            .then((resFront) => {
                if (resFront.errorCode !== 0) {
                    Modal.error({
                        title: resFront.errorMessage,
                    })
                    setLoadingBack(false);
                } else {
                    if (resFront.data[0].type === 'old' || resFront.data[0].type === 'new') {
                        Modal.error({
                            title: 'Please input back of ID card',
                        })
                        setLoadingBack(false);

                    } else {
                        Modal.success({
                            title: 'Update back ID Successfully',
                        })
                        uploadBackImg(file);
                    }
                }
            })
    }

    return (
        <div>
            <div className="body-page">
                <div className="container bg-light">
                    <div className="row flex-nowrap">
                        <SideBar />
                        <div className="col-9 container">
                            <HeaderTitle title="id card" />
                            <div className="id_detail mt-3 px-3">
                                <div>
                                    <p>
                                        <b className="text-danger">* </b> ID
                                        Card Number
                                    </p>
                                    <Input
                                        className="id_infor"
                                        value={info?.identification_id}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>Full
                                        Name
                                    </p>
                                    <Input
                                        className="id_infor"
                                        value={info?.name}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>
                                        Date of birth
                                    </p>
                                    <Input
                                        className="id_infor"
                                        value={info?.birth}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <p>
                                        <b className="text-danger">* </b>
                                        Place of origin
                                    </p>
                                    <Input
                                        className="id_infor"
                                        value={info?.home}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>
                                        Address
                                    </p>
                                    <Input
                                        className="id_infor"
                                        value={info?.address}
                                        readOnly
                                    />
                                </div>
                                <div className="d-flex text-center col-12 mt-3">
                                    <div className="col-6">
                                        <Input
                                            id="front"
                                            type="file"
                                            onChange={(e) => handleIdFrontIMG(e)}
                                            onClick={(e) => onInputClick(e)}
                                            hidden
                                        />
                                        <p>
                                            <b className="text-danger">*</b>
                                            Photo of the front of the ID card
                                        </p>
                                        <Spin spinning={loadingFront}>

                                            <label htmlFor="front" className="idcard_image">
                                                <img
                                                    src={`${idFrontImage ? idFrontImage : 'https://res.cloudinary.com/da0i1amaa/image/upload/v1663644650/31284806_rmzfe9.jpg'}`}
                                                    width="200px"
                                                    height="120px"
                                                    className="me-2"
                                                    alt=""
                                                ></img>
                                            </label>

                                        </Spin>
                                    </div>
                                    <div className="col-6">
                                        <p>
                                            <b className="text-danger">*</b>
                                            Photo of the back of the ID card
                                        </p>
                                        <Input
                                            id="back"
                                            type="file"
                                            onChange={(e) => handleIdBackIMG(e)}
                                            onClick={(e) => onInputClick(e)}
                                            hidden
                                        />
                                        <Spin spinning={loadingBack}>

                                            <label htmlFor="back" className="idcard_image">
                                                <img
                                                    src={`${idBackImage ? idBackImage : 'https://res.cloudinary.com/da0i1amaa/image/upload/v1663644650/31284806_rmzfe9.jpg'}`}
                                                    width="200px"
                                                    height="120px"
                                                    className="me-2"
                                                    alt=""
                                                ></img>
                                            </label>

                                        </Spin>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default ProfileIDCard;
