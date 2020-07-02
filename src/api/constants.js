const BASE_URL = '';

const VERSION = '';
const APP_VERSION = '0.0.1';

const USER = {
  LOGIN: BASE_URL + VERSION + 'login', //POST
  REGISTER: BASE_URL + VERSION + 'register', //POST
  GET_PROFILE: BASE_URL + VERSION + 'profile', //GET
  FORGOT_PASSWORD: BASE_URL + VERSION + 'forgotpassword', //POST
};


export {
  USER,
};
