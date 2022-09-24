import { Button, Dropdown, Menu, notification } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
import { FaCircle } from 'react-icons/fa'
import Item from "./item";

const Notification = () => {
    let count = false;
    const openNotification = () => {
        notification.open({
            message: "Notification Title",
            description:
                "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
            onClick: () => {
                console.log("Notification Clicked!");
            },
        });
    };

    const [notify, setNotify] = useState([]);
    const cookies = new Cookies();

    const getNotify = () => {
        axiosService.get(
            `notification?user_id=${cookies.get(
                "userID"
            )}&type_account=${localStorage.getItem("role")}`
        ).then((res) => {
            if (res.data) {
                setNotify(res.data);
            }
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getNotify();
        }, 5 * 1000);
        return () => clearInterval(interval);
    }, []);

    const items = () => {
        let rs = [];
        for (let index = 0; index < notify.length; index++) {
            const arr = {
                key: notify[index].id,
                label: (
                    <Item hasRead={notify[index].has_read} content={notify[index].content} type={notify[index]} id={notify[index].id} invest_id={notify[index].invest_id} borrow_id={notify[index].borrow_id} />
                ),
            }
            rs.push(arr);
            if (notify[index].has_read === null) {
                count = true;
            }
        }
        return rs;
    }

    useEffect(() => {
        items();
    }, [notify])

    const menu = (
        <Menu
            items={items()}
        />
    );

    return (
        <Dropdown overlayStyle={{ overflowY: 'inherit' }} overlay={menu} placement="bottomRight" arrow>
            <Button className="position-absolute notification">
                {count && <FaCircle className="notify-circle" />}
                <IoIosNotificationsOutline className="noti-icon" />
            </Button>
        </Dropdown>
    );
};

export default Notification;
