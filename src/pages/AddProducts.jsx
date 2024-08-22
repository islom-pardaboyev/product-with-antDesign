import { Button, DatePicker, Input } from "antd";
import React, { useContext, useState } from "react";
import SelectCustom from "../components/SelectCustom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/Context";
import { stringify } from "postcss";

function AddProducts() {
  const { products, setProducts } = useContext(MainContext);
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [productDate, setProductDate] = useState("");
  const onChange = (date, dateString) => {
    setProductDate(dateString);
  };
  function handleAddProductSubmit(e) {
    e.preventDefault();
    const data = {
      id: String(products.length > 0 ? Number(products[products.length - 1].id) + 1 : 1),
      productName,
      productPrice,
      productDate,
      productType,
    };
    axios
      .post("http://localhost:3000/products", data)
      .then((res) => {
        toast.success("Maxsulot Saqlandi!!");
        setTimeout(() => {
          navigate("/");
        }, 800);
        console.log(res.data);
      })
      .catch((err) => toast.error("Xatolik Mavjud!"));
  }
  return (
    <form onSubmit={handleAddProductSubmit}>
      <div className="flex items-center justify-between p-5">
        <h2 className="text-[25px] font-bold">Add Product</h2>
        <Button
          className="!bg-[#8b5800] hover:opacity-80 active:shadow-2xl"
          type="primary"
          htmlType="submit"
          size="large "
        >
          Save Product
        </Button>
      </div>
      <div className="w-[450px] space-y-4 p-5">
        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="p-2"
          allowClear
          required
          name="productName"
          size="large"
          type="text"
          placeholder="Enter Product Name"
        />
        <Input
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="p-2"
          allowClear
          required
          name="productPrice "
          size="large"
          type="number"
          placeholder="Enter Product Price"
        />
        <SelectCustom setProductType={setProductType} />
        <DatePicker
          name="productDate"
          size="large"
          required
          className="w-full p-2"
          onChange={onChange}
        />
      </div>
    </form>
  );
}

export default AddProducts;
