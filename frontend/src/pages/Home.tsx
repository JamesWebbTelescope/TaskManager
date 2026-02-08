import { useEffect, useState } from "react";
import Layout from "../components/Layout";
// import { useNavigate } from "react-router-dom";
import { getTasks } from "../services/apiService";

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
      <section>
        <button
          onClick={() => {
            setDisplay();
          }}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300"
        >Get tasks</button>
      </section>
    </Layout>
  );
}