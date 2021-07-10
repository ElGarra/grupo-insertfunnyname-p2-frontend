import axios from 'axios';

class ApiClient {
  constructor() {
    this.axiosConfig = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      validateStatus: (status) => status < 500,
    });
  }

  async loginUser(formValues) {
    return this.axiosConfig.post('/auth', formValues);
  }

  async createUser(formValues) {
    return this.axiosConfig.post('/users', formValues);
  }
}

const apiClient = new ApiClient();

export default apiClient;
