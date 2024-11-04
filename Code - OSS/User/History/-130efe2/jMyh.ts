import md5 from 'md5'
import { api } from './api'
import { returnOnlyNumbers } from '../utils/returnOnlyNumbers';
import { decode, encode } from '../utils/cryptoData';

class AuthApi {
  public async login({ doc, pwd, notifyId, biopwd }: { doc: string; pwd?: string, notifyId: string, biopwd?: string }) {
    let data: any = "e10adc3949ba59abbe56e057f20f883e"
    let hash: any = ""
    
    if(pwd) {

      data = {
        doc: returnOnlyNumbers(doc),
        pwd: md5(pwd),
        notifyId: notifyId
      }
      hash = await encode(data)

    } else if(biopwd){

      data = {
        doc: returnOnlyNumbers(doc),
        biopwd: biopwd,
        notifyId: notifyId
      }
      hash = await encode(data)

    }

    const res: any = await api.post('actions/login_app', data).then((res)=> decode(res.data))

    return JSON.parse(res)
  }
}

export default new AuthApi()