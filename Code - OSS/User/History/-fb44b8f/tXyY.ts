import axios from "axios";

const extratoApi = axios.create({
    baseURL: "https://devatlas.cloud/app/extract"
})

export default extratoApi