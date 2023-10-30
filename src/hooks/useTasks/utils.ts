import { Task, TaskStatus } from "../../types";

export const getUndonedTasks = (tasks: Task[]) => {
  return tasks.filter((task) => !task.done);
};

export const getDonedTasks = (tasks: Task[]) => {
  return tasks.filter((task) => task.done);
};

export const getFilteredTasksByTitle = (tasks: Task[], title: string) => {
  return tasks.filter((task) =>
    task.title.toLowerCase().includes(title.toLowerCase())
  );
};

export const getFilteredTasks = (
  tasks: Task[],
  taskStatusFilter: TaskStatus,
  taskTitleFilter: string
) => {
  switch (taskStatusFilter) {
    case TaskStatus.Active:
      return getFilteredTasksByTitle(getUndonedTasks(tasks), taskTitleFilter);
    case TaskStatus.Completed:
      return getFilteredTasksByTitle(getDonedTasks(tasks), taskTitleFilter);
    default:
      return getFilteredTasksByTitle(tasks, taskTitleFilter);
  }
};
