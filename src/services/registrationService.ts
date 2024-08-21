import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Example API endpoint

interface RegistrationData {
  name: string;
  username: string;
  email: string;
  password: string;
}

const register = async (data: RegistrationData) => {
  return axios.post(API_URL, data);
};

export default { register };
