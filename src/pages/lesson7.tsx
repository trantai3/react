import { useEffect, useState } from "react";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  add,
  down,
  remove,
  setList,
  toggleComplete,
  up,
  update,
} from "../store/toDoApp";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
interface Task {
  title: string;
  completed: boolean;
}
const Lesson7 = () => {
  const listTask = useAppSelector((state) => state.toDoApp);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const handleSubmit = (value: { task: string }) => {
    dispatch(add(value.task));
    form.resetFields();
  };

  const handleRemove = (ind: number) => {
    dispatch(remove(ind));
    const updatedList = [...listTask.listToDo];
    updatedList.splice(ind, 1);
    localStorage.setItem(
      "listTasks",
      JSON.stringify({ listToDo: updatedList })
    );
  };

  const handleEdit = (index: number, currentValue: string) => {
    setEditIndex(index);
    setEditValue(currentValue);
  };

  const handleSave = (index: number) => {
    if (editValue.trim() === "") return;
    dispatch(update({ index, editValue }));
    setEditIndex(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
  };

  const handleMoveUp = (index: number) => {
    dispatch(up(index));
  };

  const handleMoveDown = (index: number) => {
    dispatch(down(index));
  };

  const handleSaveTask = () => {
    localStorage.setItem("listTasks", JSON.stringify(listTask));
  };
  useEffect(() => {
    const storedTasks = localStorage.getItem("listTasks");
    if (storedTasks) {
      const parsed = JSON.parse(storedTasks);
      dispatch(setList(parsed));
    }
  }, [dispatch]);

  return (
    <div className="p-5 border-t border-l border-[#ccc] h-screen">
      <p className="mb-5">Tên công việc</p>
      <Form className="flex gap-5" form={form} onFinish={handleSubmit}>
        <Form.Item
          className="flex-1"
          name="task"
          rules={[{ required: true, message: "Vui lòng nhập tên công việc" }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form>

      <Card>
        {listTask.listToDo.map((task: Task, index: number) => (
          <div key={index} className="flex mb-5 items-center gap-3">
            {editIndex === index ? (
              <>
                <p className="text-blue-400">Nhiệm vụ {index + 1}</p>
                <Input
                  className="flex-1"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <Button type="primary" onClick={() => handleSave(index)}>
                  Lưu
                </Button>
                <Button onClick={handleCancel}>Hủy</Button>
              </>
            ) : (
              <>
                <Checkbox
                  checked={task.completed}
                  onChange={() => dispatch(toggleComplete(index))}
                />

                <p className="text-blue-400">Nhiệm vụ {index + 1}</p>
                <input
                  className={`flex-1 ${
                    task.completed ? "line-through text-gray-500" : "black"
                  }`}
                  value={task.title}
                  readOnly
                  disabled
                />

                {index > 0 && (
                  <Button onClick={() => handleMoveUp(index)}>
                    <FaChevronUp />
                  </Button>
                )}
                {index < listTask.listToDo.length - 1 && (
                  <Button onClick={() => handleMoveDown(index)}>
                    <FaChevronDown />
                  </Button>
                )}
                <Button
                  type="primary"
                  onClick={() => handleEdit(index, task.title)}
                >
                  Sửa
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleRemove(index)}
                >
                  Xóa
                </Button>
              </>
            )}
          </div>
        ))}
        {listTask.listToDo.length > 0 && (
          <Button type="primary" onClick={handleSaveTask}>
            Lưu công Việc
          </Button>
        )}
      </Card>
    </div>
  );
};

export default Lesson7;
