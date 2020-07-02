import { StyleSheet, Dimensions } from 'react-native';
import { Screen, Font, Color } from '../../../api/localization';

export { styles };

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: 200,
    height: 200
  },
  btn: {
    width: 300,
    backgroundColor: Color.PRIMARY,
    borderRadius: 25,
    marginVertical: 20,
    paddingVertical: 13,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    margin: 100,
    fontSize: 16,
    fontWeight: '500',
    color: Color.WHITE,
    textAlign: 'center',
    alignSelf: 'center'
  },
  later: {
    fontSize: 14,
    fontFamily: Font.LIGHT,
    alignSelf: 'center',
    color: Color.BLACK
  },
  signup: {
    fontSize: 14,
    fontFamily: Font.LIGHT,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    color: Color.BLACK
  },
  title: {
    fontSize: 18,
    fontFamily: Font.LIGHT,
    fontWeight: "bold",
    alignSelf: 'center',
    color: Color.BLACK,
    textTransform: 'uppercase'
  },
  desc: {
    fontSize: 13,
    fontFamily: Font.LIGHT,
    textAlign: 'center',
    color: Color.PRIMARY,
    paddingVertical: 10
  },
  txtBold14: {
    fontFamily: Font.BOLD,
    fontSize: 14,
    color: Color.PRIMARY,
  },
  txtTimer: {
    fontFamily: Font.LIGHT,
    fontSize: 14,
    marginTop: 10
  },
  txtRegular15: {
    fontFamily: Font.LIGHT,
    fontSize: 15,
    marginTop: 20
  },
});
