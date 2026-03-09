export interface Task {
  name: string;
  description: string;
  is_done: string;
  due_date: string;
  id: number;
}

export interface AdminUser{
    id: number;
    name: string;
    password_hash: string;
}