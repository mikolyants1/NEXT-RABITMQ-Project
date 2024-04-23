import axios, {type AxiosInstance } from "axios";

export const OmdbUrl:string = "http://www.omdbapi.com/?&apikey=b07ab897";

export const apiClient:AxiosInstance = axios.create({
    baseURL:"http://localhost:5000/api",
})