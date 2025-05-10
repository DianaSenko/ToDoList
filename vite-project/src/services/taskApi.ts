import { wrapperApi } from "../plugins/api";

const API_URL = import.meta.env.VITE_SERVER_URL;
export const getTasks = async() => await wrapperApi('get',`${API_URL}/tasks`,)