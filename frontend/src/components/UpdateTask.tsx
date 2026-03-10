import { useState, useEffect  } from 'react';
import { getToken } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../types/Types';
import "./DeleteTask.css"
import { deleteTask, getTaskById } from '../services/apiService';

export default function NewTask() {
  const [id, setId] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();


    const removeTask = async (id: string) => {
      try {
          console.log("Deleting task")
          const taskModel: Task = {
              "name": "",
              "description": "",
              "due_date": "",
              "is_done": "false",
              "id": parseInt(id)
          }

          const taskExist = await getTaskById(API_URL, taskModel);
          if (!taskExist) {
            console.warn(`Task with ID ${id} does not exist. Cannot delete.`);
            return;
          }
          else {
            const res = await deleteTask(API_URL, taskModel);
            console.log(`Res: ${res}`)
        
            //const data = await res;          
            navigate("/"); 
            console.log("Task deleted successfully")
          }
          
        } catch (error) {
          console.error("Task deletion error:", error);
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
    console.log(`Deleting task with ID: ${id}`);
    removeTask(id);
    console.log("Delete task form submitted")
    
  };

 
  return (
      <div>
        <form onSubmit={handleSubmit}>
        <label>ID:
          <input
            name="ID"
            autoComplete="on"
            placeholder="Task ID"
            type="number"
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </label>
        <button>Delete Task</button>
        </form>
      </div>
    )}