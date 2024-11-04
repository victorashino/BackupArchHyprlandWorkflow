import { api } from "./api";

class NotificationApi{
    public async listNotification() {
        try {
            const res = await api.get('app/notifications/list').then((res) => {
                return res
                console.log(res.data)
              })
              .catch((e) => {
                return e.response.data
              })
            return res
        } catch (error) {
        console.error('Error fetching contacts pix:', error)
        throw error
        };
    }

    public async deleteNotification(id: any) {
      try {
          const data = {
            id: id
          }
          const res = await api.post('app/notifications/delete', data).then((res) => {
              return res
            })
            .catch((e) => {
              return e.response.data
            })
          return res
      } catch (error) {
      console.error('Error fetching contacts pix:', error)
      throw error
      };
    }
}

export default new NotificationApi()