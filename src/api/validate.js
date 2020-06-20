const validatejs = require('validate.js');

const validate = (formValues, rules) => {
  const result = validatejs(formValues, rules);

  if (result) return result;
  return null;
};

export {validate};
