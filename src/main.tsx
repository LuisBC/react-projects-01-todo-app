import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";
import "./index.css";
import { getTasksFromLocalStorage, saveTasksInLocalStorage } from "./utils.ts";

store.subscribe(() => saveTasksInLocalStorage(store.getState().tasks));

const tasks = getTasksFromLocalStorage();
if (tasks) {
  store.dispatch({ type: "tasks/hydrate", payload: tasks });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
