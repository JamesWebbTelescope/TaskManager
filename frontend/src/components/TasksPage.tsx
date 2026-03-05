import Layout from "../components/Layout";
import { useState, useEffect} from "react";
import { getTasks } from "../services/apiService";

interface DisplayTask {
    name: string;
    description: string;
    due_date: string;
    is_done: boolean;
    id: number;
}

export default function TasksPage() {
    const [tasks, setTaskData] = useState<DisplayTask[]>([])

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
            const fetchData = async () => {
                const tasks = await getTasks(API_URL);
                console.log("Welcome to the tutorials page")
                setTaskData(tasks);
            };
            fetchData();
        }, []);

    return <Layout>
        <div className="overlay-box relative text-center bg-red-800/70 text-green-300 uppercase text-sm font-semibold tracking-wide">
            <table className="min-w-full text-black-200">
                <thead className="bg-gray-800/70 text-green-300 uppercase text-sm font-semibold tracking-wide">
                    <tr>
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((item, index) => (
                    <tr key={index}
                    className="border-b border-black-500/20 hover:bg-gray-700/50 transition-colors"
                    >
                        <td className="px-6 py-3 font-medium">{item.id}</td>
                        <td className="px-6 py-3">{item.name}</td>
                        <td className="px-6 py-3">{item.description}</td>
                        <td className="px-6 py-3">{item.is_done}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
        </div>
    </Layout>
}