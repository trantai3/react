/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Pagination,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePagination } from "../hooks/usePagination";
interface Products {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
}
const Lesson9 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Products | null>(null);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const handleEdit = (record: Products) => {
    setEditingRecord(record);
    form1.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form1.validateFields();
      if (editingRecord) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === editingRecord.id ? { ...item, ...values } : item
          )
        );
        setIsModalOpen(false);
        form1.resetFields();
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form1.resetFields();
  };

  const handleDelete = (id: number) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không ?");
    if (isConfirmed) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
    window.confirm("Xóa thành công!");
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: Products, b: Products) => a.id - b.id,
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Products, b: Products) => a.title.localeCompare(b.title),
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
      sorter: (a: Products, b: Products) =>
        a.category.localeCompare(b.category),
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      sorter: (a: Products, b: Products) => a.price - b.price,
    },
    {
      title: "stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a: Products, b: Products) => a.stock - b.stock,
    },
    {
      title: "action",
      key: "action",
      render: (_: any, record: Products) => (
        <div className="flex gap-3">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  const [data, setData] = useState<Products[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination({
      totalItems,
      initialPageSize: 10,
    });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = (currentPage - 1) * pageSize;
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}`
        );
        const products: Products[] = response.data.products.map(
          (item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            price: item.price,
            stock: item.stock,
          })
        );
        setData(products);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [currentPage, pageSize]);
  const handleAdd = () => {
    setIsModalAddOpen(true);
  };
  const handleCancelAdd = () => {
    setIsModalAddOpen(false);
  };
  const handleAddOk = async () => {
    try {
      const values = await form2.validateFields();
      const newId = Math.max(...data.map((item) => item.id)) + 1;
      setData((prevData) => [...prevData, { ...values, id: newId }]);
      setIsModalAddOpen(false);
      form2.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  return (
    <div>
      <Button onClick={handleAdd}>Thêm mới</Button>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Pagination
        className="flex justify-center"
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
        onShowSizeChange={(_, size) => handlePageSizeChange(size)}
        showSizeChanger
        showTotal={(total) => `Tổng số ${total} items`}
      />
      <Modal
        title="Edit Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form1} layout="vertical">
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <InputNumber className="!w-full" min={0} />
          </Form.Item>
          <Form.Item name="stock" label="Stock">
            <InputNumber className="!w-full" min={0} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Product"
        open={isModalAddOpen}
        onOk={handleAddOk}
        onCancel={handleCancelAdd}
      >
        <Form form={form2} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber className="!w-full" min={0} />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please input the stock!" }]}
          >
            <InputNumber className="!w-full" min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Lesson9;
