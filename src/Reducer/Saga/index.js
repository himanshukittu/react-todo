import { takeEvery } from "redux-saga/effects";
import * as actions from "../actions";
import { fetchTodoList, getEmployeeList, saveTodoList } from "./reduxSaga";

export function* watchSaga() {
  yield takeEvery(actions.FETCH_TODOLIST, getEmployeeList);
  yield takeEvery(actions.SAVE_TODO_LIST, saveTodoList);
  // yield takeEvery(actions.SAGA_FETCH_EMPLOYEE, getEmployeeList);
}
