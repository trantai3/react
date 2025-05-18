import {
  Button,
  Checkbox,
  Popover,
  Table,
  type CheckboxChangeEvent,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
type Products = {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
};
const Lesson5 = () => {
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
  ];
  const [data, setData] = useState<Products[]>([]);
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    columns.map((col) => col.key as string)
  );
  const visibleColumns = columns.filter((col) =>
    selectedColumnKeys.includes(col.key as string)
  );
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://dummyjson.com/products");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const products: Products[] = response.data.products.map((item: any) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        price: item.price,
        stock: item.stock,
      }));
      setData(products);
    };
    fetchData();
  }, []);
  const onChange = (e: CheckboxChangeEvent, col: (typeof columns)[number]) => {
    const key = col.key as string;
    setSelectedColumnKeys((prev) =>
      e.target.checked ? [...prev, key] : prev.filter((item) => item !== key)
    );
  };

  return (
    <div>
      <Popover
        trigger="click"
        content={
          <>
            {columns.map((col) => (
              <Checkbox
                key={col.key}
                checked={selectedColumnKeys.includes(col.key as string)}
                onChange={(e) => onChange(e, col)}
              >
                {col.title}
              </Checkbox>
            ))}
            <div style={{ marginTop: 8 }}>
              <Button
                size="small"
                onClick={() =>
                  setSelectedColumnKeys(columns.map((c) => c.key as string))
                }
              >
                Restore Defaults
              </Button>
            </div>
          </>
        }
      >
        <Button>Column Settings</Button>
      </Popover>

      <Table
        columns={visibleColumns}
        dataSource={data}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    </div>
  );
};

export default Lesson5;
