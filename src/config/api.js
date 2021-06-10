const { default: axios } = require('axios');
const { camelizeKeys } = require('humps');

const baseURL = process.env.LUIZA_LABS_API;
const api = axios.create({ baseURL });

api.interceptors.response.use(({ data, ...res }) => ({ ...res, data: camelizeKeys(data) }));

module.exports = api;
