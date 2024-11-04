import { api } from "./api";

class ExtratoApi {
    public async listExtract(body) {
        try {
            const res = await api.get(`/app/extract`, {
                params: {
                    start: body.start,
                    end: body.end,
                    type: body.type
                }
            }).then((res) => {
                console.log(res);
                return res.data;
            }).catch((e) => {
                console.log(e.response);
                return e.response.data;
            });
            return res;
        } catch (error) {
            console.error('Error fetching companies:', error);
            throw error;
        }
    }
}

export default new ExtratoApi();