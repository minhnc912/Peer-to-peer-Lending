import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { formatPhoneNumberDisplay } from "../../ulti/ultil";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";

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
        fname: {
            valid: false,
            msg: "",
        },
        lname: {
            valid: false,
            msg: "",
        }
    });
    const valid = () => {
        const temp = {
            phone: {
                valid: false,
                msg: "",
            },
            fname: {
                valid: false,
                msg: "",
            },
            lname: {
                valid: false,
                msg: "",
            }
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
        if (!fname) {
            temp.fname.valid = true;
            temp.fname.msg = "Please input first name";
        } else {
            temp.fname.valid = false;
            temp.fname.msg = "";
        }
        if (!lname) {
            temp.lname.valid = true;
            temp.lname.msg = "Please input last name";
        } else {
            temp.lname.valid = false;
            temp.lname.msg = "";
        }

        setValidation(temp);
        return !temp.phone.valid && !temp.fname.valid && !temp.lname.valid;
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
                title: 'Your phone has verify'
            })
        })
    }

    const handleOk = () => {
        const validation = valid();
        if (validation) {
            updateInfo();
        }
    };


    return (
        <>
            <Modal
                title="Edit phone number"
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
                        value={fname}
                        placeholder="Enter new first name"
                        onChange={(e) => setFname(e.target.value)}
                        maxLength={12}
                    />
                    {validation.fname.valid && (
                        <div className="text-danger">{validation.fname.msg}</div>
                    )}
                    <Input
                        style={{ marginTop: "10px" }}
                        value={lname}
                        placeholder="Enter new last name"
                        onChange={(e) => setLname(e.target.value)}
                        maxLength={12}
                    />
                    {validation.lname.valid && (
                        <div className="text-danger">{validation.lname.msg}</div>
                    )}
                    <Input
                        style={{ marginTop: "10px" }}
                        value={birth}
                        placeholder="Enter new birth day"
                        onChange={(e) => setBirth(e.target.value)}
                        maxLength={12}
                        type='date'
                    />
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
                    <TextArea
                        style={{ marginTop: "10px" }}
                        value={address}
                        placeholder="Enter new addresss"
                        onChange={(e) => setAddress(e.target.value)}
                        type='text'
                    />

                </Input.Group>

            </Modal>

        </>
    );
};

export default PhoneNumberEdit;
