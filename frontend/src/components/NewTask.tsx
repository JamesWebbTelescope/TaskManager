import { useState, useEffect  } from 'react';
import { getToken } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import "./Newtask.css"
import { createTask } from '../services/apiService';

export default function NewTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [is_done, setIsDone] = useState("false"); 
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();


    const sendTask = async () => {
      try {
          console.log("Sending task")
          const taskModel = {
              "name": name,
              "description": description,
              "due_date": due_date,
              "is_done": is_done,
              "id": 0
              
          }        
          const res = createTask(API_URL, taskModel);
          console.log(`Res: ${res}`)
        
          //const data = await res;          
          navigate("/"); 
          console.log("Task created successfully")
          
        } catch (error) {
          console.error("Task creation error:", error);
        }
      };

      
    useEffect(() => {
        
      const token = getToken();
        if (!token) {
          console.log("Token not found, redirecting...");
          navigate("/admin"); 
        }
      }, []);


  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendTask();
    console.log("New task form submitted")
    
  };

 
  return (
      <div>
        <form onSubmit={handleSubmit}>
        <label>Task name:
          <input
            name="Name of the task"
            autoComplete="on"
            placeholder="Task name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <br />
        <label>Description:
          <input
            name="description"
            autoComplete="on"
            placeholder="Task description"
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
            checked={is_done === "true"}
            onChange={e => setIsDone(e.target.checked ? "true" : "false")}
          />
        </label>
        <br />
        <button>Create Task</button>
        </form>
      </div>
    )}