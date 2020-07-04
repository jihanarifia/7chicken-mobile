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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      phonenumber: '',
      email: '',
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

  _execForm() {

    this.props.navigation.navigate('OTP');
    // return false;
    this.setState({ isLoading: true });
    Axios.post(USER.REGISTER, {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phonenumber: this.state.phonenumber,
      email: this.state.email,
      password: this.state.password,
        "address": "string", //not required
        "birth_date": "string", // dd-mm-yyyy
        "display_name": "string",
        "email": "string",
        "is_deleted": true, // hapus
        "level_id": "string", // level user 
        "member_no": "string", //a
        "password": "string",
        "phone": "string", // +63 harus
        "role_ids": [ // isi hardcode
          "string"
        ],
      
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
            <Text style={styles.title}>{strings.signUp}</Text>
            <View style={{ marginTop: 20 }}>
              <InputValidateGroupWithValue
                styleInput={{ color: 'grey' }}
                placeholder={strings.firstName}
                handleChange={(x) => this.setState({ firstname: x })} />
              <InputValidateGroupWithValue
                styleInput={{ color: 'grey' }}
                placeholder={strings.lastName}
                handleChange={(x) => this.setState({ lastname: x })} />
              <InputValidateGroupWithValue
                styleInput={{ color: 'grey' }}
                placeholder={strings.phoneNumber}
                handleChange={(x) => this.setState({ phonenumber: x })} />
              <InputValidateGroupWithValue
                styleInput={{ color: 'grey' }}
                placeholder={strings.email}
                handleChange={(x) => this.setState({ email: x })} />
              <InputValidateGroupWithValue
                secureTextEntry={true}
                styleInput={{ color: 'grey' }}
                placeholder={strings.password}
                handleChange={(x) => this.setState({ password: x })} />
            </View>
            <Button style={styles.btn} onPress={() => this._execForm()}>
              <Text style={styles.buttonText}>{strings.signUp}</Text>
            </Button>
          </View>
        </Content>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.signup} >{strings.signInQuestion}<Text style={[styles.signup, { color: Color.PRIMARY, fontWeight: 'bold' }]} > {strings.signIn}</Text></Text></TouchableWithoutFeedback>
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

export default Register;
