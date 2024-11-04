import axios from "axios";

const extratoApi = axios.create({
    baseURL: "https://devatlas.cloud/"
})

export default extratoApi