import { api } from './api';
import { returnOnlyNumbers } from '../utils/returnOnlyNumbers';

class AuthApi {
  public async login({ doc, pwd, notifyId, biopwd }: { doc: string; pwd?: string, notifyId: string, biopwd?: string }) {
    let data: any = {};

    if (pwd) {
      data = {
        doc: returnOnlyNumbers(doc),
        pwd: pwd, // Senha enviada sem criptografia
        notifyId: notifyId
      };
    } else if (biopwd) {
      data = {
        doc: returnOnlyNumbers(doc),
        biopwd: biopwd, // Biometria enviada sem criptografia
        notifyId: notifyId
      };
    }

    const res: any = await api.post('actions/login_app', data); // Nenhuma decodificação necessária
    return JSON.parse(res.data); // Assumindo que a resposta já está em JSON
  }
}

export default new AuthApi();
