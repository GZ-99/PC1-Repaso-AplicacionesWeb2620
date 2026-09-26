import axios from "axios";
import {errorInterceptor} from "@/shared/infrastructure/error.interceptor.js";
/**
 * Infrastructure adapter for EncyclopediaApi HTTP endpoints.
 *
 * @remarks
 * This class isolates external transport concerns from the application and
 * domain layers.
 */
const encyclopediaApi = import.meta.env.VITE_ENCYCLOPEDIA_API_URL;
/**
 * Axios instance configured for EncyclopediaApi requests.
 *
 * @remarks
 * This instance is configured with the base URL and API key for the EncyclopediaApi.
 *
 * @type {axios.AxiosInstance}
 */
const http = axios.create();

http.interceptors.response.use(
    errorInterceptor.onResponse,
    errorInterceptor.onError);

export class EncyclopediaApi{
    getFeaturedSpecies = () => {
        return http.get(encyclopediaApi);
    };
}
