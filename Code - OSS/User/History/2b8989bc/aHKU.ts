import { api } from "./api"

class UpdatePwdApi {
    public async updatePwd(body: {}) {
        try {
            const res = await api.post(`/app/perfil/update_pwd`, body)
                .then((res) => {
                    return res.data
                }).catch((e) => {
                    return e.response.data
                })
            return res
        } catch (error) {
            console.error('Error:', error)
            throw error
        }
    }
    
}

export default new UpdatePwdApi()