const { isEmpty, isNil } = require('lodash');

const validatePresence = (body, requiredParams = []) => {
  if (isEmpty(requiredParams)) return null;
  const invalidParams = [];

  requiredParams.forEach(param => {
    if (isNil(body[param])) {
      invalidParams.push(param);
    }
  });
  if (isEmpty(invalidParams)) return null;
  return `Missing required params: ${invalidParams.join(', ')}`;
};

module.exports = { validatePresence };
