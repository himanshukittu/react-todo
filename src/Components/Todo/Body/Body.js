import { Col, Divider, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "../Item/Item";
import * as actions from "../../../Reducer/actions";

let Body = (props) => {
  let todoList = useSelector((state) => state.todoList);
  let dispatch = useDispatch();

  todoList.reverse();
  let todos = undefined;
  if (todoList.length > 0) {
    todos = todoList.map((element, index) => {
      return <Item key={element.id} data={element} counter={index + 1} />;
    });
  }

  //componentDidMount
  useEffect(() => {
    dispatch({ type: actions.FETCH_TODOLIST });
  }, []);

  //each time it will run if render changes
  useEffect(() => {
    dispatch({ type: actions.SAVE_TODO_LIST, payload: todoList });
  });

  return (
    <>
      <Row justify="center">
        <Col span={12}>
          <Divider style={{ marginTop: 5 }} orientation="left">
            Todos'
          </Divider>
        </Col>
      </Row>

      {todos ? (
        <span data-testid="YData">{todos}</span>
      ) : (
        <span data-testid="noData">{"Todo list is Empty!"}</span>
      )}
    </>
  );
};
export default Body;
