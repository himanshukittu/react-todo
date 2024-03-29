import { put } from "redux-saga/effects";
import { get, set } from "idb-keyval";
import * as actions from "../actions";

export function* fetchTodoList(action) {
  try {
    let result = yield get("todoList");
    if (result) {
      yield put({
        type: actions.POPULATE_FROM_IDB,
        payload: result,
      });
    }
  } catch (err) {}
}

export function* saveTodoList(action) {
  yield set("todoList", action.payload);
}

export function* getEmployeeList(action) {
  let response = yield fetch(
    "http://3.7.134.217:9006/vsearch/getpercent?client_id=11",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  console.log(response);
}
