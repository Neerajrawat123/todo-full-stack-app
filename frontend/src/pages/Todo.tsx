import axios from "axios";
import { useState, useEffect, useRef, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";

interface Todo {
  task: string;
  isCompleted: boolean;
  _id: string;
  created_at: string;
  updated_at: string;
}
const Todo = () => {
  const [task, setTask] = useState<string>("");
  const [newTaskId, setNewTaskId] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>([]);
  const editMode = useRef(false);
  const params = useParams();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (editMode.current) {
      editTodo(task, newTaskId);
    } else {
      addTodo();
    }
  };

  const addTodo = () => {
    axios.post(`/add-todo/${params?.user}`, { task }).then((response) => {
      setTodos(response?.data?.todos?.tasks);

      setTask("");
    });
  };

  useEffect(() => {
    const getTodos = async () => {
      axios.get(`/get-todo/${params?.user}`).then((response) => {
        setTodos(response?.data?.todos?.tasks);
      });
    };

    getTodos();
  }, []);

  const removeTodo = (id: string) => {
    axios.patch(`/remove-todo/${params.user}`, { id }).then((response) => {
      setTodos(response?.data?.todos?.tasks);
    });
  };

  const editTodo = (task: string, id: string) => {
    axios.patch(`/edit-todo/${params.user}`, { task, id }).then((response) => {
      setTodos(response?.data?.todos?.tasks);
      setTask("");
      editMode.current = false;
    });
  };

  const setEditMode = (todotask: string, id: string) => {
    if (todotask === task && task !== "") {
      editMode.current = !editMode.current;
    } else {
      editMode.current = true;
      setNewTaskId(id);
    }

    setTask(() => (editMode.current ? todotask : ""));
  };
  return (
    <div className="container">
      <div className="todo_container">
        <div className="todo_heading">
          <h1>Todo's</h1>
        </div>

        <div className="todo_input">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="todo"
              name="Email"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
            <button
              className="add_btn"
              id={editMode.current ? "edit" : "add"}
              type="submit"
            >
              {editMode.current ? "Edit" : "Add"}
            </button>
          </form>
        </div>

        <div className="todos">
          {todos?.map((todo) => (
            <div key={todo?._id} className="todo">
              <div className="todo_name">{todo?.task}</div>
              <div className="todo_btns">
                <button onClick={() => setEditMode(todo?.task, todo?._id)}>
                  Edit
                </button>
                <button onClick={() => removeTodo(todo?._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
