import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8000/api';

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).then(responseBody),
};

const Auth = {
  login: (email, password) =>
    requests.post('/user/login', { user: { email, password } }),
};

let token = null;

export default {
  Auth,
  setToken: (_token) => { token = _token; },
};
