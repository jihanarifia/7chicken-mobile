import LocalizedStrings from 'react-native-localization';
import AStorage from '@api/asyncStorage';
import { Dimensions } from 'react-native';

const strings = new LocalizedStrings({
  en: {
    //Letter A
    appName: '7Chicken',
    //Letter B
    back: 'Back',
    //Letter C
    //Letter D
    defaultLang: 'en',
    //Letter E
    //Letter F
    forgetPassword: 'Forget your password?',
    //Letter G
    gotIt: 'Got It',
    //Letter H
    //Letter I
    //Letter J
    //Letter K
    //Letter L
    login: 'Login',
    //Letter M
    //Letter N
    no: 'No',
    //Letter O
    //Letter P
    password: 'Password',
    //Letter Q
    //Letter R
    //Letter S
    signUp: 'Sign Up',
    signUpNote: 'Don\'t have an account?',
    //Letter T
    //Letter U
    username: 'Username',
    //Letter V
    //Letter X
    //Letter Y
    yes: 'Yes',
    //Letter Z
  },
  ina: {
    //Huruf A
    appName: '7Chicken',
    //Huruf B
    back: 'Back',
    //Huruf C
    //Huruf D
    defaultLang: 'en',
    //Huruf E
    //Huruf F
    forgetPassword: 'Lupa kata sandi?',
    //Huruf G
    gotIt: 'Got It',
    //Huruf H
    //Huruf I
    //Huruf J
    //Huruf K
    //Huruf L
    login: 'Login',
    //Huruf M
    //Huruf N
    no: 'No',
    //Huruf O
    //Huruf P
    password: 'Password',
    //Huruf Q
    //Huruf R
    //Huruf S
    signUp: 'Sign Up',
    signUpNote: 'Tidak punya akun?',
    //Huruf T
    //Huruf U
    username: 'Username',
    //Huruf V
    //Huruf X
    //Huruf Y
    yes: 'Yes',
    //Huruf Z
  },
},
);

AStorage.getItem('language')
  .then(res => {
    strings.setLanguage(res);
  })
  .catch(error => {
    strings.setLanguage('en');
  });

const Color = {
  PRIMARY: '#a50000',
  SECONDARY: '#ffe100',
  INTERMEDIATE: '#a54a00',
  DARK_GREY: '#565656',
  GREY: '#D8D8D8',
  LIGHT_GREY: '#F5F5F5',
  BLACK: 'black',
  WHITE: 'white',
  GREEN: '#32BA7C',
  BLUE: '#4A90E2',
  PINK: '#EB527F',
  PURPLE: '#536CC4',
  YELLOW: '#F8C36E',
  BRIGHT_ORANGE: '#fffaf2',
  LIGHT_BLUE: '#26a9e0',
  LIGHT_GREEN: '#3FED72',
  LIGHT_ORANGE: '#F5A623',
  LIGHT_RED: '#E04059',
  DARK_GREEN: '#2FA551',
  DARK_BLUE: '#23405A',
  RED_DOFF: '#BE1E2D',
  TXT_BLUE: '#0651A9',
  TXT_ORANGE: '#E57924',
  TXT_LIGHT_GREY: '#4A4A4A',
  TXT_RED: '#9E1B25',
  TXT_ALERT_GREY: '#666666',
  TXT_GREY: '#9B9B9B',
  LANGUAGE_GREY: '#808285',
  LINE: '#D0DAE8',
  PRIVACY_RED: '#9E1B25',
  BG_GREY: '#F4F4F4',
  SKELETON: '#dedfe0',
  ICON_GREY: '#80868B',
  BG_GREY: '#EEEEEE',
};

const Screen = {
  SCREEN_WIDTH: Dimensions.get('window').width,
  SCREEN_HEIGHT: Dimensions.get('window').height,
  HALF_SCREEN_WIDTH: Dimensions.get('window').width / 2,
};

const Font = {
  LIGHT: 'AvenirLTStd-Roman',
  BOLD: 'AvenirLTStd-Black',
  MEDIUM: 'AvenirLTStd-Heavy',
  NEXT_DB: 'AvenirNext-DemiBold',
  NEXT_MEDIUM: 'AvenirNext-Medium',
  NEXT_BOLD: 'AvenirNext-Bold'
};

export { strings, Color, Screen, Font };
