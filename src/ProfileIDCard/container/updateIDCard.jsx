import { Modal } from 'antd';
import React from 'react'


const UpdateIDCard = (props) => {
    const { visibleModal, setVisibleModal, setVisible } = props;
    const handleOK = () => {
        setVisible(false);
        setVisibleModal(false);
    }

    const handleCancel = () => {
        setTimeout(() => {
            setVisibleModal(false);
            Modal.destroyAll();
        }, 100);
    };

    return (
        <>
            <Modal title="Update Id Card"
                closable={false}
                visible={visibleModal}
                onOk={handleOK}
                onCancel={handleCancel}
                maskClosable={true}
                cancelText="Cancel"
                okText="Confirm">
                <div className='d-flex col-12 mb-5'>
                    <div className='col-6'>
                        <p>Photo of the front of the ID card</p>
                        <input type='file'></input>
                    </div>
                    <div className='col-6'>
                        <p>Photo of the back of the ID card</p>
                        <input type='file'></input>
                    </div>
                </div>
                <div>
                    <p>Photo of your real face (No: glasses, hats, masks)</p>
                    <input type='file'></input>
                </div>

            </Modal>
        </>
    );
}

export default UpdateIDCard