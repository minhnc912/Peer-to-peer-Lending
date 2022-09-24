import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { formatPhoneNumberDisplay } from "../../ulti/ultil";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { API_KEY } from "../helper/constant";

const PhoneNumberEdit = (props) => {
    const S3_BUCKET = 'demo-s3-images';
    const REGION = 'US East (N. Virginia) us-east-1';
    const ACCESS_KEY = 'AKIAYMKLOZHQUHKWSNYM';
    const SECRET_ACCESS_KEY = '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';

    const config = {
        bucketName: S3_BUCKET,
        region: REGION,
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    }
    const { visibleModal, setVisibleModal, info, setVisible, setOtpID } = props;

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [phone, setPhone] = useState(`${info.user.phone_number ? `0${((info.user.phone_number || '').slice(3, (info.user.phone_number || '').length))}` : ''}`);
    const [address, setAddress] = useState(info.user.adress || '');
    const [fname, setFname] = useState(info.user.first_name || '');
    const [lname, setLname] = useState(info.user.last_name || '');
    const [birth, setBirth] = useState(moment(info.user.birth).format('YYYY-MM-DD') || '');
    const phoneRegExp = new RegExp("^[0-9]{9,25}$");
    const cookie = new Cookies();
    const [validation, setValidation] = useState({
        phone: {
            valid: false,
            msg: "",
        },
    });
    const valid = () => {
        const temp = {
            phone: {
                valid: false,
                msg: "",
            },
        };
        if (!phone) {
            temp.phone.valid = true;
            temp.phone.msg = "Please input phone number";
        } else if (!phoneRegExp.test(phone.replaceAll(/\s/g, ""))) {
            temp.phone.valid = true;
            temp.phone.msg = "Phone number has to be digits";
        } else {
            temp.phone.valid = false;
            temp.phone.msg = "";
        }

        setValidation(temp);
        return !temp.phone.valid;
    };
    const handleCancel = () => {
        setTimeout(() => {
            setVisibleModal(false);
            Modal.destroyAll();
        }, 100);
    };
    const updateInfo = () => {
        const id = cookie.get('userID');
        setConfirmLoading(true);
        const body = {
            user_id: cookie.get('userID'),
            first_name: fname.trim(),
            last_name: lname.trim(),
            birthday: birth,
            gender: info.user.gender,
            phone_number: `+84 ${phone.slice(1, phone.length).trim()}`,
            adress: address.trim(),
        }
        axiosService.post(`/user/update_information`, body).then((res) => {
            if (res.status === 200) {
                verifyPhone();
            }
        }).catch(err => {
            setConfirmLoading(false);
            Modal.error({
                title: err.response.data,
            })
        })
    }

    const verifyPhone = () => {
        setConfirmLoading(true);
        const body = {
            user_id: cookie.get('userID')
        }
        axiosService.post('otp/verify_phone', body).then((res) => {
            if (res.status === 200) {
                setOtpID(res.data);
                setVisible(true);
                setConfirmLoading(false);
            }
        }).catch(err => {
            setConfirmLoading(false);
            setVisibleModal(false);
            setVisible(false);
            Modal.error({
                title: err.response.data,
            })
        })
    }

    const handleOk = () => {
        const validation = valid();
        if (validation) {
            updateInfo();
        }
    };

    const handleIdFrontIMG = (e) => {
        const file = e.target.files[0];
        const body = new FormData();
        body.append('image', file);
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
                } else {
                    if (resFront.data[0].type === 'old_back' || resFront.data[0].type === 'new_back') {
                        Modal.error({
                            title: 'Please input front of ID card',
                        })
                    }
                }
            })
    }

    const handleIdBackIMG = (e) => {
        const file = e.target.files[0];
        const body = new FormData();
        body.append('image', file);
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
                } else {
                    if (resFront.data[0].type === 'old' || resFront.data[0].type === 'new') {
                        Modal.error({
                            title: 'Please input back of ID card',
                        })
                    }
                }
            })
    }


    return (
        <>
            <Modal
                title="Update phone number"
                closable={false}
                visible={visibleModal}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                maskClosable={true}
                cancelText="Cancel"
                okText="Confirm"
            >
                <Input.Group
                    compact
                    className="col-12 "
                >
                    <Input
                        style={{ marginTop: "10px" }}
                        value={`${formatPhoneNumberDisplay(phone)}`}
                        placeholder="Enter new phone number"
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={12}
                    />
                    {validation.phone.valid && (
                        <div className="text-danger">{validation.phone.msg}</div>
                    )}
                </Input.Group>

            </Modal>

        </>
    );
};

export default PhoneNumberEdit;
