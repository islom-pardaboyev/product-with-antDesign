import React, { useContext, useEffect, useState } from "react";
import TableCustom from "../components/TableCustom";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/Context";

function Home() {
  const {products, setProducts} = useContext(MainContext)
  const typeProduct = ["Mevalar", "Sabzavotlar", "Ziravorlar"];
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    axios("http://localhost:3000/products").then((res) => {
      res.data.map((item, index) => {
        item.productType = typeProduct[item.productType - 1];
        item.key = Math.random();
        item.index = index + 1
        item.action = (
          <div className="flex space-x-2">
            <button
              onClick={() => handleDeleteProduct(item.id)}
              className="w-[30px] bg-red-500 text-white border-red-500 hover:border-red-500 hover:bg-transparent  hover:text-red-500 duration-300 h-[30px] rounded-full border "
            >
              <DeleteOutlined />
            </button>
            <button className="w-[30px] bg-green-500 text-white border-green-500 hover:border-green-500 hover:bg-transparent  hover:text-green-500 duration-300 h-[30px] rounded-full border">
              <EditOutlined />
            </button>
          </div>
        );
      }),
        setProducts(res.data);
        setIsLoading(false)
    });
  }, [refresh]);
  function handleDeleteProduct(id) {
    axios.delete(`http://localhost:3000/products/${id}`).then((res) => {
      setIsLoading(true);
      setTimeout(() => {
        setRefresh(!refresh);
        toast.success("Ma'lumot O'chirildi")
      }, 300);
    });

    
  }
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[25px] font-bold">Mahsulotlar</h2>
          <p className="text-[15px] text-slate-500">Mahsulot ({products.length})</p>
        </div>
        <Button onClick={() => navigate('/add-products')}
          className="!bg-[#8b5800] hover:opacity-80 active:shadow-2xl"
          type="primary"
          htmlType="submit"
          size="large "
        >
          Add Product
        </Button>
      </div>
      <div className="mt-10">
        <TableCustom isLoading={isLoading} products={products} />
      </div>
    </div>
  );
}

export default Home;
