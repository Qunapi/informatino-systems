import axios from "axios";

const createBody = (params) => {
  console.log({ params });
  return {
    ...params,
    DateOfBirth: params.DateOfBirth,
    DateOfIssue: params.DateOfIssue,
    HomeCity: params.HomeCity,
    Disability: params.Disability,
    Citizenship: params.Citizenship,
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
