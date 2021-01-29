import Swal from 'sweetalert2';
import api from '../api/api.instance';

class Fetcher {
    static async post(url, data) {
        try {
            const res = await api.post(url, data);
            return res.data;
        } catch (error) {
            const {status, message} = error.response ? error.response.data : error;
            this.emitirMensagemDeErro(status, message);
        }
    }

    static async fetch(url) {
        try {
            const res = await api.get(url);
            return res.data;
        } catch (error) {
            const {status, message} = error.response ? error.response.data : error;
            this.emitirMensagemDeErro(status , message);
        }
    }

    static async delete(url, id) {

        try {
            const res = await api.delete(`${url}/${id}`);
            return res.data;
        } catch (error) {
            const {status, message} = error.response ? error.response.data : error;
            this.emitirMensagemDeErro(status, message);
        }
    }

    static async update(url, id, data) {
        try {
            const res = await api.put(`${url}/${id}`, data);
            return res.data;
        } catch (error) {
            const {status, message} = error.response ? error.response.data : error;
            this.emitirMensagemDeErro(status, message);
        }
    }

    emitirMensagemDeErro(status = 500, mensagem = "Erro desconhecido") {
        Swal.fire(`${status} - Algo deu errado...`, mensagem, 'error');
    }
}

export default Fetcher;