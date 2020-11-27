import * as actions from "./actions";
// import { set } from "idb-keyval";

let initialState = {
  todoList: [],
};
let reducer = (state = initialState, action) => {
  if (action.type === actions.ADD_TODO) {
    let newTodo = {
      id: Date.now(),
      message: action.payload,
      color: getColor(),
    };
    return {
      ...state,
      todoList: [...state.todoList, newTodo],
    };
  } else if (action.type === actions.REMOVE_TODO) {
    let updatedList = [];
    state.todoList.forEach((element) => {
      if (element.id !== action.payload.id) {
        updatedList.push(element);
      }
    });

    return {
      ...state,
      todoList: [...updatedList],
    };
  } else if (action.type === actions.POPULATE_FROM_IDB) {
    return {
      ...state,
      todoList: [...action.payload],
    };
  } else {
    return state;
  }
};

let getColor = () => {
  let color = `rgb(${Math.floor(Math.random() * 255) + 100}, ${Math.floor(
    Math.random() * 255 + 100
  )}, ${Math.floor(Math.random() * 255) + 100})`;
  return color;
};

export default reducer;
