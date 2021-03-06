import axios from "axios";

const createBody = (params) => {
  return {
    ...params,
    AccountTypeName: params.AccountTypeName.value,
    CurrencyType: params.CurrencyType.value,
    ClientState: params.ClientState.value,
  };
};

class AccountService {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  createDeposit(params) {
    const body = createBody(params);

    return axios.post(`${this.baseUrl}/account/register/deposit`, body);
  }

  createCredit(params) {
    const body = createBody(params);

    return axios.post(`${this.baseUrl}/account/register/credit`, body);
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

  finishDay() {
    return axios.post(`${this.baseUrl}/account/close/day`);
  }

  closeAccount(contractNumber) {
    return axios.post(`${this.baseUrl}/account/revoke/${contractNumber}`);
  }
}

export const accountService = new AccountService({
  baseUrl: "http://localhost:8000",
});
