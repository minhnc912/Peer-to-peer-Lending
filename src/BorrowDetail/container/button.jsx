
import { Button } from "antd";
import { Modal } from "antd";
import { axiosService } from "../../axiosService";
const ButtonDetail = (props) => {
    const { title, api, id, getDetail } = props;

    const postData = () => {
        axiosService.post(api.replace('$$ID$$', id))
            .then((res) => {
                if (res.status === 200) {
                    Modal.success({
                        title: `Your borrow request has ${title}`,
                        maskClosable: true,
                    })
                    getDetail();
                }
            })
            .catch((err) => {
                Modal.error({
                    title: err.response.data,
                    maskClosable: true,
                })
            });
    }
    return (
        <Button onClick={() => postData()} className={`borrow_detail_btn col-4 ${title === 'Start now' ? 'borrow_create_start' : 'borrow_create_cancel'}`}>
            {title}
        </Button>
    );
}
export default ButtonDetail;