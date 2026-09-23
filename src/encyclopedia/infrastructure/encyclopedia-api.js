import axios from "axios";
import {errorInterceptor} from "@/shared/infrastructure/error.interceptor.js";

const encyclopediaApi = import.meta.env.VITE_ENCYCLOPEDIA_API_URL;

const http = axios.create();

http.interceptors.response.use(
    errorInterceptor.onResponse,
    errorInterceptor.onError);

export class EncyclopediaApi{
    getFeaturedSpecies = () => {
        return http.get(encyclopediaApi);
    };
}
