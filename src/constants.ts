import { TaskStatus } from "./types";

export const TaskStatusFilterOptions = [
  { value: TaskStatus.All, label: "All" },
  { value: TaskStatus.Active, label: "Active" },
  { value: TaskStatus.Completed, label: "Completed" },
];

export const LocalStorageKey = "tasks";
