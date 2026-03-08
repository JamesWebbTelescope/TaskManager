import { useState, useEffect  } from 'react';
import { getToken } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import "./DeleteTask.css"
import { deleteTask } from '../services/apiService';

export default function NewTask() {
  const [id, setId] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();


    const delTask = async (id: number) => {
      try {
          console.log("Deleting task")
          const res = await deleteTask(API_URL, id);
          console.log(`Res: ${res}`)
        
          //const data = await res;          
          navigate("/"); 
          console.log("Task deleted successfully")
          
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
    delTask(parseInt(id));
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