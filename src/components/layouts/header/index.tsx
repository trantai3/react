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
    <div className="flex h-full justify-between items-center">
      <Link className="!text-black" to="/lesson">
        <span className="px-[12px] py-[8px] rounded-[8px] hover:bg-[#F3F4F6]">
          All lesson
        </span>
      </Link>
      <b className="text-black">Bài thực hành react ( ts required )</b>
      <Button
        style={{
          backgroundColor: "rgb(96 165 250 / 1)",
          color: "white",
          borderRadius: "4px",
        }}
        className="bg-[rgb(96 165 250 / 1)]"
        onClick={handleLogout}
      >
        Log out
      </Button>
    </div>
  );
};

export default Header;
