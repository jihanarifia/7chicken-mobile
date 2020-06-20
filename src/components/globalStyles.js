import {StyleSheet} from 'react-native';
import {Screen, Font} from '@api/localization';
import {Color} from '../api/localization';

export {globalStyles, formGlobalStyles};

const globalStyles = StyleSheet.create({
  pageName: {
    fontFamily: Font.MEDIUM,
    fontSize: 30,
    color: Color.DARK_GREY,
  },
  searchBtn: {
    backgroundColor: Color.WHITE,
    borderWidth: 0,
    borderColor: '#808080',
    elevation: 10,
    borderRadius: 10,
    width: '100%',
    marginVertical: '5%'
  },
});

const formGlobalStyles = StyleSheet.create({
  dangerText: {
    color: 'red',
    fontFamily: Font.LIGHT,
  },
  warnText: {
    color: 'yellow',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 15,
    fontSize: 14,
  },
  inputBorder: {
    borderColor: 'grey',
    borderBottomWidth: 0.5,
  },
  buttonBlock: {
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    height: Screen.SCREEN_WIDTH * 0.135,
    alignItems: 'center',
  },
  fontLight: {
    fontFamily: Font.LIGHT,
  },
  fontBold: {
    fontFamily: Font.BOLD,
  }
});
