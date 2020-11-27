import { put } from "redux-saga/effects";
import { get, set } from "idb-keyval";
import * as actions from "../actions";

export function* fetchTodoList(action) {
  try {
    let result = yield get("todoList");
    console.log(result);
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
