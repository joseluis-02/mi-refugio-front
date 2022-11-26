import axios from "axios";
import { API_HOST_PRODUCCION } from "../../../utils";

export const versiculosApi = axios.create({
    baseURL: API_HOST_PRODUCCION,
})