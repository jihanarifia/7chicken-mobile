// DOCUMENT URL http://153.92.5.27/7chicken/apidocs/#/
const BASE_URL = 'http://153.92.5.27/7chicken/';

const VERSION = '';
const APP_VERSION = '0.0.1';

const USER = {
  LOGIN: BASE_URL + VERSION + 'auth/login', //POST
  REGISTER: BASE_URL + VERSION + 'register', //POST
  GET_PROFILE: BASE_URL + VERSION + 'user/', //GET user/{user_id}
  FORGOT_PASSWORD: BASE_URL + VERSION + 'forgotpassword', //POST
};


export {
  USER,
};
