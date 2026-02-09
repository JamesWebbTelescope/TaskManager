import { useEffect, useState } from "react";
import Layout from "../components/Layout";
// import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { getTasks } from "../services/apiService";

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

export default function Home() {
    interface DisplayTask {
      name: string;
      description: string;
      completed: boolean;
      id: number;
  }
  const [tasks, setTasks] = useState<DisplayTask[]>([])
  const [display, updateDisplay] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL;
  const results: DisplayTask[] = [];

  const setDisplay = async () => {

    useEffect(() => {
            const fetchData = async () => {
                const tasks = await getTasks(API_URL);
                console.log("Welcome to the tasks page")
                for(const task of tasks){
                    console.log(`Getting all tasks`)
                    const t = tasks.find(item => item.id === task.id);
                    if(t){
                        results.push({
                                    name: t.name,
                                    description: t.description,
                                    completed: t.completed,
                                    id: t.id
                                });
                            console.log(t.name)
                            console.log(t.description)
                            console.log(t.completed)
                            console.log(t.id)
                            }
                    }           
                setTasks(results);
            };
            fetchData();
        }, []);
  }

  return (
    <Layout>
<section className="flex flex-col items-center justify-center text-center py-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text 
                       bg-linear-to-r from-green-200 via-green-400 to-green-800
                       bg-size-[200%_200%] animate-gradient-colors text-glow
                       leading-tight">
          Welcome to the Task Manager!
        </h2>
        <p className="text-green-400 max-w-xl mb-8">
          Manage your tasks efficiently and stay organized with our intuitive task management application.
        </p>
 
      </section>
      <Dropdown>
                <Dropdown.Header>Tasks</Dropdown.Header>
                    {tasks.map((item, index) => (
                        <Dropdown.Menu show key={index}>
                        <Dropdown.Item className={holoLinkClass} onClick={() => {
                                    // clearToken();
                                    setDisplay()
                                    updateDisplay(!display)
                                }}>{item.name}
                        </Dropdown.Item>
                        </Dropdown.Menu>
                        ))}
            </Dropdown>
    </Layout>
  );
}