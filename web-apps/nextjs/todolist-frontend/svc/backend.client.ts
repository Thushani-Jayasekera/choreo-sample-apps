import axios, { AxiosResponse } from "axios";
import getConfig from "next/config";

const BASE_URL = process.env.TODO_API_BASE_URL;

const {publicRuntimeConfig} = getConfig();

export interface TodoResponse {
  id: number;
  userId: string;
  title: string;
  description: string;
}

export interface TodoRequest {
  title: string;
  description: string;
}

// List all todos for a user
export const listTodosForUser = async (
  userId: string
): Promise<TodoResponse[]> => {
  try {
    const response: AxiosResponse<TodoResponse[]> = await axios.get(
      `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/users/${userId}/todos`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Create a new todo for a user
export const createTodoForUser = async (
  userId: string,
  todoData: TodoRequest
): Promise<TodoResponse> => {
  try {
    const response: AxiosResponse<TodoResponse> = await axios.post(
      `${publicRuntimeConfig.NEXT_PUBLIC_TODO_API_BASE_URL}/users/${userId}/todos`,
      todoData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// Get a todo by ID for a user
export const getTodoByIdForUser = async (
  userId: string,
  todoId: number
): Promise<TodoResponse> => {
  try {
    const response: AxiosResponse<TodoResponse> = await axios.get(
      `${BASE_URL}/users/${userId}/todos/${todoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
};

// Update a todo by ID for a user
export const updateTodoForUser = async (
  userId: string,
  todoId: number,
  updatedTodoData: TodoRequest
): Promise<TodoResponse> => {
  try {
    const response: AxiosResponse<TodoResponse> = await axios.put(
      `${BASE_URL}/users/${userId}/todos/${todoId}`,
      updatedTodoData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Delete a todo by ID for a user
export const deleteTodoForUser = async (
  userId: string,
  todoId: number
): Promise<number> => {
  try {
    const response: AxiosResponse<void> = await axios.delete(
      `${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/users/${userId}/todos/${todoId}`
    );
    return response.status;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
