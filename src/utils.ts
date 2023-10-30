import { LocalStorageKey } from "./constants";
import { Task } from "./types";

export const saveTasksInLocalStorage = (tasks: Task[]) => {
  localStorage.setItem(LocalStorageKey, JSON.stringify(tasks));
};

export const getTasksFromLocalStorage = () => {
  try {
    const tasks = localStorage.getItem(LocalStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  } catch (e) {
    console.log(e);
  }
};

export const getUndonedTasks = (tasks: Task[]) => {
  return tasks.filter((task) => !task.done);
};
