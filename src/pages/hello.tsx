import { Button } from "antd";
import { Link } from "react-router-dom";

const Hello = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p className="font-bold text-4xl mb-3">Xin chào</p>
      <div className="flex gap-2">
        <Link to="/login">
          <Button type="primary">Login</Button>
        </Link>
        <Link to="/register">
          <Button type="primary">Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hello;
