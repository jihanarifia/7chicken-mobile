import { StyleSheet, Dimensions } from 'react-native';
import { Screen, Font, Color } from '../../../api/localization';

export { styles };

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 10,
    padding: 20,
    flex: 1
  },
  contentBody: {
    // marginTop: -Screen.SCREEN_HEIGHT * 0.05,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: Color.LIGHT_GREY,
    // borderWidth: 2,
    // borderColor: Color.LIGHT_GREY
  },
  circleEdit: {
    width: 25,
    height: 25,
    borderRadius: 30,
    backgroundColor: Color.GREY_ALERT,
    marginRight: 10,
    marginTop: -16,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtName: {
    fontSize: 14,
    fontFamily: Font.BOLD,
    color: Color.GREY_BLACK,
    marginBottom: 8
  },
  txtDesc: {
    fontSize: 12,
    fontFamily: Font.LIGHT,
    marginBottom: 4
  },
  iconPin: {
    transform: [{ rotate: '180deg' }],
    color: Color.GREY_ALERT,
    fontSize: 20,
    marginRight: 10
  },
  txtInput: {
    color: 'grey',
    fontFamily: Font.LIGHT
  },
  txtTitlePin: {
    fontFamily: Font.LIGHT,
    fontSize: 17,
    color: Color.GREY_BLACK,
    marginBottom: 10
  },
  txtInfo: {
    fontFamily: Font.BOLD,
    fontSize: 14,
    color: Color.PRIMARY,
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  navbarContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: Color.WHITE
  },
  devide: {
    padding: 5,
    backgroundColor: '#EFEFEF',
  },
});
