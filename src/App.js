import "./App.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import reducer from "./Reducer/Reducer";
import { applyMiddleware, createStore } from "redux";
// import { get } from "idb-keyval";
import createSagaMiddleware from "redux-saga";
import { watchSaga } from "./Reducer/Saga";
import Navigator from "./Components/Navigator/Navigator";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import Todo from "./Components/Todo";
import Employee from "./Components/Employee";

const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchSaga);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navigator />
          <Switch>
            <Route path="/employee" component={Employee} />
            <Route path="/" exact component={Todo} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
