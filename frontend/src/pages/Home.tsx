import Layout from "../components/Layout";
import TasksPage from "../components/TasksPage";
import { createTask } from "../services/apiService";
import { getToken } from "../services/authService";

export default function Home() {

    const token = getToken()

return (
    <Layout>
        {token ? (
        <div className="overlay-box relative text-center bg-red-800/70 text-green-300 uppercase text-sm font-semibold tracking-wide">
            <h1 className="text-4xl mb-4">Welcome to the Task Manager!</h1> 
            <button className="bg-green-300 text-red-800 px-4 py-2 rounded hover:bg-green-400 transition-colors duration-300" 
            onClick={() => createTask(import.meta.env.VITE_API_URL, {
                name: "New Task",
                description: "This is a new task.",
                due_date: "2026-12-31",
                is_done: false,
                id: 0
            })}>
                Create task
            </button>
        </div>
            ) : (
            <div className="overlay-box relative text-center bg-red-800/70 text-green-300 uppercase text-sm font-semibold tracking-wide">
            <h1 className="text-4xl mb-4">Welcome to the Task Manager!</h1>
            <p className="text-lg">Please log in to access your tasks and manage your projects efficiently.</p>
        </div>
        )}
        <TasksPage/>
        
    </Layout>
    );
}