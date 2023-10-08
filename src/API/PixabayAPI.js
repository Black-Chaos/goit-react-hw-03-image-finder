import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = { key: '792320-7a71d886dafa6d07f7761f23d' };

export class PixabayAPI {
  config = {
    params: {
      q: '',
      page: 1,
      per_page: 20,
    },
  };

  constructor(endpoint = '') {
    this.endpoint = endpoint;
  }

  async search() {
    return axios(`${this.endpoint}`, this.config).then(({ data }) => {
      this.config.params.page += 1;
      return data;
    });
  }

  currentPage() {
    return this.config.params.page -1;
  }

  setSearchQuestion(q) {
    this.config.params.q = q;
    this.config.params.page = 1;
  }

  setParams(params) {
      this.config.params = {...this.config.params, ...params}
  }

  setConfig(config) {
    for (const key in config) {
      this.config[key] = { ...this.config[key], ...config[key] };
    }
  }
}
