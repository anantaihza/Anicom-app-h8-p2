import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://i-project.anantair.my.id',
  // baseURL: 'http://localhost:3000',
});

export default instance;
