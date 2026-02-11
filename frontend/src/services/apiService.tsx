import type { Task } from '../types/Types';

export const getTasks = async (url: string) => {
    try {   
            const response = await fetch(`${url}/api/tasks`);
            const data = await response.json();
            const tasks: Array<Task> = []
            for (let i = 0; i < data.length; i++) {
                const task: Task = {} as Task;
                task.title = data[i].title;
                task.description = data[i].description;
                task.is_done = data[i].completed;
                task.id = data[i].id;
                tasks.push(task);
            }
            return Array.isArray(tasks) ? tasks: []
} catch (error) { 
        console.error("Error fetching tasks:", error);
        return [];
    }
}