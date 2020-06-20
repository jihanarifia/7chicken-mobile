import moment from 'moment';
import Axios from 'axios';
import 'moment/locale/id';

export default {
  dateTimeToString(yourDate, lang) {
    let newDate = '';
    if (lang === 'ina') {
      moment.locale('id');
      newDate = moment(new Date(yourDate)).format('MMMM DD, YYYY');
    } else {
      moment.locale('en');
      newDate = moment(new Date(yourDate)).format('MMMM DD, YYYY');
    }

    return newDate;
  },
  dateTime(yourDate, type, lang) {
    let newDate = '';
    if (type === 'wtime') {
      if (lang === 'ina') {
        moment.locale('id');
        newDate = moment(new Date(yourDate)).format('DD/MM/YYYY | hh.mm');
      } else {
        moment.locale('en');
        newDate = moment(new Date(yourDate))
          .format('DD/MM/YYYY | hh.mm a')
          .toUpperCase();
      }
    } else {
      newDate = moment(new Date(yourDate)).format('DD/MM/YYYY');
    }

    return newDate;
  },
  setToken(token) {
    if (token) {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      Axios.defaults.headers.common['Authorization'] = null;
    }
  },
  revokeToken() {
    Axios.defaults.headers.common['Authorization'] = null;
  },
  encryptText(plain) {
    var CryptoJS = require('crypto-js');
    var ciphertext = CryptoJS.SHA256(plain).toString();
    return ciphertext;
  },
  convertDate(date) {
    let newDate = new Date(date),
      month = ("0" + (newDate.getMonth() + 1)).slice(-2),
      day = ("0" + newDate.getDate()).slice(-2);
    return [newDate.getFullYear(), month, day].join("-");
  },
  SeperatorNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  },
  expDate(endDate) {
    return moment(new Date(endDate)).format('DD/MM/YY');
  },
  seperator16Digit(digit) {
    return digit.match(/(\d{4})/g).join("-");
  }
};
