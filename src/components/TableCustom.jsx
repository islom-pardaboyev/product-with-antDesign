import React from "react";
import { Table } from "antd";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Nomi",
    dataIndex: "productName",
  },
  {
    title: "Narxi",
    dataIndex: "productPrice",
  },
  {
    title: "Turi",
    dataIndex: "productType",
  },
  {
    title: "Muddati",
    dataIndex: "productDate",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const TableCustom = ({ products, isLoading }) => {
  return (
    <Table
    loading={isLoading}
      columns={columns}
      dataSource={products}
      onChange={onChange}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
    />
  );
};
export default TableCustom;
