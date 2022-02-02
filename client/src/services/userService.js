import axios from "axios";

const createBody = (params) => {
  return {
    ...params,
    DateOfBirth: params.DateOfBirth.$d,
    DateOfIssue: params.DateOfIssue.$d,
    HomeCity: params.HomeCity?.name,
    Disability: params.Disability?.name,
    Citizenship: params.Citizenship?.name,
  };
};

class UserService {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  createUser(params) {
    const body = createBody(params);
    return axios.post(this.baseUrl, body);
  }

  getUsers() {
    return axios.get(this.baseUrl);
  }

  getUser(id) {
    return axios.get(`${this.baseUrl}/${id}`);
  }

  updateUser(id, params) {
    const body = createBody(params);
    return axios.patch(`${this.baseUrl}/${id}`, body);
  }

  deleteUser(id) {
    return axios.delete(`${this.baseUrl}/${id}`);
  }
}

export const userService = new UserService({
  baseUrl: "http://localhost:80/clients",
});
