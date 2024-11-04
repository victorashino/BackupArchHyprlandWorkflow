import { api } from "./api";
import axios from "axios";

class TransferApi {
  public async sendTransfer(data: any) {
    try {
      const res = await api
        .post("app/ted/send", data)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          return e.response.data;
        });
      console.log("Response Transfer", res.data);
      return res;
    } catch (error) {
      console.error("Erro na requisição de transferência: ", error);
      throw error;
    }
  }

  public async getBanks() {
    try {
      const response = await axios.get("https://brasilapi.com.br/api/banks/v1");
      return response.data;
    } catch (error) {
      console.error("Erro na requisição de transferência: ", error);
      throw error;
    }
  }

  public async getBankByCode(code: string) {
    try {
      const response = await axios.get(
        `https://brasilapi.com.br/api/banks/v1/${code}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro na requisição de transferência: ", error);
      throw error;
    }
  }
}

export default new TransferApi();
