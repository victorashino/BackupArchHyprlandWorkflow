import { api } from "./api"

class DepositApi {
    public async getInfo(body: {}) {
        try {
            const res = await api.get(`app/deposit/info`)
                .then((res) => {
                    console.log(res.data)
                    return res.data
                }).catch((e) => {
                    console.log(e.response)
                    return e.response.data
                })
            return res
        } catch (error) {
            console.error('Error fetching companies:', error)
            throw error
        }
    }
}

export default new DepositApi()