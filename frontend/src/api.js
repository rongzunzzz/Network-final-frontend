import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:4000/`, // "https://316c-140-112-25-20.jp.ngrok.io"
});

export default instance;
