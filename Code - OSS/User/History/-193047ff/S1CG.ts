import FormData from 'form-data'
import { api } from './api'
import md5 from 'md5'
import { returnOnlyNumbers } from '@/src/utils/returnOnlyNumbers'

import { formatDate } from '@/src/utils/formatDate'
import { IRegisterUser } from '../interface/auth.interface'

class UserApi {
  public async create(data: IRegisterUser) {
    const fd = new FormData()

    fd.append('name', data.name)
    fd.append('doc_number', returnOnlyNumbers(data.doc_number))
    fd.append('doc', returnOnlyNumbers(data.doc))
    fd.append('doc_type', data.doc_type)
    fd.append('phone', returnOnlyNumbers(data.phone))
    fd.append('email', data.email)
    fd.append('pwd', md5(data.pwd))
    fd.append('mother_name', data.mother_name)
    fd.append('sex', data.sex)
    fd.append('marital_status', data.marital_status)
    fd.append('nationality', data.nationality)
    fd.append('born_state', data.born_state)
    fd.append('born_city', data.born_city)
    fd.append('politically_exposed', data.politically_exposed === true ? 1 : 0)
    fd.append('profession', data.profession)
    fd.append('ticket', returnOnlyNumbers(data.ticket))
    fd.append('street', data.street)
    fd.append('birth', formatDate(data.birth))
    fd.append('st_comp', data.st_comp)
    fd.append('st_number', data.st_number)
    fd.append('district', data.district)
    fd.append('city', data.city)
    fd.append('uf', data.uf)
    fd.append('code', data.code)
    fd.append('zip', returnOnlyNumbers(data.zip))

    fd.append('issuing', data.issuing)
    fd.append('issue_date', formatDate(data.issue_date))
    fd.append('issue_state', data.issue_state)

    const frontUriParts = data.front_doc.split('.')
    const frontFileType = frontUriParts[frontUriParts.length - 1]
    fd.append(
      'front_doc',
      JSON.parse(
        JSON.stringify({
          uri: data.front_doc,
          name: `image.${frontFileType}`,
          type: `image/${frontFileType}`
        })
      )
    )

    const backUriParts = data.back_doc.split('.')
    const backFileType = backUriParts[backUriParts.length - 1]
    fd.append(
      'back_doc',
      JSON.parse(
        JSON.stringify({
          uri: data.back_doc,
          name: `image.${backFileType}`,
          type: `image/${backFileType}`
        })
      )
    )

    const selfieUriParts = data.selfie.split('.')
    const selfieFileType = selfieUriParts[selfieUriParts.length - 1]
    fd.append(
      'selfie',
      JSON.parse(
        JSON.stringify({
          uri: data.selfie,
          name: `image.${selfieFileType}`,
          type: `image/${selfieFileType}`
        })
      )
    )
    console.log(fd)
    return api.post('actions/register', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  public async checkCode(code: string) {
    return api.post('actions/check_invite', { code })
  }

  public async checkPassword(password: string) {
    return api.post('app/perfil/check_pwd', { pwd: md5(password) })
  }

  public async updateAddress(data: IRegisterUser, code: string) {
    return api.post('app/perfil/update_address', { ...data, code })
  }

  public async info() {
    const res = await api.get('app/get_info')
    return {
      "name": "Filipe Soares",
      "account": "13600000001-4",
      "agency": "1",
      "amount": "0",
      "notification": false,
      "biopwd": true,
      "wl_mail": "contato@atlasfinance.com.br",
      "releases": [
        {
          "id": "257ddf60db2f421890afdd9238fc0395",
          "method": "TED",
          "send": 1,
          "name": "Filipe Soares",
          "amount": 250,
          "created": "2024-08-27 18:12:21"
        },
        {
          "id": "8dfeb692a71c43dd92c52eb19923628f",
          "method": "pix",
          "send": 1,
          "name": "FLAVIO HERMENEGILDO GIMENEZ",
          "amount": 200,
          "created": "2024-07-29 20:08:57"
        },
        {
          "id": "a2fa6a3e0b7f45e2b48dca8829b64517",
          "method": "pix",
          "send": 1,
          "name": "FLAVIO HERMENEGILDO GIMENEZ",
          "amount": 500,
          "created": "2024-07-29 23:07:13"
        },
        {
          "id": "66b1a682183c48f49fcbd18f8c1a29b7",
          "method": "pix",
          "send": 0,
          "name": "DONALDSDEVELOPER",
          "amount": 1000,
          "created": "2024-07-15 16:15:26"
        },
        {
          "id": "ef0bd218083a4915aff6ebff7317a162",
          "method": "pix",
          "send": 0,
          "name": "MAX TECH",
          "amount": 927,
          "created": "2024-07-12 18:08:13"
        },
        {
          "id": "56ca75a826f24e2e81364b04abbb348b",
          "method": "pix",
          "send": 0,
          "name": "MAX TECH",
          "amount": 1023,
          "created": "2024-07-12 18:00:07"
        }
      ]
    }
  }
}

export default new UserApi()
