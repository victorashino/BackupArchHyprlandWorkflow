import axios from "axios";

const fetchExtract = async (body: string[]) => {
    const URL = `https://devatlas.cloud/app/extract/${body}`

    try {
        const response = await axios.get(URL);
        console.log('Dados do usuário:', response.data);
        return response.data;
      } catch (error) {
        console.error('services/extratoApi:', error);
        throw error;
      }
}

export default fetchExtract