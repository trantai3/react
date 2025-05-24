import { useEffect, useState } from "react";
import { Card, Pagination, Image } from "antd";
import { usePagination } from "../hooks/usePagination";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  rating: number;
  stock: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const skip = (currentPage - 1) * pageSize;
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}`
        );
        setProducts(response.data.products);
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

  return (
    <div className="container mx-auto p-5 border-t border-l border-[#ccc]">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable
            cover={
              <Image
                alt={product.title}
                src={product.thumbnail}
                className="h-48 object-cover"
              />
            }
          >
            <Card.Meta
              title={product.title}
              description={
                <div>
                  <p className="text-lg font-bold text-blue-600">
                    ${product.price}
                  </p>
                  <p className="text-gray-600">{product.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">
                      Rating: {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              }
            />
          </Card>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePageChange}
          onShowSizeChange={(_, size) => handlePageSizeChange(size)}
          showSizeChanger
          showTotal={(total) => `Tổng số ${total} items`}
        />
      </div>
    </div>
  );
};

export default Products;
