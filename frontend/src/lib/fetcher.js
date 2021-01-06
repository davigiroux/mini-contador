class Fetcher {
    static async post(url, data) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .catch(erro => erro)
    }

    static async get(url) {
        return await fetch(url).then(res => res.json()).catch(erro => erro);
    }

    static async delete(url, id) {
        return await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(erro => erro)
    }
}

export default Fetcher;