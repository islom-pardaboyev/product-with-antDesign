import React, { useContext, useEffect, useState } from "react";
import TableCustom from "../components/TableCustom";
import axios from "axios";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/Context";

function Home() {
  const { products, setProducts } = useContext(MainContext);
  const typeProduct = ["Mevalar", "Sabzavotlar", "Ziravorlar"];
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios("http://localhost:3000/products").then((res) => {
      res.data.map((item, index) => {
        item.productType = typeProduct[item.productType - 1];
        item.key = Math.random();
        item.index = index + 1;
        item.action = (
          <div className="flex space-x-2">
            <button
              onClick={() => handleDeleteProduct(item.id)}
              className="w-[30px] bg-red-500 text-white border-red-500 hover:border-red-500 hover:bg-transparent  hover:text-red-500 duration-300 h-[30px] rounded-full border "
            >
              <DeleteOutlined />
            </button>
            <button
              onClick={() => navigate(`/update/${item.id}`)}
              className="w-[30px] bg-green-500 text-white border-green-500 hover:border-green-500 hover:bg-transparent  hover:text-green-500 duration-300 h-[30px] rounded-full border "
            >
              <EditOutlined />
            </button>
            <button
              onClick={() => navigate(`/${item.id}`)}
              className="w-[30px] bg-sky-500 text-white border-sky-500 hover:border-sky-500 hover:bg-transparent  hover:text-sky-500 duration-300 h-[30px] rounded-full border rotate-90"
            >
              <MoreOutlined />
            </button>
          </div>
        );
      }),
        setProducts(res.data);
      setIsLoading(false);
    });
  }, [refresh]);
  function handleDeleteProduct(id) {
    axios.delete(`http://localhost:3000/products/${id}`).then((res) => {
      setIsLoading(true);
      setTimeout(() => {
        setRefresh(!refresh);
        toast.success("Ma'lumot O'chirildi");
      }, 300);
    });
  }

  function handeSearchProduct(e) {
    const value = e.target.value;
    const filteredProduct = products.filter((item) =>
      item.productName.toLowerCase().includes(value.toLowerCase())
    );
    setIsLoading(true);
    if (value) {
      setTimeout(() => {
        setProducts(filteredProduct);
        setIsLoading(false);
      }, 800);
    }else{
       setTimeout(() => {
        setRefresh(!refresh)
        setIsLoading(false)
       }, 800);
    }
  }
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[25px] font-bold">Products</h2>
          <p className="text-[15px] text-slate-500">
            Products ({products.length})
          </p>
        </div>
        <Button
          onClick={() => navigate("/add-products")}
          className="!bg-[#8b5800] hover:opacity-80 active:shadow-2xl"
          type="primary"
          htmlType="submit"
          size="large "
        >
          Add Product
        </Button>
      </div>
      <div className="mt-5">
        <Input
          onChange={handeSearchProduct}
          className="p-2 w-[300px]"
          size="large"
          allowClear
          placeholder="Search Product By Name"
        />
      </div>
      <div className="mt-10">
        <TableCustom isLoading={isLoading} products={products} />
      </div>
    </div>
  );
}

export default Home;
