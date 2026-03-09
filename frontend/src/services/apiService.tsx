import type { Task } from '../types/Types';
import { getToken } from './authService';

export const getTasks = async (url: string) => {
    try {   
            const response = await fetch(`${url}/api/tasks`);
            const data = await response.json();
            const tasks: Array<Task> = []
            for (let i = 0; i < data.length; i++) {
                const task: Task = {} as Task;
                task.name = data[i].name;
                task.description = data[i].description;
                task.is_done = data[i].is_done;
                task.id = data[i].id;
                tasks.push(task);
            }
            return Array.isArray(tasks) ? tasks: []
} catch (error) { 
        console.error("Error fetching tasks:", error);
        return [];
    }
}

export const createTask = async (url: string, task: Task) => {
    const token = getToken();
    if (!token) {
        console.warn("No token found. Cannot create task.");
        return null;
    }
    try {
        const response = await fetch(`${url}/api/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({  
                name: task.name,
                description: task.description,
                due_date: task.due_date,
                is_done: task.is_done,
                id: task.id
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating task:", error);
        return null;
    }
}

export const deleteTask = async (url: string, task: Task) => {
    const token = getToken();
    if (!token) {
        console.warn("No token found. Cannot delete task.");
        return null;
    }
    try {
        const response = await fetch(`${url}/api/tasks/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                id: task.id
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting task:", error);
        return null;
    }
}