import axios from "axios";

class UserService {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  createUser(params) {
    const body = {
      ...params,
      DateOfBirth: params.DateOfBirth.$d,
      DateOfIssue: params.DateOfIssue.$d,
    };
    console.log(body);
    return axios.post(this.baseUrl, body);
  }
}

export const userService = new UserService("localhost:80/clients");
