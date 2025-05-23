import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
const items = [
  {
    key: "/lesson/1",
    label: (
      <Link className="font-medium" to="/lesson/1">
        Lesson 1
      </Link>
    ),
  },
  {
    key: "/lesson/2",
    label: (
      <Link className="font-medium" to="/lesson/2">
        Lesson 2
      </Link>
    ),
  },
  {
    key: "/lesson/3",
    label: (
      <Link className="font-medium" to="/lesson/3">
        Lesson 3
      </Link>
    ),
  },
  {
    key: "/lesson/4",
    label: (
      <Link className="font-medium" to="/lesson/4">
        Lesson 4
      </Link>
    ),
  },
  {
    key: "/lesson/5",
    label: (
      <Link className="font-medium" to="/lesson/5">
        Lesson 5
      </Link>
    ),
  },
  {
    key: "/lesson/6",
    label: (
      <Link className="font-medium" to="/lesson/6">
        Lesson 6
      </Link>
    ),
  },
  {
    key: "/lesson/7",
    label: (
      <Link className="font-medium" to="/lesson/7">
        Lesson 7
      </Link>
    ),
  },
  {
    key: "/lesson/8",
    label: (
      <Link className="font-medium" to="/lesson/8">
        Lesson 8
      </Link>
    ),
  },
  {
    key: "/lesson/9",
    label: (
      <Link className="font-medium" to="/lesson/9">
        Lesson 9
      </Link>
    ),
  },
];
const Sider = () => {
  const location = useLocation();
  const isAllLessons = location.pathname;
  const isSelected = isAllLessons === "/lesson" ? [] : [isAllLessons];
  return (
    <div>
      <Menu
        mode="inline"
        items={items}
        selectedKeys={isSelected}
        className="[&_.ant-menu-item-selected]:!bg-[#4ade80] [&_.ant-menu-item-selected]:!text-black !text-[16px] border-t border-[#ccc]"
      />
    </div>
  );
};

export default Sider;
