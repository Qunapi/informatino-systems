import axios from "axios";

class AtmService {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  authenticate(params) {
    return axios.get(`${this.baseUrl}/authenticate`, { params });
  }

  getStatus(params) {
    return axios.get(`${this.baseUrl}/status`, { params });
  }

  withdraw(params) {
    return axios.get(`${this.baseUrl}/withdraw`, { params });
  }
}

export const atmService = new AtmService({
  baseUrl: "http://localhost:8000/card",
});
