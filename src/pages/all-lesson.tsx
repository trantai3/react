import { Flex } from "antd";
import { Link } from "react-router-dom";
const allLessons = [
  {
    title: "Lesson 1",
    link: "/lesson/1",
  },
  {
    title: "Lesson 2",
    link: "/lesson/2",
  },
  {
    title: "Lesson 3",
    link: "/lesson/3",
  },
  {
    title: "Lesson 4",
    link: "/lesson/4",
  },
  {
    title: "Lesson 5",
    link: "/lesson/5",
  },
  {
    title: "Lesson 6",
    link: "/lesson/6",
  },
  {
    title: "Lesson 7",
    link: "/lesson/7",
  },
  {
    title: "Lesson 8",
    link: "/lesson/8",
  },
];
const AllLesson = () => {
  return (
    <Flex className="!p-[32px] flex-wrap content-start gap-[24px] border-t border-l border-[#ccc] h-screen">
      {allLessons.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="flex items-center w-[calc(33.333%-16px)] h-[100px] border !rounded-[4px] !bg-[#94a3b8] border-gray-300 !p-[32px]  box-border !text-black"
        >
          <p>{item.title}</p>
        </Link>
      ))}
    </Flex>
  );
};

export default AllLesson;
