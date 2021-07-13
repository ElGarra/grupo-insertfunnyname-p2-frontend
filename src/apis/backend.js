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
   * Comments
   */

  async retrievePropertyComments(propertyId) {
    return this.axiosConfig.get(`/properties/${propertyId}/comments`);
  }

  async createPropertyComment(propertyId, formValues, token) {
    return this.axiosConfig.post(`/properties/${propertyId}/comments`, formValues, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updatePropertyComment(propertyId, commentId, formValues, token) {
    return this.axiosConfig.patch(`/properties/${propertyId}/comments/${commentId}`, formValues, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deletePropertyComment(propertyId, commentId, token) {
    return this.axiosConfig.delete(`/properties/${propertyId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Meetings
   */

  async createPropertyMeeting(propertyId, formValues, token) {
    return this.axiosConfig.post(`/properties/${propertyId}/meetings`, formValues, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async retrievePropertyMeetings(propertyId, token) {
    return this.axiosConfig.get(`/properties/${propertyId}/meetings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async retrieveUserMeetings(token) {
    return this.axiosConfig.get('/users/me/meetings', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getMeeting(meetingId, token) {
    return this.axiosConfig.get(`/meetings/${meetingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateMeeting(meetingId, formValues, token) {
    return this.axiosConfig.patch(`/meetings/${meetingId}`, formValues, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async deleteMeeting(meetingId, token) {
    return this.axiosConfig.delete(`/meetings/${meetingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Reports
   */

  async createUserReport(userId, token) {
    return this.axiosConfig.post(`/users/${userId}/reports`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createCommentReport(commentId, token) {
    return this.axiosConfig.post(`/colmments/${commentId}/reports`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Admin
   */
}

export const parseErrors = (response) => {
  const { error } = response.data;
  const { errors } = response.data;
  let errorMessage = `${error}. `;
  if (errors) {
    errorMessage += Object.values(errors).join('. ');
  }
  throw new Error(errorMessage);
};

const apiClient = new ApiClient();

export default apiClient;
