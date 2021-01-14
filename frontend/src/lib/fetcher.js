import Swal from 'sweetalert2';

class Fetcher {
    static async post(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
        
        if(res.errors) {
            this.emitirMensagemDeErro(res.message)
            return;
        }

        return res;
    }

    static async buscar(url) {
        const res = await fetch(url).then(res => res.json());

        if(res.errors) {
            this.emitirMensagemDeErro(res.message)
            return;
        }

        return res;
    }

    static async deletar(url, id) {
        const res = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());

        if(res.errors) {
            this.emitirMensagemDeErro(res.message)
            return;
        }
        
        return res;
    }

    static async alterar(url, id, data) {
        const res = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());

        if(res.errors) {
            this.emitirMensagemDeErro(res.message)
            return;
        }
        
        return res;
    }

    static emitirMensagemDeErro(mensagem) {
        Swal.fire('Algo deu errado...', mensagem, 'error');
    }
}

export default Fetcher;