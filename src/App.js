import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "./Components/Editor";
import "antd/dist/antd.css";
import { Provider, useDispatch } from "react-redux";
import reducer from "./Reducer/Reducer";
import { applyMiddleware, createStore } from "redux";
import Body from "./Components/Body";
// import { get } from "idb-keyval";
import * as actions from "./Reducer/actions";
import createSagaMiddleware from "redux-saga";
import { watchSaga } from "./Reducer/Saga";

const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchSaga);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Editor />
        <Body />
      </div>
    </Provider>
  );
}

export default App;
