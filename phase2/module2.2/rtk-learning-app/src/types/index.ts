// Type definitions
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
