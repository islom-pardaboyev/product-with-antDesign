import React, { useState } from "react";
import { MinusOutlined, ProductOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Logo from "../assets/images/linux.svg";
import { Link } from "react-router-dom";
const items = [
  {
    key: "1",
    icon: <ProductOutlined className="scale-[1.5]" />,
    label: <p className="text-[22px]">Products</p>,
    children: [
      {
        key: "11",
        label: <Link to={"/"}>All Product</Link>,
        icon: <MinusOutlined />,
      },
    ],
  },
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);
const Navbar = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <div className="w-full h-screen">
      <div className="h-[15%] bg-[#001529] flex items-center">
        <img width={100} src={Logo} alt="" />
        <h1 className="text-white text-[22px ]">My Product</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["231"]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{
          width: "100%",
          height: "85%",
        }}
        items={items}
      />
    </div>
  );
};
export default Navbar;
