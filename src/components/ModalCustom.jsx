import { Modal } from "antd";
import React from "react";

function ModalCustom({
  isOpenDeleteModal,
  setIsOpenDeleteModal,
  sureDeleteProduct,
  title,
}) {
  return (
    <Modal
      title={title}
      
      open={isOpenDeleteModal}
      onOk={sureDeleteProduct}
      onCancel={() => setIsOpenDeleteModal(false)}
    ></Modal>
  );
}

export default ModalCustom;
