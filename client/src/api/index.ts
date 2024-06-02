import axios, {InternalAxiosRequestConfig} from "axios";

const host = axios.create({
  baseURL: "api/",
});

const authHost = axios.create({
  baseURL: "api/",
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);

export { host, authHost };
