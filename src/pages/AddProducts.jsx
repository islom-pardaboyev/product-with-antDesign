import { Button, DatePicker, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import SelectCustom from "../components/SelectCustom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../context/Context";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAxios } from "../hook/useAxios";
import dayjs from "dayjs";

function AddProducts() {
  const { products, setProducts } = useContext(MainContext);
  const date = new Date();
  const newDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    0
  )} -${String(date.getDate()).padStart(2, 0)}`;
  const navigate = useNavigate();
  const typeProduct = ["Mevalar", "Sabzavotlar", "Ziravorlar"];
  const { id } = useParams();
  const [productName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productType, setProductType] = useState(null);
  const [productDate, setProductDate] = useState();
  const onChange = (date, dateString) => {
    setProductDate(dateString);
  };
  function handleAddProductSubmit(e) {
    e.preventDefault();
    const data = {
      productName,
      productPrice,
      productDate,
      productType,
    };
    if (id) {
      data.id = id;
      useAxios()
        .put(`products/${id}`, data)
        .then((res) => {
          toast.success("Successfully Added!");
          setTimeout(() => {
            navigate("/");
          }, 800);
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    } else {
      useAxios()
        .post("products", data)
        .then((res) => {
          toast.success("Successfully Added!");
          setTimeout(() => {
            navigate("/");
          }, 800);
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    }
  }

  // update part start
  const dateFormat = "YYYY-MM-DD ";
  useEffect(() => {
    if (id) {
      useAxios()
        .get(`products/${id}`)
        .then((res) => {
          setProductName(res.data.productName);
          setProductPrice(res.data.productPrice);
          setProductType(res.data.productType);
          setProductDate(res.data.productDate);
        });
    }
  }, []);
  // update part end
  return (
    <form onSubmit={handleAddProductSubmit}>
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="scale-125" />
          </button>
          <h2 className="text-[25px] font-bold">
            {id ? "Update" : "Add"} Product
          </h2>
        </div>
        <Button
          className="!bg-[#8b5800] hover:opacity-80 active:shadow-2xl"
          type="primary"
          htmlType="submit"
          size="large "
        >
          {id ? "Update" : "Add"} Product
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
        <SelectCustom
          productType={productType}
          setProductType={setProductType}
        />
        <DatePicker
          value={productDate ? dayjs(productDate, dateFormat) : null}
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
