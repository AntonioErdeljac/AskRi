import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8000/api';

let token = null;

const tokenPlugin = (req) => {
  if (token) {
    req.set('Authorization', `Token ${token}`);
  }
};

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
};

const Auth = {
  current: () =>
    requests.get('/user/current'),
  login: (email, password) =>
    requests.post('/user/login', { user: { email, password } }),
};

const Questions = {
  private: () =>
    requests.get('/question/private'),
  delete: id =>
    requests.del(`/question/${id}`),
  byUsername: username =>
    requests.get(`/question/profile/${username}`),
  new: (user, question) =>
    requests.post('/question/new', { question: { question, receiver: user } }),
  answer: (id, answer) =>
    requests.post(`/question/${id}/answer`, { answer: { answer } }),
};

const Profile = {
  get: username =>
    requests.get(`/profiles/${username}`),
};

export default {
  Auth,
  Questions,
  Profile,
  setToken: (_token) => { token = _token; },
};
