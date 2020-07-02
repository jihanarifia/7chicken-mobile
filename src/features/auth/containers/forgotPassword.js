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

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isLoading: false,
      isModalAlert: false,
    };
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.navigate('Login');
    return true;
  }

  _exec() {
    this.setState({ isLoading: true });
    Axios.post(USER.FORGOT_PASSWORD, {
      email: this.state.email,
    }).then((response) => {
      if (response.status === 200) {
        this.setState({ isLoading: false });
        // if (response.data) {
        //   if (response.data.hasOwnProperty('token')) {
        //     this.getProfile();
        //     help.setToken(response.data.token);
        //   }
        // } else {
        this.setState({ isModalAlert: true });
        // }
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
            <Text style={styles.title}>{strings.forgetPassword}</Text>
            <Text style={styles.desc}>{strings.forgetPasswordNote}</Text>
            <View style={{ marginTop: 100 }}>
              <InputValidateGroupWithValue
                styleInput={{ color: 'grey' }}
                placeholder={strings.email}
                handleChange={(x) => this.setState({ email: x })}
              />
            </View>
            <Button style={styles.btn} onPress={() => this._exec()}>
              <Text style={styles.buttonText}>{strings.submit}</Text>
            </Button>
          </View>
        </Content>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Register')}><Text style={styles.signup} >{strings.signUpQuestion}<Text style={[styles.signup, { color: Color.PRIMARY, fontWeight: 'bold' }]} > {strings.signUp}</Text></Text></TouchableWithoutFeedback>
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

export default ForgotPassword;
