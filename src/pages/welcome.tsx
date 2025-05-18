import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex justify-center text-center">
      <h1 className="text-[60px] font-bold flex flex-col justify-center">
        Welcome
        <Link to="/lesson">
          <span className="text-[16px] font-normal cursor-pointer hover:text-blue-500">
            👉 Go to lesson list
          </span>
        </Link>
      </h1>
    </div>
  );
}
