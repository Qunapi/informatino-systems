import axios from "axios";

const createBody = (params) => {
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

  async getUsers() {
    const {
      data: { clients },
    } = await axios.get(this.baseUrl);

    clients.forEach((client) => {
      normalizeUser(client);
    });

    return clients;
  }

  async getUser(id) {
    const {
      data: { client: user },
    } = await axios.get(`${this.baseUrl}/${id}`);

    normalizeUser(user);

    return user;
  }

  async getUserByPassport(PassportSerialNumber, PassportNumber) {
    const {
      data: { client: user },
    } = await axios.get(`${this.baseUrl}/find`, {
      params: { PassportSerialNumber, PassportNumber },
    });
    return user;
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

function normalizeUser(user) {
  user.Disability = user.Disability && user.Disability[0]?.TypeName;
  user.Citizenship = user.Citizenship.length && user.Citizenship[0]?.TypeName;
  user.HomeCity = user.HomeCity.length && user.HomeCity[0]?.TypeName;
  return user;
}
