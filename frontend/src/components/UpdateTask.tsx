import { useState, useEffect  } from 'react';
import { getToken } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../types/Types';
import "./UpdateTask.css"
import { getTaskById, updateTask } from '../services/apiService';

export default function NewTask() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [is_done, setIsDone] = useState("false"); 
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();


    const changeTask = async () => {
      try {
          console.log("Updating task")
          const taskModel: Task = {
              "name": name,
              "description": description,
              "due_date": due_date,
              "is_done": is_done,
              "id": parseInt(id)
          }

          const taskExist = await getTaskById(API_URL, taskModel);
          if (!taskExist) {
            console.warn(`Task with ID ${id} does not exist. Cannot update.`);
            return;
          }
          else {
            const res = await updateTask(API_URL, taskModel);
            console.log(`Res: ${res}`)
        
            //const data = await res;          
            navigate("/"); 
            console.log("Task updated successfully")
          }
          
        } catch (error) {
          console.error("Task update error:", error);
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
    console.log(`Updating task with ID: ${id}`);
    changeTask();
    console.log("Update task form submitted")
    
  };

 
  return (
      <div>
        <form onSubmit={handleSubmit}>
        <label>New name:
          <input
            name="name"
            autoComplete="on"
            placeholder="Task name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>New description:
          <input
            name="description"
            autoComplete="on"
            placeholder="Task description"
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <label>New due date:
          <input
            name="due_date"
            autoComplete="on"
            placeholder="Task due date"
            type="text"
            value={due_date}
            onChange={e => setDueDate(e.target.value)}
          />
        </label>
        <label>Task ID:
          <input
            name="id"
            autoComplete="on"
            placeholder="Task ID"
            type="number"
            value={id}
            onChange={e => setId(e.target.value)}
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
        <button>Update Task</button>
        </form>
      </div>
    )}