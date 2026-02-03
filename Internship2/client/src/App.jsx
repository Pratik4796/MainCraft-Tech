import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/task`)
      .then((res) => setTasks(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const addTask = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(`${API_URL}/add`, { text });
      setTasks((prev) => [res.data, ...prev]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">📝 MERN To-Do</h1>
        <p className="subtitle">Stay productive, stay focused</p>

        <div className="input-group">
          <input
            type="text"
            value={text}
            placeholder="What do you want to do?"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>

        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty">No tasks yet 🚀</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task">
                {task.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
