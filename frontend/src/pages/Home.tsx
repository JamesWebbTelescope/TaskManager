import Layout from "../components/Layout";
import { useState, useEffect} from "react";
import { getTasks } from "../services/apiService";
import Dropdown from "react-bootstrap/Dropdown";

interface DisplayTask {
    name: string;
    description: string;
    due_date: string;
    is_done: boolean;
    id: number;
}

const holoLinkClass = `
    relative
    px-4 py-2
    text-green
    font-semibold
    rounded-lg
    transition-all
    duration-300
    hover:text-green-400
    hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.9)]
    before:absolute
    before:inset-0
    before:rounded
    before:bg-green-400
    before:opacity-20
    before:blur-xl
    before:scale-110
    before:transition-all
    before:duration-300
    hover:before:opacity-50
    hover:before:scale-80
    before:pointer-events-none
  `;

export default function TasksPage() {
    const [tasks, setTaskData] = useState<DisplayTask[]>([])
    const [display, updateDisplay] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL;
    const results: DisplayTask[] = [];

    useEffect(() => {
            const fetchData = async () => {
                const tasks = await getTasks(API_URL);
                console.log("Welcome to the tutorials page")
                for(const task of tasks){
                    console.log(`Getting all tutorials`)
                    const t = tasks.find(item => item.id === task.id);
                    if(t){
                        results.push({
                                    id: t.id,
                                    name: t.name,
                                    description: t.description,
                                    due_date: t.due_date,
                                    is_done: t.is_done
                                });
                            console.log(t.id)
                            console.log(t.name)
                            console.log(t.description)
                            console.log(t.due_date)
                            console.log(t.is_done)
                            }
                    }           
                setTaskData(results);
            };
            fetchData();
        }, []);

    return <Layout>
        <div className="overlay-box relative text-center bg-red-800/70 text-green-300 uppercase text-sm font-semibold tracking-wide">
            <Dropdown>
                <Dropdown.Header>Tasks</Dropdown.Header>
                    {tasks.map((item, index) => (
                        <Dropdown.Menu show key={index}>
                        <Dropdown.Item className={holoLinkClass} onClick={() => {
                                    // clearToken()
                                    updateDisplay(!display)
                                }}>{item.name}
                        </Dropdown.Item>
                        </Dropdown.Menu>
                        ))}
            </Dropdown>
        </div>
    </Layout>
}