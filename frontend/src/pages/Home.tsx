import DeleteTask from "../components/DeleteTask";
import Header from "../components/Header";
import Layout from "../components/Layout";
import NewTask from "../components/NewTask";
import TasksPage from "../components/TasksPage";
import { clearToken, getToken } from "../services/authService";

export default function Home() {

    const token = getToken()
    if (!token) {
        console.log("No token found, user is not logged in.");
        clearToken();
    } else {
        console.log("Token found, user is logged in.");
    }

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