import authenticate from "../components/AuthUser";
import DeleteTask from "../components/DeleteTask";
import Header from "../components/Header";
import Layout from "../components/Layout";
import NewTask from "../components/NewTask";
import TasksPage from "../components/TasksPage";
import { getToken } from "../services/authService";

export default function Home() {

    authenticate();
    const token = getToken()

return (
    <Layout>
        <Header/>
        {token ? (
        <div className="overlay-box relative text-center bg-red-800/70 text-green-300 uppercase text-sm font-semibold tracking-wide">
            <h1 className="text-4xl mb-4">Welcome to the Task Manager!</h1> 
            <NewTask/>
        </div>
            ) : (
            <div className="overlay-box relative text-center bg-red-800/70 text-green-300 uppercase text-sm font-semibold tracking-wide">
            <h1 className="text-4xl mb-4">Welcome to the Task Manager!</h1>
            <p className="text-lg">Please log in to access your tasks and manage your projects efficiently.</p>
        </div>
        )}
        <TasksPage/>
        {token && <DeleteTask/>}
        
    </Layout>
    );
}