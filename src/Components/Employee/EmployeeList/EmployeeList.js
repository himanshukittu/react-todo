import { Card, Col, Row, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
// import * as actions from "../../../Reducer/actions";

const EmployeeList = (props) => {
  let dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  let cards = undefined;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log("<<<<see here>>>", response);
        setPosts(response.data);
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  cards = posts.map((element, index) => {
    return (
      <Col id={element.id} style={{ padding: "10px" }}>
        <Card
          style={{ width: "200px", height: "300px", overflow: "hidden" }}
          title={element.title}
        >
          <p>{element.body}</p>
        </Card>
      </Col>
    );
  });

  let spinner = (
    <Space size="large">
      <Spin size="large"></Spin>
    </Space>
  );

  return (
    <>
      {isLoading ? (
        spinner
      ) : (
        <Row justify="center" test-id="cardss">
          {cards ? cards : null}
        </Row>
      )}
    </>
  );
};

export default EmployeeList;
