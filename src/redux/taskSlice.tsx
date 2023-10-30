import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../types";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    hydrate: (_state, action) => {
      return action.payload;
    },
    addTask: (state: Task[], action) => {
      state.push(action.payload as Task);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => {
        const { id } = task as Task;
        return id !== action.payload;
      });
    },
    editTask: (state: Task[], action) => {
      const { id, title, done } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.done = done;
      }
    },
  },
});

export default taskSlice.reducer;
