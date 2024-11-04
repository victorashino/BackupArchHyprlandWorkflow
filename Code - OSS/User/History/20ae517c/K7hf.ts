import { api } from "./api"

class DepositApi {
    public async getInfo() {
        try {
            const res = await api.get(`/app/deposit/info`)
                .then((res) => {
                    console.log(res.data)
                    return res.data
                }).catch((e) => {
                    console.log(e.response)
                    return e.response.data
                })
            return res
        } catch (error) {
            console.error('Error service/Deposit.ts (getInfo): ', error)
            throw error
        }
    }

    public async qrCode(amount: {}) {
        try {
            const res = await api.post(`/app/deposit/qrcode`, amount)
                .then((res) => {
                    console.log("QR Code AAAAAAAAA: " + res.data)
                    return res.data
                }).catch((e) => {
                    console.log(e.response)
                    return e.response.data
                })
            return res
        } catch (error) {
            console.error('Error service/Deposit.ts (qrCode): ', error)
            throw error
        }
    }

    public async barCode(amount: {}) {
        try {
            const res = await api.post(`/app/deposit/barcode`, amount)
                .then((res) => {
                    console.log("Bar Code AAAAAAAAAAAAA: " + res.data)
                    return res.data
                }).catch((e) => {
                    console.log(e.response)
                    return e.response.data
                })
            return res
        } catch (error) {
            console.error('Error service/Deposit.ts (barCode): ', error)
            throw error
        }
    }

}

export default new DepositApi()