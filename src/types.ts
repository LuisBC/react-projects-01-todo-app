export type Task = {
  id: number;
  title: string;
  done: boolean;
};

export enum TaskStatus {
  All = "all",
  Active = "active",
  Completed = "completed",
}
