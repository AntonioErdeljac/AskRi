const jwt = require('express-jwt');
const secret = require('../config').secret;

function getTokenFromHeaders(req) {
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

const auth = {
  required: jwt({
    secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;