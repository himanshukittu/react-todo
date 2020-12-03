import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../Reducer/actions";

const Editor = (props) => {
  let dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState(undefined);

  let handleAddTodo = () => {
    if (newTodo) {
      dispatch({ type: actions.ADD_TODO, payload: newTodo });
    }
    setNewTodo(undefined);
  };

  return (
    <>
      <Row justify="center">
        <Col span={8} style={{ textAlign: "left", marginTop: 10 }}>
          <strong>Todo List</strong>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 5 }}>
        <Col span={8}>
          <Input
            data-testid="editIt"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            onKeyDown={(ev) => {
              return ev.key === "Enter" ? handleAddTodo() : null;
            }}
            addonAfter={
              <PlusOutlined
                data-testid="UT_Add"
                onClick={() => handleAddTodo()}
              />
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default Editor;
