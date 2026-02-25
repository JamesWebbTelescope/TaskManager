import { useState, useEffect  } from 'react';
import { setToken, getToken } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import "./Newtask.css"

export default function NewTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [is_done, setIsDone] = useState(false);
  const [token, setTokenState] = useState<string | null>(getToken());  
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();


    const sendTask = async () => {
      const token = getToken();
      if (!token) {
        console.warn("No token found. Redirecting to login...");
        navigate("/admin");  
        return;
      }
      try {
          console.log("Sending task")
          const taskModel = {
              "name": name,
              "description": description,
              "due_date": due_date,
              "is_done": is_done,
              "id": 0
              
          }        
          const res = await fetch(`${API_URL}/api/tasks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(taskModel),
          });
          console.log(`Res: ${res}`)
        
          const data = await res.json();          
          navigate("/"); 
          console.log("Task created successfully")
          
        } catch (error) {
          console.error("Task creation error:", error);
        }
      };

      
    useEffect(() => {
        
        if (token) {
          console.log("Token found, redirecting...");
          navigate("/admin"); 
        }
      }, []);


  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendTask();
    
  };

 
  return (
      <div>
        <form onSubmit={handleSubmit}>
        <label>Task name:
          <input
            name="username"
            autoComplete="on"
            placeholder="username"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <br />
        <label>Description:
          <input
            name="password"
            autoComplete="off"
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>Due Date:
          <input
            name="due_date"
            type="date"
            value={due_date}
            onChange={e => setDueDate(e.target.value)}
          />
        </label>
        <br />
        <label>Is Done:
          <input
            name="is_done"
            type="checkbox"
            checked={is_done}
            onChange={e => setIsDone(e.target.checked)}
          />
        </label>
        <br />
        <button>Create Task</button>
          console.log("New task form submitted")
        </form>
      </div>
    )}