const { isEmpty, isNil } = require('lodash');

const validatePresence = (body, requiredParams = []) => {
  if (isEmpty(requiredParams)) return null;
  const invalidParams = [];

  if (isEmpty(body)) return 'Missing body or body is empty';

  requiredParams.forEach(param => {
    if (isNil(body[param])) {
      invalidParams.push(param);
    }
  });
  if (isEmpty(invalidParams)) return null;
  return `Missing required params: ${invalidParams.join(', ')}`;
};

const validateEmail = email => {
  if (isNil(email)) return 'Email can\'t be null';

  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (regex.test(email)) return null;
  return 'Email format is invalid';
};

const validateName = name => {
  if (isNil(name)) return 'Name can\'t be null';

  if (name.split(' ').length >= 2) return null;
  return 'Name must contain at least 2 names';
};

module.exports = { validatePresence, validateEmail, validateName };
