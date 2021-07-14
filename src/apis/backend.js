import axios from 'axios';
import jwtDecode from 'jwt-decode';

class ApiClient {
  constructor() {
    this.axiosConfig = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      validateStatus: (status) => status < 500,
    });
  }

  /**
   * Auth
   */

  async loginUser(formValues) {
    return this.axiosConfig.post('/auth', formValues);
  }

  async createUser(formValues) {
    return this.axiosConfig.post('/users', formValues);
  }

  /**
   * User
   */

  async retrieveUserProfile(token) {
    return this.axiosConfig.get('/users/me', { headers: { Authorization: `Bearer ${token}` } });
  }

  async updateUser(formValues, token) {
    const data = { ...formValues };
    if (!data.password) {
      delete data.password;
      delete data.passwordConfirmation;
    }
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.axiosConfig.patch(`/users/${jwtDecode(token).sub}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Properties
   */

  async retrieveProperties() {
    return this.axiosConfig.get('/properties');
  }

  async getProperty(propertyId) {
    return this.axiosConfig.get(`/properties/${propertyId}`);
  }

  async createProperty(formValues, token) {
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });

    return this.axiosConfig.post('/properties/', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateProperty(propertyId, formValues, token) {
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });

    return this.axiosConfig.patch(`/properties/${propertyId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteProperty(propertyId, token) {
    return this.axiosConfig.delete(`/properties/${propertyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Properties
   */

  async retrievePropertyComments(propertyId) {
    return this.axiosConfig.get(`/properties/${propertyId}/comments`);
  }

  /**
   * Admin
   */

  async retrieveReports(token) {
    return this.axiosConfig.get('/admin/reports', {
      headers: { Authotization: `Bearer ${token}` },
    });
  }
}

const apiClient = new ApiClient();

export default apiClient;
