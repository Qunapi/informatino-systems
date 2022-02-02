import axios from "axios";

class MetaInfoService {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  getCities() {
    return axios.get(`${this.baseUrl}/cities`);
  }

  getCitizenships() {
    return axios.get(`${this.baseUrl}/citizenships`);
  }

  getDisabilities() {
    return axios.get(`${this.baseUrl}/disabilities`);
  }
}

export const metaInfoService = new MetaInfoService({
  baseUrl: "http://localhost:80",
});
