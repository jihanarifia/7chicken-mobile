import React, { Component } from 'react';
import { View, ImageBackground, TouchableWithoutFeedback, Image, FlatList, ActivityIndicator } from 'react-native'
import { Container, Text, Grid, Col, Icon } from 'native-base';
import { strings, Color, Font, Screen } from '@api/localization';
import { styles } from '../components/profileStyle';
import { CustomButton } from '@components/customButton';
import { PROFILE, APP_VERSION } from '@api/constants';
import { ModalAlert, ModalAlert as ModalError } from '@components/modalMessage';
import Skeleton from '../components/skeletonProfile';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuList: [
        { id: 1, title: strings.changeProfile, rootName: 'changeProfile' },
        { id: 2, title: strings.faq, rootName: 'faq' },
        { id: 3, title: strings.contactUs, rootName: 'contactUs' },
        { id: 4, title: strings.privacyPolicy, rootName: 'PrivacyPolicy' },
      ],
      isLoadingLogout: false,
      isLoading: false,
      isModalAlert: false,
      msgAlert: '',
      isDefaultUnit: false,
      isModalUnit: false,
      rootName: '',
      isModalError: false,
      txtAlert: '',
    }
  }

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.getStorage();
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  getStorage() {
    this.setState({ isLoading: false });
  }

  logOut() {
    this.props.navigation.navigate('Login')
  }

  renderNavBar = () => (
    <View style={{ padding: 10 }}>
      <Text style={{ color: 'black', fontWeight: 'bold' }}>Profile</Text>
    </View>
  )

  renderImgProfile() {
    return (
      <View>
        <ImageBackground
          style={[styles.circle, { justifyContent: 'center', alignItems: 'center' }]}
          imageStyle={{ borderRadius: 40 }}>
          <Image
            style={{ width: 35, height: 35 }}
            resizeMode={'contain'}
            source={require('@assets/logo.png')}>
          </Image>
        </ImageBackground >
      </View>
    );
  }

  renderItem(item) {
    return (
      <View>
        {item.id == 3 || item.id == 7 ? <View style={{ width: Screen.SCREEN_WIDTH, padding: 3, backgroundColor: '#EFEFEF', marginBottom: 10 }} /> : null}
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate(item.rootName)}>
          <View>
            <View style={{ flexDirection: 'row', marginHorizontal: 25, marginVertical: 15 }}>
              <Text style={styles.txtName}>{item.title}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
                <Icon active name='ios-arrow-forward' style={{ color: Color.GREY, fontSize: 16 }} />
              </View>
            </View>
            <View style={{ width: Screen.SCREEN_WIDTH, height: 1, backgroundColor: Color.GREY, marginLeft: 20 }}></View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  render() {
    return (
      <Container>
        {/* <View style={styles.navbarContainer}>
          {this.renderNavBar()}
        </View>
        <View style={styles.devide} /> */}
        <View>
          <View style={styles.contentBody}>
            <View style={{ flexDirection: 'row', padding: 25 }}>
              {this.renderImgProfile()}
              <Grid style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
                <Col>
                  <Text style={styles.txtName}>{'first_name'}</Text>
                  <Text style={styles.txtDesc}>{'email'}</Text>
                  <Text style={styles.txtDesc}>{'phone_number'}</Text>
                </Col>
              </Grid>
            </View>
            <View style={{ width: Screen.SCREEN_WIDTH, padding: 3, backgroundColor: '#EFEFEF' }} />
            {this.state.isLoading ? <Skeleton /> : <FlatList
              style={{ marginTop: 10 }}
              data={this.state.menuList}
              keyExtractor={(x, i) => i.toString()}
              onEndReachedThreshold={0.5}
              renderItem={({ item }) => this.renderItem(item)} />}
          </View>
          <TouchableWithoutFeedback onPress={() => this.logOut()} >
            <Text style={[styles.txtName, { textAlign: 'center', marginTop: -10 }]}>{strings.logout}</Text>
          </TouchableWithoutFeedback>
          <Text style={[styles.txtName, { textAlign: 'center', marginTop: -10 }]}>{APP_VERSION}</Text>
        </View>
        <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}>
          <CustomButton
            style={{}}
            backgroundColor={['white', 'white']}
            isLoading={this.state.isLoadingLogout}
            textButton={strings.logout}
            fontSize={14}
            fontFamily={Font.BOLD}
            colorText={'red'}
            colorLoading={Color.GREY}
            onPress={() => this.logOut()} />
          <Text style={[styles.txtName, { textAlign: 'center', marginTop: -10 }]}>{APP_VERSION}</Text>
        </View>

        <ModalAlert
          isModalVisible={this.state.isModalAlert}
          title={this.state.msgAlert.includes('try') ? strings.oopsWrong : strings.success}
          txtAlert={this.state.msgAlert}
          txtBtn={this.state.msgAlert.includes('try') ? strings.tryAgain : strings.ok}
          type={this.state.msgAlert.includes('try') ? null : 1}
          dismiss={() => this.setState({ isModalAlert: false })}
          handleOk={() => this.state.msgAlert.includes('try') ? this.setState({
            isModalAlert: false,
          }) : null}
        />

        <ModalError
          isModalVisible={this.state.isModalError}
          title={strings.oopsWrong}
          txtAlert={this.state.txtAlert}
          isHideTitle={true}
          dismiss={() => this.setState({ isModalError: false })}
          handleOk={() => this.setState({ isModalError: false })}
        />

      </Container>
    );
  }
}

export default Profile;
