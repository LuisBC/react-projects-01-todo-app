import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { Task, TaskStatus } from "../../types";
import { getFilteredTasks } from "./utils";
const useTask = () => {
  const [taskStatusFilter, setTaskStatusFilter] = useState(TaskStatus.All);
  const [taskTitleFilter, setTaskTitleFilter] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "tasks/getTasksFromLocalStorage",
    });
  }, [dispatch]);

  const tasks = useSelector((state: { tasks: Task[] }) => state.tasks);

  const filteredTasks = useMemo(
    () => getFilteredTasks(tasks, taskStatusFilter, taskTitleFilter),
    [taskStatusFilter, tasks, taskTitleFilter]
  );

  const addTask = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement>,
      inputValue: string,
      setInputValue: React.Dispatch<React.SetStateAction<string>>
    ) => {
      if (e.key === "Enter" && inputValue) {
        dispatch({
          type: "tasks/addTask",
          payload: {
            id: uuid(),
            title: inputValue,
            done: false,
          },
        });
        setInputValue("");
      }
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (id: number) => {
      dispatch({
        type: "tasks/deleteTask",
        payload: id,
      });
    },
    [dispatch]
  );

  const editTask = useCallback(
    (id: number, title: string, done: boolean) => {
      dispatch({
        type: "tasks/editTask",
        payload: {
          id,
          title,
          done,
        },
      });
    },
    [dispatch]
  );

  return {
    tasks,
    filteredTasks,
    addTask,
    deleteTask,
    editTask,
    filterTasksByStatus: setTaskStatusFilter,
    filterTasksByTitle: setTaskTitleFilter,
  };
};

export default useTask;
