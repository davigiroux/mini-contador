import axios from "axios";
import store from "../app/store";
import { deslogadoComSucesso } from "../pages/Login/usuarioLogadoSlice";

const host = window.location.includes('localhost:5000') ? 'http://localhost:5000' : 'https://mini-contador-api.herokuapp.com/';
const api = axios.create({baseURL: host, timeout: 1000});

api.interceptors.request.use((config) => {
    const token = store.getState().usuarioLogado.token;
    config.headers.Authorization = token.length > 0 ? `bearer ${token}` : "";
    return config;
}, function(error) {
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    return response;
}, erro => {
    if(erro.response.status === 401) {
        const requestConfig = erro.config;
        window.location = './login';
        store.dispatch(deslogadoComSucesso());
        return api(requestConfig);
    }

    return Promise.reject(erro);
});

export default api;