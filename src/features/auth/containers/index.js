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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isLoading: false,
      isModalAlert: false,
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
      username: this.state.username,
      password: this.state.password
    }).then((response) => {
      if (response.status === 200) {
        this.setState({ isLoading: false });
        if (response.data) {
          if (response.data.hasOwnProperty('token')) {
            this.getProfile();
            help.setToken(response.data.token);
          }
        } else {
          this.setState({ isModalAlert: true });
        }
      }
    }).catch(error => {
      console.log(error)
      this.setState({ isLoading: false, isModalAlert: true });
    });
  }

  getProfile() {
    Axios.get(USER.GET_PROFILE).then((response) => {
      if (response.status === 200) {
        this.setState({ isLoading: false });
        if (response.data) {
          AStorage.setItem('userData', response.data);
        } else {
          this.setState({ isModalAlert: true });
        }
      }
    }).catch(error => {
      console.log(error)
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
                placeholder={'username'}
                handleChange={(x) => this.setState({ username: x })}
              />
              <InputValidateGroupWithValue
                secureTextEntry={true}
                styleInput={{ color: 'grey' }}
                placeholder={'password'}
                handleChange={(x) => this.setState({ password: x })}
              />
            </View>
            <Button style={styles.btn} onPress={() => this.execLogin()}>
              <Text style={styles.buttonText}>{strings.login}</Text>
            </Button>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}><Text style={styles.later} >No, Maybe Later!</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}><Text style={styles.later} >{strings.forgetPassword}</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}><Text style={styles.later} >{strings.signUp}</Text></TouchableWithoutFeedback>
          </View>
        </Content>
        <ModalAlert
          isModalVisible={this.state.isModalAlert}
          title={"oops Wrong"}
          txtAlert={"Failed Login"}
          handleOk={() => {
            this.setState({ isModalAlert: false })
          }}
        />
      </Container>
    );
  }
}

export default Login;
