import Notification from "../../components/notification/Notification";
import SelectRole from "../../ServicePage/container/selectRole";

const HeaderTitle = (props) => {
    const { title, roles, setRoles } = props;
    return (
        <div className="header-lending position-relative">
            <h4 className="text-white text-uppercase text-center py-3">
                {title}
                <SelectRole roles={roles} setRoles={setRoles} />
                <Notification />{" "}
            </h4>
        </div>
    );
};

export default HeaderTitle;
