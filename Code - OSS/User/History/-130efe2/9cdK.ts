import md5 from 'md5'
import { api } from './api'
import { returnOnlyNumbers } from '../utils/returnOnlyNumbers';
import { decode, encode } from '../utils/cryptoData';

class AuthApi {
  public async login({ doc, pwd, notifyId, biopwd }: { doc: string; pwd?: string, notifyId: string, biopwd?: string }) {
    let data: any = {}
    let hash: any = ""
    
    if(pwd) {

      data = {
        doc: "17348288707",
        pwd: "e10adc3949ba59abbe56e057f20f883e",
        notifyId: "ExponentPushToken[XjbxfkK8CSTwNe06iu-WM8]"
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

    const res: any = await api.post('actions/login_app', data)

    return JSON.parse(res)
  }
}

export default new AuthApi()
