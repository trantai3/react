import { Button } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between">
      <Link to="/lesson">
        <Button type="primary">All lesson</Button>
      </Link>
      <b className="text-[24px] text-[#1677ff]">
        Bài thực hành react ( ts required )
      </b>
      <Link to="">
        <Button type="primary">Log out</Button>
      </Link>
    </div>
  );
};

export default Header;
