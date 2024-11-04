import axios from "axios";

const api = axios.create({
    baseURL: "https://devatlas.cloud/app/extract/"
})

export default api