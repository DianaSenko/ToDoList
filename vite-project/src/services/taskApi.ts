import { wrapperApi } from "../plugins/api";

const API_URL = import.meta.env.VITE_SERVER_URL;
export const getTasks = async () => await wrapperApi('get', `${API_URL}/tasks`,);

export const addTask = async (data: Record<string, string | number>) => await wrapperApi('post', `${API_URL}/tasks`, data);

export const deleteTask = async (id: number) => await wrapperApi('delete', `${API_URL}/tasks/${id}`,);

export const updateTask = async (id: number, data: Record<string, string | number>) =>  await wrapperApi('put', `${API_URL}/tasks/${id}`, data);