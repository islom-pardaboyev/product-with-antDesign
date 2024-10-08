import React from "react";
import { Select } from "antd";
const SelectCustom = ({ setProductType, productType }) => {
  function handleChange(id) {
    setProductType(id);console.log(id);
    
  }
  return (
    <Select
      size="large"
      allowClear
      value={productType}
      onChange={handleChange}
      className="w-full"
      placeholder="Choose Product Type"
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: "1",
          label: "Mevalar",
        },
        {
          value: "2",
          label: "Sabzavot",
        },
        {
          value: "3",
          label: "Ziravorlar",
        },
      ]}
    />
  );
};
export default SelectCustom;
