import { useCallback, useRef, useState } from "react";
import "./App.css";
import crossIcon from "./assets/cross.svg";
import searchIcon from "./assets/magnify.svg";
import newIcon from "./assets/plus.svg";
import Select from "./components/Select/Select";
import { TaskStatusFilterOptions } from "./constants";
import useTasks from "./hooks/useTasks";
import { TaskStatus } from "./types";
import { getUndonedTasks } from "./utils";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSearchInput, setIsSearchInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    tasks,
    filteredTasks,
    addTask,
    deleteTask,
    editTask,
    filterTasksByStatus,
    filterTasksByTitle,
  } = useTasks();

  const handleSwitchInputType = useCallback(() => {
    setIsSearchInput((prev) => !prev);
    setInputValue("");
    inputRef.current?.focus();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>THINGS TO DO</h1>
      </div>
      <div className="input">
        <input
          ref={inputRef}
          type="text"
          name="add"
          placeholder={isSearchInput ? "Search Tasks" : "New Task"}
          value={inputValue}
          onChange={({ target: { value } }) => {
            setInputValue(value);
            isSearchInput && filterTasksByTitle(value);
          }}
          onKeyDown={(e) =>
            !isSearchInput && addTask(e, inputValue, setInputValue)
          }
        />
      </div>
      <div className="content">
        {filteredTasks.map(({ title, id, done }) => (
          <div className="content-item" key={id}>
            <div>
              <input
                type="checkbox"
                name={`done-${id}`}
                defaultChecked={done}
                onChange={(e) => editTask(id, title, e.target.checked)}
              />
              <input
                type="text"
                name={`title-${id}`}
                value={title}
                onChange={(e) => editTask(id, e.target.value, done)}
              />
            </div>
            <img src={crossIcon} alt="delete" onClick={() => deleteTask(id)} />
          </div>
        ))}
      </div>
      <div className="footer">
        <div className="action-buttons">
          <button onClick={handleSwitchInputType}>
            {isSearchInput ? (
              <>
                <img src={newIcon} alt="add" />
                <p>New</p>
              </>
            ) : (
              <>
                <img src={searchIcon} alt="search" />
                <p>Search</p>
              </>
            )}
          </button>
        </div>
        <div className="items-left">
          <p>{getUndonedTasks(tasks).length} items left</p>
        </div>
        <Select
          options={TaskStatusFilterOptions}
          onChange={(op) => op && filterTasksByStatus(op.value as TaskStatus)}
        />
      </div>
    </div>
  );
};

export default App;
