import Layout from "../components/Layout";
import TasksPage from "../components/TasksPage";
import { getToken } from "../services/authService";

export default function Home() {

    const token = getToken()

return (
    <Layout>
        {token ? (
        <div className="overlay-box relative text-center bg-red-800/70 text-green-300 uppercase text-sm font-semibold tracking-wide">
            <h1 className="text-4xl mb-4">Welcome to the Task Manager!</h1> 
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