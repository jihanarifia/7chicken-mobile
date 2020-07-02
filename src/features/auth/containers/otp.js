import React, { Component } from 'react';
import { View, ImageBackground, Image, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { Container, Content, Button, Text, Input, Item, Grid, Col, Icon } from 'native-base';
import { strings, Color, Font, Screen } from '@api/localization';
import { styles } from '../components/indexStyle';
import { USER } from '@api/constants';
import Axios from 'axios';
import { ModalBottom } from '@components/modalMessage';
import AStorage from '@api/asyncStorage';

class OTP extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emailPhone: this.props.navigation.getParam('emailPhone'),
      name: this.props.navigation.getParam('name'),
      typeScreen: this.props.navigation.getParam('type'),
      otpValue: ['', '', '', '', '', ''],
      otpTextInput: [],
      otpNumber: '',
      isEnable: false,
      isLoadingOtp: false,
      isFailValidate: false,
      isModalVisible: false,
      timer: 45,
    };

    this.getStorage();
    this.setTimer();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

  }

  getStorage() {
    AStorage.getItem('userValidate').then(val => {
      if (val) {
        this.setState({ emailPhone: val.email, name: val.name })
      }
    })
  }

  setTimer() {
    this.interval = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })), 1000
    )
  }

  handleBackButton = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  renderInputs() {
    const inputs = Array(6).fill(0);
    const txt = inputs.map(
      (i, j) => <Col key={j} style={{ margin: 5, justifyContent: 'center' }}>
        <Input
          maxLength={1}
          style={{
            textAlign: 'center', fontSize: 24, color: Color.PRIMARY,
            fontFamily: Font.LIGHT, borderBottomWidth: 1,
            borderColor: this.state.isEnable ? Color.PRIMARY : null
          }}
          keyboardType="numeric"
          onChangeText={(v) => this.focusNext(j, v)}
          onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
          onFocus={() => this.setState({ isEnable: true })}
          ref={ref => this.state.otpTextInput[j] = ref}
          value={this.state.otpValue[j]}
          returnKeyType={'done'}
        />
      </Col>
    );
    return txt;
  }

  focusPrevious(key, index) {
    if (key === 'Backspace' && index !== 0) {
      this.state.otpTextInput[index - 1]._root.focus();
    } else if (index == 0) {
      this.setState({ isEnable: false });
    }
  }

  focusNext(index, value) {
    value = value.replace(/[^\w\s]/gi, "")
    let otpValue = [...this.state.otpValue];
    otpValue[index] = value;
    this.setState({ otpValue },
      () => {
        if (index < this.state.otpTextInput.length - 1 && value) {
          this.state.otpTextInput[index + 1]._root.focus();
        }

        if (this.state.otpValue[0] != ''
          && this.state.otpValue[1] != ''
          && this.state.otpValue[2] != ''
          && this.state.otpValue[3] != ''
          && this.state.otpValue[4] != ''
          && this.state.otpValue[5] != '') {
          let joinOtp = this.state.otpValue.join('');
          this.setState({ otpNumber: joinOtp },
            () => {
              this.setState({ isLoadingOtp: true });
              this.validateOtp();
            });
        }
      });
  }

  validateOtp() {
    let params = {
      username: this.state.emailPhone,
      otp: this.state.otpNumber
    }

    this.setState({ isLoadingOtp: true });
    Axios.post(USER.VALIDATE_OTP, params).then((response) => {
      if (response.status === 200) {
        if (this.state.typeScreen === 'ForgotPIN') {
          this.setState({ isLoadingOtp: false, otpValue: ['', '', '', '', '', ''], isFailValidate: false },
            () => this.props.navigation.navigate('PIN', { type: 'ForgotPIN' }));
        } else {
          // signInSuccessMsg
          this.setState({ isLoadingOtp: false, otpValue: ['', '', '', '', '', ''], isFailValidate: false },
            () => this.props.navigation.navigate('PIN', { type: 'register' }));
        }
      }
    }).catch(error => {
      this.setState({ isFailValidate: true, isLoadingOtp: false });
      console.log('error validate otp: ' + JSON.stringify(error.response))
    });
  }

  resendOtp() {
    this.setState({ isLoadingOtp: true });
    Axios.post(USER.SEND_OTP, {
      username: this.state.emailPhone,
      name: this.state.name,
      body: "",
      subject: strings.appName
    }).then((response) => {
      if (response.status === 200) {
        this.setState({
          isLoadingOtp: false, otpValue: ['', '', '', '', '', ''],
          isFailValidate: false, timer: 45
        }, () => this.setTimer());
      }
    }).catch(error => {
      this.setState({ isLoadingOtp: false, isModalVisible: true, txtAlert: strings.errorMsg });
      console.log('error resend: ' + JSON.stringify(error.response))
    });
  }

  renderModalBottom() {
    return (
      <View>
        <Text style={[styles.txtRegular15, { color: '#515151' }]}>{this.state.txtAlert}</Text>
        <Text onPress={() => this.setState({ isModalVisible: false })}
          style={[styles.txtRegular15, { color: Color.PRIMARY, textAlign: 'center', marginTop: 40 }]}>{strings.goBack.toUpperCase()}</Text>
      </View>
    )
  }

  render() {
    return (
      <Container>
        {/* <ImageBackground
          style={{ flex: 1 }}
          source={require('@assets/bg_auth.png')}> */}

        <Content>
          <View style={{ marginHorizontal: 25 }}>
            {/* <Icon
                onPress={() => this.props.navigation.goBack(null)}
                type='AntDesign' name="left"
                style={{ color: Color.PRIMARY, marginVertical: 20 }}
              /> */}

            <Text onPress={() => this.props.navigation.goBack(null)} style={[styles.txtRegular15]}>{strings.goBack}</Text>

            <View style={{ margin: 25, marginTop: Screen.SCREEN_WIDTH / 7, alignItems: 'center', justifyContent: 'center', }}>
              <Image style={styles.logo} source={require('@assets/logo.png')}></Image>
              <Text style={styles.desc}>{strings.otpNote}</Text>
              <Text style={[styles.desc, { fontWeight: 'bold' }]}>{'example@mail.com'}</Text>
              <Item style={{ justifyContent: 'center', borderColor: 'transparent', marginTop: 50 }}>
                <Grid>
                  {this.renderInputs()}
                </Grid>
              </Item>

              {this.state.isFailValidate ?
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                  <Text style={[styles.txtTimer, { color: 'red', textAlign: 'center' }]}>Invalid OTP</Text>
                </View> : null}

              {this.state.isLoadingOtp ?
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                  <Text style={{ width: 30 }}><Icon type="MaterialIcons" name="check" style={{ fontSize: 16, color: Color.GREEN }}></Icon></Text>
                  <Text style={[styles.txtBold14, { marginLeft: 5, color: 'black' }]}>verifying...</Text>
                </View>
                :
                <TouchableWithoutFeedback onPress={() => this.resendOtp()} disabled={this.state.timer === 0 ? false : true}>
                  <View>
                    <Text style={[styles.txtBold14, {
                      marginTop: 20,
                      color: this.state.timer === 0 ? Color.PRIMARY : Color.LIGHT_GREY
                    }]}>{strings.resendOtp}
                      <Text style={styles.txtTimer}>(00 : {this.state.timer < 10 ? "0" + this.state.timer : this.state.timer})</Text>
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              }
            </View>
          </View>
        </Content>

        <ModalBottom
          isModalVisible={this.state.isModalVisible}
          title={strings.oopsWrong}
          renderContent={this.renderModalBottom()}
          dismiss={() => this.setState({ isModalVisible: false })} />
        {/* </ImageBackground> */}
      </Container>
    );
  }
}

export default OTP;
