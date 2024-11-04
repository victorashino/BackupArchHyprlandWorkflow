import axios from "axios";

const fetchExtract = async (body: []) => {
    baseURL: `https://devatlas.cloud/app/extract/${body}`
}
const extratoApi = axios.create({
    baseURL: "https://devatlas.cloud/app/extract/"
})

export default extratoApi