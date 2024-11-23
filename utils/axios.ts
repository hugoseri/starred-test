import axios from "axios";

export const axiosServerInstance = axios.create({
    baseURL: "https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com/prod/"
})

export const axiosClientInstance = axios.create({
    baseURL: "/api"
})
