import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hook/useAxios";
import ModalCustom from "../components/ModalCustom";

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleData, setSingleData] = useState({});
  const typeProduct = ["Mevalar", "Sabzavotlar", "Ziravorlar"];
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  useEffect(() => {
    useAxios()
      .get(`products/${id}`)
      .then((res) => {
        setSingleData(res.data);
      });
  }, []);

  // delete part start
  function sureDeleteProduct() {
    useAxios().delete(`/products/${id}`).then(res => {
      setIsOpenDeleteModal(false)
      setTimeout(() => {
        navigate('/')
        toast.success("Successfully Deleted!");
      }, 300);
    }) .catch(err => toast.err("You have some arror"));
  }
  // delete part end
  return (
    <div className="p-5">
      
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="scale-125" />
          </button>
          <h2 className="text-[25px] font-bold">{singleData.productName}</h2>
        </div>
        <div className="flex items-center gap-5">
          <Button
            onClick={() => navigate(`/update/${id}`)}
            className="!bg-[#8b5800] hover:opacity-80 active:shadow-2xl"
            type="primary"
            htmlType="submit"
            size="large"
          >
            Update Product
          </Button>
          <Button
            onClick={() => setIsOpenDeleteModal(true)}
            className="!bg-red-600 hover:opacity-80 active:shadow-2xl"
            type="primary"
            htmlType="submit"
            size="large"
          >
            Delete Product
          </Button>
        </div>
      </div>
      <ul className="w-[50%] mt-10 p-5 rounded-lg border-2 border-black flex flex-col gap-8">
        <div className="flex flex-col">
          <span className="text-xs text-slate-600">Product Name</span>
          <strong className="text-2xl leading-4 capitalize">
            {singleData.productName}
          </strong>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-600">Product Price</span>
          <strong className="text-2xl leading-4 capitalize">
            {singleData.productPrice}
          </strong>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-600">Product Type</span>
          <strong className="text-2xl leading-4 capitalize">
            {typeProduct[singleData.productType - 1]}
          </strong>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-600">Product Date</span>
          <strong className="text-2xl leading-4 capitalize">
            {singleData.productDate}
          </strong>
        </div>
      </ul>
      <ModalCustom
        title={"Are you sure delete this product"}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        sureDeleteProduct={sureDeleteProduct}
      />
    </div>
  );
}

export default SingleProduct;
