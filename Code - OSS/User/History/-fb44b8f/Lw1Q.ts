import axios from "axios";

const api = axios.create({
    baseURL: "https://devatlas.cloud/"
})

// const options = {
//     method: 'GET',
//     url: 'https://devatlas.cloud/app/extract',
//     headers: {
//       cookie: 'PHPSESSID=uju88onhi84e03dm2orhtdb3a9',
//       'Content-Type': 'application/json',
//       'User-Agent': 'insomnia/9.3.2',
//       Authorization: 'Bearer MTM2ZGYxYWE4YTVmZWRhZjUzOTk1MGQ0ZTRiYjc2YWU4NjBjZDU1ZDE0ZjMzZjNmMzc0Yjk1ZjY4YTk5ZGFmMDBkZTIwMzJiMzViZGI3MmUyZmEyNDI3Mzg3MjE1MDI2MGNhNjdlZTRhYmNiZGVlNmVmY2QxZDg1NDEyZmY4YmI6MTU='
//     },
//     data: {start: '2024-01-01', end: '2024-07-01', type: 'out'}
//   };
  
//   axios.request(options).then(function (response) {
//     console.log(response.data);
//   }).catch(function (error) {
//     console.error(error);
//   });

export default api