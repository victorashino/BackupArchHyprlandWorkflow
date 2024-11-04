import { ICreatePixKey } from '@/interface/areaPix.interface'
import { api } from './api'

class AreaPixApi {
  public async createPixKey(data: ICreatePixKey) {
    try {
      const res = await api
        .post('app/pix/keys/create', data)
        .then((res) => {
          return res.data
        })
        .catch((e) => {
          return e.response.data
        })
      return res
    } catch (error) {
      console.error('Error fetching companies:', error)
      throw error
    }
  }

  public async veridyPixKey(key: any) {
    try {
      const res = await api
        .post('app/pix/consult', key)
        .then((res) => {
          return res
        })
        .catch((e) => {
          return e.response.data
        })
      return res
    } catch (error) {
      console.error('Error fetching companies:', error)
      throw error
    }
  }

  public async listKeyPix() {
    try {
      const res = await api.get('app/pix/keys/list')
      return res.data
    } catch (error) {
      console.error('Error fetching companies:', error)
      throw error
    }
  }

  public async sendPix(data: any) {
    try {
      const res = await api
        .post('app/pix/send', data)
        .then((res) => {
          return res
        })
        .catch((e) => {
          return e.response.data
        })
      return res
    } catch (error) {
      console.error('Error fetching companies:', error)
      throw error
    }
  }

  public async listContactsPix() {
    try {
      const res = await api
        .get('app/contacts/list')
        .then((res) => {
          return res
        })
        .catch((e) => {
          return e.response.data
        })
      return res
    } catch (error) {
      console.error('Error fetching contacts pix:', error)
      throw error
    }
  }

  public async deleteContactsPix(data) {
    try {
      const res = await api
        .post('app/contacts/delete', data)
        .then((res) => {
          return res
        })
        .catch((e) => {
          return e.response.data
        })
      return res
    } catch (error) {
      console.error('Error fetching contacts pix:', error)
      throw error
    }
  }
}

export default new AreaPixApi()
