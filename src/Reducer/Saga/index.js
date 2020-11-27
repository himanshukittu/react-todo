import { takeEvery } from "redux-saga/effects";
import * as actions from "../actions";
import { fetchTodoList, saveTodoList } from "./reduxSaga";

export function* watchSaga() {
  yield takeEvery(actions.FETCH_TODOLIST, fetchTodoList);
  yield takeEvery(actions.SAVE_TODO_LIST, saveTodoList);
}
