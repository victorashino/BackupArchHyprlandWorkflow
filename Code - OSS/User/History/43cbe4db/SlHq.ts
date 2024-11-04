import { api } from "./api"

class ExtratoApi {
    public async listExtract(body: {}) {
        try {
            const res = await api.post(`/app/extract`, body)
                .then((res) => {
                    return res.data
                }).catch((e) => {
                    return e.response.data
                })
            return res
        } catch (error) {
            console.error('Error fetching extract:', error)
            throw error
        }
    }

    public async detail(id: {}) {
        try {
            const res = await api.post(`app/transaction/detail`, id)
                .then((res) => {
                    return res.data;
                }).catch((e) => {
                    return e.response;
                });
            return res;
        } catch (error) {
            console.error('Error fetching detail:', error);
            throw error;
        }
    }
    
}

export default new ExtratoApi()