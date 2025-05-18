import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { logout } from "../../../store/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex justify-between">
      <Link to="/lesson">
        <Button type="primary">All lesson</Button>
      </Link>
      <b className="text-[24px] text-[#1677ff]">
        Bài thực hành react ( ts required )
      </b>
      <Button type="primary" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default Header;
