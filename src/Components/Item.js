import { Col, Input, Row, Tag } from "antd";
import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import * as actions from "../Reducer/actions";

let Item = (props) => {
  let dispatch = useDispatch();
  let [todoData, setTodoData] = useState(props.data.message);
  let closeThisTodo = (ev) => {
    dispatch({ type: actions.REMOVE_TODO, payload: { id: ev } });
  };
  return (
    <>
      <Row justify="center">
        <Col span={10}>
          <Tag
            style={{
              width: "100%",
              padding: "5px 20px",
              fontSize: "15px",
              textAlign: "left",
              marginTop: "5px",
              backgroundColor: props.data.color,
            }}
          >
            {props.counter}.&nbsp;
            <Input
              type="text"
              value={todoData}
              onChange={(event) => {
                setTodoData(event.target.value);
              }}
              style={{
                width: "90%",
                backgroundColor: "transparent",
                border: "none",
                color: "#4c4848",
              }}
            />
            <CloseOutlined
              style={{ float: "right", marginTop: "7px" }}
              onClick={() => closeThisTodo(props.data.id)}
            />
          </Tag>
        </Col>
      </Row>
    </>
  );
};

export default Item;
