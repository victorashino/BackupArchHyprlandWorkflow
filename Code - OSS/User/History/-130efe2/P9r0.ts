import md5 from 'md5'
import { api } from './api'
import { returnOnlyNumbers } from '../utils/returnOnlyNumbers';
import { decode, encode } from '../utils/cryptoData';

class AuthApi {
  public async login({ doc, pwd, notifyId, biopwd }: { doc: string; pwd?: string, notifyId: string, biopwd?: string }) {
    
    let hash

    if(pwd) {

      hash = {
        doc: returnOnlyNumbers(doc),
        pwd: md5(pwd),
        notifyId: notifyId
      }

    } else if(biopwd){

      hash = {
        doc: returnOnlyNumbers(doc),
        biopwd: biopwd,
        notifyId: notifyId
      }

    }

    const res: any = await api.post('actions/login_app', hash)

    return JSON.parse(res)
  }
}

export default new AuthApi()
