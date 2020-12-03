import { Menu, Tabs } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const { TabPane } = Tabs;

const Navigator = (props, history) => {
  const [current, setCurrent] = useState("todo");

  let handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Header style={{ background: "white" }}>
        <Menu
          onClick={(e) => {
            handleClick(e);
          }}
          selectedKeys={current}
          mode="horizontal"
        >
          <Menu.Item key="todo">
            <Link to="/">Todo</Link>
          </Menu.Item>
          <Menu.Item key="employee">
            <Link to="/employee">Employees</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </>
  );
};

export default Navigator;
