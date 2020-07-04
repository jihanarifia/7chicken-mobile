import React, { Component } from 'react';
import { View, BackHandler, Image, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import { InputValidateGroupWithValue } from '@components/formValidate';
import { strings } from '@api/localization';
import Axios from 'axios';
import { USER } from '@api/constants';
import { styles } from '../components/indexStyle';
import AStorage from '@api/asyncStorage';
import help from '@api/helper';
import { ModalAlert } from '../../../components/modalMessage';
import { Color } from '../../../api/localization';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isLoading: false,
      isModalAlert: false,
      isSuccess: false,
    };
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.navigate('Home');
    return true;
  }

  execLogin() {
    this.setState({ isLoading: true });
    Axios.post(USER.LOGIN, {
      "identifier": this.state.username,
      "password": this.state.password
    }).then((response) => {
      if (response.status === 200) {
        console.log(response)
        if (response.data) {
          if (response.data.hasOwnProperty('access_token')) {
            help.setToken(response.data.access_token);
            this.getProfile(response.data.user_id);
          }
        }
      }
    }).catch(error => {
      this.setState({ isLoading: false, isModalAlert: true });
    })
  }

  getProfile(user_id) {
    Axios.get(USER.GET_PROFILE + user_id).then((response) => {
      if (response.status === 200) {
        if (response.data.hasOwnProperty('result')) {
          console.log(response)
          this.props.navigation.navigate('Home')
          AStorage.setItem('userData', response.data.result);
          this.setState({ isLoading: false, isModalAlert: true, isSuccess: true });
        }
      }
    }).catch(() => {
      this.setState({ isLoading: false, isModalAlert: true });
    });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <View style={{ margin: 25, alignContent: 'center', justifyContent: 'center' }}>
            <Image
              style={styles.logo}
              source={require('@assets/logo.png')}>
            </Image>
            <View style={{ marginTop: 100 }}>
              <InputValidateGroupWithValue
                styleInput={{ color: 'grey' }}
                placeholder={strings.username}
                handleChange={(x) => this.setState({ username: x })}
              />
              <InputValidateGroupWithValue
                secureTextEntry={true}
                styleInput={{ color: 'grey' }}
                placeholder={strings.password}
                handleChange={(x) => this.setState({ password: x })}
              />
            </View>
            <Button style={styles.btn} onPress={() => this.execLogin()}>
              <Text style={styles.buttonText}>{strings.login}</Text>
            </Button>
            {/* <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}><Text style={styles.later} >No, Maybe Later!</Text></TouchableWithoutFeedback> */}
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ForgotPassword')}><Text style={styles.later} >{strings.forgetPassword}</Text></TouchableWithoutFeedback>

          </View>
        </Content>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Register')}><Text style={styles.signup} >{strings.signUpQuestion}<Text style={[styles.signup, { color: Color.PRIMARY, fontWeight: 'bold' }]} > {strings.signUp}</Text></Text></TouchableWithoutFeedback>
        <ModalAlert
          isModalVisible={this.state.isModalAlert}
          title={this.state.isSuccess ? strings.successMsg : strings.oopsWrong}
          txtAlert={this.state.isSuccess ? strings.successLogin : strings.failedLogin}
          handleOk={() => {
            this.setState({ isModalAlert: false })
          }}
        />
      </Container>
    );
  }
}

export default Login;
