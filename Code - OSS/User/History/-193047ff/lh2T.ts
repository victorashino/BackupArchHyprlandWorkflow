import FormData from "form-data";
import { api } from "./api";
import md5 from "md5";
import { returnOnlyNumbers } from "@/src/utils/returnOnlyNumbers";

import { formatDateApi } from "@/src/utils/formatDate";
import { IRegisterSendUser } from "../interface/auth.interface";

class UserApi {
  public async create(data: IRegisterSendUser) {
    const fd = new FormData();

    fd.append("name", data.name);
    fd.append("doc_number", returnOnlyNumbers(data.doc_number));
    fd.append("doc", returnOnlyNumbers(data.doc));
    fd.append("doc_type", data.doc_type);
    fd.append("phone", returnOnlyNumbers(data.phone));
    fd.append("email", data.email);
    fd.append("pwd", md5(data.pwd));
    fd.append("mother_name", data.mother_name);
    fd.append("sex", data.sex);
    fd.append("marital_status", data.marital_status);
    fd.append("nationality", data.nationality);
    fd.append("born_state", data.born_state);
    fd.append("born_city", data.born_city);
    fd.append("politically_exposed", data.politically_exposed === true ? 1 : 0);
    fd.append("profession", data.profession);
    fd.append("ticket", returnOnlyNumbers(data.ticket));
    fd.append("street", data.street);
    fd.append("birth", data.birth);
    fd.append("st_comp", data.st_comp);
    fd.append("st_number", data.st_number);
    fd.append("district", data.district);
    fd.append("city", data.city);
    fd.append("uf", data.uf);
    fd.append("code", data.code);
    fd.append("zip", returnOnlyNumbers(data.zip));

    fd.append("issuing", data.issuing);
    fd.append("issue_date", data.issue_date);
    fd.append("issue_state", data.issue_state);
    console.log("MULTFORMDATA", fd);

    const frontUriParts = data.front_doc.split(".");
    const frontFileType = frontUriParts[frontUriParts.length - 1];

    fd.append(
      "front_doc",
      JSON.parse(
        JSON.stringify({
          uri: data.front_doc,
          name: `image.${frontFileType}`,
          type: `image/${frontFileType}`,
        })
      )
    );

    const backUriParts = data.back_doc.split(".");
    const backFileType = backUriParts[backUriParts.length - 1];
    fd.append(
      "back_doc",
      JSON.parse(
        JSON.stringify({
          uri: data.back_doc,
          name: `image.${backFileType}`,
          type: `image/${backFileType}`,
        })
      )
    );

    const selfieUriParts = data.selfie.split(".");
    const selfieFileType = selfieUriParts[selfieUriParts.length - 1];
    fd.append(
      "selfie",
      JSON.parse(
        JSON.stringify({
          uri: data.selfie,
          name: `image.${selfieFileType}`,
          type: `image/${selfieFileType}`,
        })
      )
    );
    return api.post("actions/register", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  public async checkCode(code: string) {
    return api.post("actions/check_invite", { code });
  }

  public async checkPassword(password: string) {
    return api.post("app/perfil/check_pwd", { pwd: md5(password) });
  }

  public async updateAddress(data: IRegisterSendUser, code: string) {
    return api.post("app/perfil/update_address", { ...data, code });
  }

  public async info() {
    try {
      const res = await api.get("app/get_info");
  
      // Verificar se a resposta contém a chave 'message' e descartá-la
      if (res.data.message === "Unauthorized") {
        console.log("Unauthorized response ignored");
        // Você pode escolher descartar a primeira parte e retornar apenas a segunda parte relevante
        return null;  // Ou trate de outra maneira caso precise
      }
  
      // Retornar o objeto desejado (sem a mensagem Unauthorized)
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching info:", error);
      throw error;
    }
  }
  
}

export default new UserApi();
