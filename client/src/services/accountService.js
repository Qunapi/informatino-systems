import axios from "axios";

const createBody = (params) => {
  return {
    ...params,
    AccountTypeName: params.AccountTypeName.value,
    CurrencyType: params.CurrencyType.value,
  };
};

class AccountService {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  createAccount(params) {
    const body = createBody(params);

    return axios.post(`${this.baseUrl}/account/register/deposit`, body);
  }

  getUserAccounts(id) {
    return axios.get(`${this.baseUrl}/client/${id}/accounts`);
  }

  getAccount(id) {
    return axios.get(`${this.baseUrl}/accounts/${id}`);
  }

  getTransactions(ContractNumber) {
    return axios.get(`${this.baseUrl}/account/transactions/${ContractNumber}`);
  }

  // async getAccounts() {
  //   const {
  //     data: { clients },
  //   } = await axios.get(this.baseUrl);

  //   clients.forEach((client) => {
  //     normalizeUser(client);
  //   });

  //   return clients;
  // }

  // async getUser(id) {
  //   const {
  //     data: { client: user },
  //   } = await axios.get(`${this.baseUrl}/${id}`);

  //   normalizeUser(user);

  //   return user;
  // }

  // updateUser(id, params) {
  //   const body = createBody(params);

  //   return axios.patch(`${this.baseUrl}/${id}`, body);
  // }

  // deleteUser(id) {
  //   return axios.delete(`${this.baseUrl}/${id}`);
  // }
}

export const accountService = new AccountService({
  baseUrl: "http://localhost:80",
});

// function normalizeUser(user) {
//   user.Disability = user.Disability && user.Disability[0]?.TypeName;
//   user.Citizenship = user.Citizenship.length && user.Citizenship[0]?.TypeName;
//   user.HomeCity = user.HomeCity.length && user.HomeCity[0]?.TypeName;
//   return user;
// }
