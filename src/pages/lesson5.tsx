import {
  Button,
  Checkbox,
  Pagination,
  Popover,
  Table,
  type CheckboxChangeEvent,
  Input,
  Space,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePagination } from "../hooks/usePagination";
import "../assets/styles/lesson5.css";
type Products = {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  discountPercentage?: number;
};

const allColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a: Products, b: Products) => a.id - b.id,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: (a: Products, b: Products) => a.title.localeCompare(b.title),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    sorter: (a: Products, b: Products) => a.category.localeCompare(b.category),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    sorter: (a: Products, b: Products) => a.price - b.price,
  },
  {
    title: "DiscountPercentage",
    dataIndex: "discountPercentage",
    key: "discountPercentage",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
    sorter: (a: Products, b: Products) => a.stock - b.stock,
  },
];

const Lesson5 = () => {
  const [data, setData] = useState<Products[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialPageSize = Number(searchParams.get("pageSize")) || 10;
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination({
      totalItems,
      initialPage,
      initialPageSize,
    });

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    allColumns.map((col) => col.key as string)
  );

  const [tempSelectedColumnKeys, setTempSelectedColumnKeys] =
    useState<string[]>(selectedColumnKeys);

  const [columnSearchText, setColumnSearchText] = useState<string>("");

  // State to control the visibility of the Popover
  const [popoverVisible, setPopoverVisible] = useState(false);

  const visibleColumns = allColumns.filter((col) =>
    selectedColumnKeys.includes(col.key as string)
  );

  const filteredPopoverColumns = allColumns.filter((col) =>
    col.title?.toLowerCase().includes(columnSearchText.toLowerCase())
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const skip = (currentPage - 1) * pageSize;
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}&select=id,title,category,price,stock,description,discountPercentage` // Request specific fields
        );
        setData(response.data.products);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    setSearchParams({
      page: currentPage.toString(),
      pageSize: pageSize.toString(),
    });
    fetchProducts();
  }, [currentPage, pageSize, setSearchParams]);

  const handlePopoverCheckboxChange = (
    e: CheckboxChangeEvent,
    col: (typeof allColumns)[number]
  ) => {
    const key = col.key as string;
    setTempSelectedColumnKeys((prev) =>
      e.target.checked ? [...prev, key] : prev.filter((item) => item !== key)
    );
  };

  const handleColumnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnSearchText(e.target.value);
  };

  const handleRestoreDefaults = () => {
    setTempSelectedColumnKeys(allColumns.map((c) => c.key as string));
    setColumnSearchText("");
  };

  const handleCancel = () => {
    setTempSelectedColumnKeys(selectedColumnKeys);
    setColumnSearchText("");
    setPopoverVisible(false);
  };

  const handleDone = () => {
    setSelectedColumnKeys(tempSelectedColumnKeys);
    setPopoverVisible(false);
  };

  const handlePopoverOpenChange = (visible: boolean) => {
    setPopoverVisible(visible);
    if (visible) {
      setTempSelectedColumnKeys(selectedColumnKeys);
    } else {
      setTempSelectedColumnKeys(selectedColumnKeys);
      setColumnSearchText("");
    }
  };

  const popoverContent = (
    <div style={{ width: 260 }}>
      <h3 className="text-[20px] px-[20px] pt-[16px] font-medium mb-[15px]">
        Columns
      </h3>
      <div className="px-[20px] pb-[16px]">
        <Input
          style={{ borderRadius: 0, padding: "10px 16px" }}
          placeholder="Search"
          value={columnSearchText}
          onChange={handleColumnSearchChange}
        />
      </div>
      <Button
        type="link"
        size="small"
        onClick={handleRestoreDefaults}
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #ccc",
          width: "100%",
          justifyContent: "start",
        }}
      >
        Restore Defaults
      </Button>
      <div
        style={{
          maxHeight: 200,
          overflowY: "auto",
          padding: "0px 20px 16px 20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        {" "}
        {filteredPopoverColumns.map((col) => (
          <div key={col.key} style={{ marginBottom: 4 }}>
            {" "}
            <Checkbox
              checked={tempSelectedColumnKeys.includes(col.key as string)}
              onChange={(e) => handlePopoverCheckboxChange(e, col)}
            >
              {col.title}
            </Checkbox>
          </div>
        ))}
      </div>
      <div className="text-right px-[16px] py-[12px]">
        <Space>
          <Button className="custom-button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="custom-button" onClick={handleDone}>
            Done
          </Button>
        </Space>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="flex justify-end px-4">
        <Popover
          className="mr-[20px]"
          trigger="click"
          content={popoverContent}
          visible={popoverVisible}
          onOpenChange={handlePopoverOpenChange}
          placement="bottomLeft"
        >
          <Button>Column</Button>
        </Popover>
        <div className="flex justify-end">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={handlePageChange}
            onShowSizeChange={(_, size) => handlePageSizeChange(size)}
            showSizeChanger
            showTotal={(total, range) =>
              `${range[0]}–${range[1]} of ${total} items`
            }
          />
        </div>
      </div>
      <Table
        className="p-4"
        bordered
        columns={visibleColumns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default Lesson5;
