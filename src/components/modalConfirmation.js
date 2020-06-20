import React, { useState } from 'react';
import { Text, View, Icon, Grid, Col, ListItem, Right, Body, Button, Toast } from 'native-base';
import { StyleSheet, FlatList, TouchableWithoutFeedback, ImageBackground, Image, Clipboard } from 'react-native';
import Modal from "react-native-modal";
import helper from '../api/helper';
import { strings, Color, Font, Screen } from '@api/localization';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';

const ModalWebViewCustom = props => {
  const renderContent = () => {
    if (props.isModalVisible) {      
      return (
        <WebView source={{ uri: props.data.link }} onLoad={props.onLoad} />
      )
    }
  }
  return (
    <Modal isVisible={props.isModalVisible} animationIn='slideInDown' animationOut='slideOutUp' animationOutTiming={500} style={{ margin: 0, backgroundColor: 'white' }} onBackButtonPress={props.isBack}>
      <View style={{ height: Screen.SCREEN_HEIGHT * 0.1 }}>
        <Image style={{ width: null, height: Screen.SCREEN_HEIGHT * 0.15 }} source={require('../assets/bgPurple.png')} />
        <Grid style={{ marginTop: -Screen.SCREEN_HEIGHT * 0.15 }}>
          <Col size={15} style={{ justifyContent: 'center' }}>
            <TouchableWithoutFeedback onPress={props.isBack}>
              <Icon type='MaterialIcons' name='chevron-left' style={{ fontSize: 50, color: 'white' }}></Icon>
            </TouchableWithoutFeedback>
          </Col>
          <Col size={85} style={{ justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 14, fontFamily: Font.BOLD }}>Payment Method</Text>
          </Col>
        </Grid>
      </View>
      {renderContent()}
    </Modal>
  );
}

const ModalConfirmation = props => {
  return (
    <Modal isVisible={props.isModalVisible} animationOutTiming={500}>
      <View style={styles.contentModal}>
        <View>
          <Text style={styles.txtM}>{props.titleModal}</Text>
          <View style={styles.lineHorizontal}></View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.txtM, { flex: 1 }]} onPress={props.closeModal}>{strings.no}</Text>
            <View style={styles.lineVertical}></View>
            <Text style={[styles.txtB, { flex: 1, color: props.btnColor ? props.btnColor : Color.TXT_LIGHT_GREY }]}
              onPress={props.processModal}>{strings.yes}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const ModalWebView = (props) => {
  return (

    <Modal isVisible={props.isModalVisible} animationIn='zoomIn' animationOut='zoomOut'
      animationOutTiming={500} onBackButtonPress={props.dismissWebview} onBackdropPress={props.dismissWebview}>
      <View style={{ width: '100%', padding: 20, borderRadius: 10, backgroundColor: "white", position: 'absolute' }}>
        <WebView
          source={{ uri: props.url }}
          style={{ marginVertical: 10, height: Screen.SCREEN_HEIGHT * 0.3 }}
        />
        <View>
          <Button style={{ width: 100, justifyContent: 'center', borderRadius: 4, height: 40, marginTop: 10, alignSelf: 'center', backgroundColor: Color.PRIMARY }} onPress={props.dismissWebview}>
            <Text>CLOSE</Text>
          </Button>
        </View>

      </View>
    </Modal>

  )
}

const ModalPayment = (props) => {
  let selected = null;
  return (
    <Modal isVisible={props.isModalVisible} animationIn='slideInDown' animationOut='slideOutUp' animationOutTiming={500} style={{ margin: 0, backgroundColor: 'white' }} onBackButtonPress={props.isBack}>
      <View style={styles.FullScreenModal}>
        <View>
          <View >
            <View>
              <Image style={{ width: null, height: Screen.SCREEN_HEIGHT * 0.15 }} source={require('../assets/bgPurple.png')} />
              <Grid style={{ marginTop: -Screen.SCREEN_HEIGHT * 0.1, }}>
                <Col size={15} style={{ justifyContent: 'center' }}>
                  <TouchableWithoutFeedback onPress={props.isBack}>
                    <Icon type='MaterialIcons' name='chevron-left' style={{ fontSize: 50, color: 'white' }}></Icon>
                  </TouchableWithoutFeedback>
                </Col>
                <Col size={85} style={{ justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 14, fontFamily: Font.BOLD }}>Payment Method</Text>
                </Col>
              </Grid>
              {/* <Text style={{ marginTop: -Screen.SCREEN_HEIGHT * 0.1, fontSize: 20, justifyContent: '' }}> <Icon type='MaterialIcons' name='chevron-left' style={{ fontSize: 20, color: 'white' }}></Icon> Payment Method</Text> */}
              <View style={{
                paddingVertical: 30, backgroundColor: 'white',
                marginTop: Screen.SCREEN_HEIGHT * 0.045, borderTopLeftRadius: 30,
                borderTopRightRadius: 30, marginBottom: Screen.SCREEN_WIDTH * 0.3
              }}>
                <FlatList
                  data={props.dataList}
                  keyExtractor={(x, i) => i.toString()}
                  renderItem={({ item, index }) =>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#E8E8E8' }}>
                      <ListItem noBorder onPress={() => props.handleTempClick(item)}>
                        <Body>
                          <Text style={{ fontFamily: Font.BOLD, fontSize: 12, color: '#464141' }}>{item['name']}</Text>
                          <Text style={{ fontFamily: Font.LIGHT, fontSize: 10, color: 'black', marginVertical: 5 }}>Pay with {item['name']}</Text>
                          <View key={index} style={{ borderRadius: 10, borderWidth: 1, borderColor: '#C0C0C0', marginLeft: 10, width: 70, height: 35 }}>
                            <Image source={{ uri: item['image'] }} resizeMode='contain' style={{ width: 60, height: 30, alignSelf: 'center' }} />
                          </View>
                          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                        {item['imageList'].map((val, i) => {
                                                            return (
                                                                <View key={i} style={{ borderRadius: 10, borderWidth: 1, borderColor: '#C0C0C0', marginRight: 10 }}>
                                                                <Image source={val} resizeMode='stretch' style={{ width: 60, height: 25, marginLeft: 10 }} />
                                                                </View>
                                                            )
                                                        })}
                                                    </ScrollView> */}

                        </Body>
                        <Right>
                          {props.tempSelected != null ? props.tempSelected['id'] == item['id'] ? <Image source={require('../assets/big_check.png')} resizeMode='stretch' style={{ width: 20, height: 20 }} /> : null : null}
                        </Right>
                      </ListItem>
                    </View>
                  }
                />

              </View>

            </View>
          </View>

        </View>

      </View>
      <View style={{ backgroundColor: 'white' }}>
        <TouchableWithoutFeedback disabled={props.tempSelected == null} onPress={() => { selected = props.tempSelected; props.handleClick(selected) }}>
          <LinearGradient colors={props.tempSelected == null ? ['#c2c2c2', '#c2c2c2'] : ['#B8266E', '#66266C']} style={{ borderRadius: 25, paddingVertical: 17, width: '90%', marginBottom: 40, marginTop: 10, alignSelf: 'center' }}>
            <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 12, fontFamily: Font.BOLD, }}>SELECT THIS METHOD</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
        {/* <Button onPress={()=> {selected=props.tempSelected; props.handleClick(selected)}} rounded style={{marginBottom:40, marginTop:10, alignSelf:'center'}} ><Text>SELECT THIS METHOD</Text></Button> */}
      </View>
    </Modal>
  );
}

const ModalPsCodePayment = (props) => {

  const renderCopyClipboard = (data) => {
    const [buttonPsCode, setButtonPsCode] = useState('Copy ' + data.name);

    const copyClipboard = () => {
      setButtonPsCode('Copied')

      setTimeout(() => {
        setButtonPsCode('Copy ' + data.name)
      }, 3000)
      Clipboard.setString(data.value)
    }

    return (
      <TouchableWithoutFeedback onPress={copyClipboard}>
        <Text style={{ fontFamily: Font.BOLD, fontSize: 12, lineHeight: 14, color: '#A2286D', marginTop: 5 }}>{buttonPsCode.toUpperCase()}</Text>
      </TouchableWithoutFeedback>
    )
  }

  const renderDetailTransfer = (type) => {
    if (type === 0) {
      return (
        <View style={{ backgroundColor: '#F6F6F6', padding: 15, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, flexDirection: 'row' }}>
          <Grid style={{ flexDirection: 'row', alignContent: 'center' }}>
            <Col>
              <Text style={{ fontFamily: Font.MEDIUM, fontSize: 10, lineHeight: 11, color: 'rgba(0,0,0,0.5)' }}>PsCode</Text>
              <Text style={{ fontFamily: Font.BOLD, fontSize: 14, lineHeight: 14, color: '#202020', marginVertical: 10 }}>{props.data.psCode}</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end' }}>
              {renderCopyClipboard({
                name: 'PsCode',
                value: props.data.psCode
              })}
            </Col>
          </Grid>
        </View>
      )
    } else if (type === 1) {
      return (
        <View style={{ backgroundColor: '#F6F6F6', padding: 15, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
          <Text style={{ fontFamily: Font.MEDIUM, fontSize: 10, lineHeight: 11, color: 'rgba(0,0,0,0.5)' }}>Virtual Account</Text>
          <Text style={{ fontFamily: Font.BOLD, fontSize: 14, lineHeight: 16, color: '#202020', marginVertical: 10 }}>{props.data.billUnit.virtualAccount}</Text>
          {renderCopyClipboard({
            name: 'Virtual Account',
            value: props.data.billUnit.virtualAccount,
          })}
        </View>
      )
    }
  }

  const renderModalContent = () => {
    console.log('billunit: ' + JSON.stringify(props.data.billUnit))
    if (props.data.payment != null) {
      return (
        <View>
          <View>
            <Text style={{ color: '#A2286D', fontFamily: Font.MEDIUM, fontSize: 14, lineHeight: 16 }}>Total Payment</Text>
            <Text style={{ fontFamily: Font.BOLD, fontSize: 18, lineHeight: 21, marginTop: 5 }}>
              Rp. {helper.SeperatorNumber(props.data.type == 1 ? props.data.billUnit.billingOutstanding : props.data.total)},00</Text>
          </View>
          {/* <View>
            <Button style={{ backgroundColor: '#F8C82B', borderRadius: 10, justifyContent: 'center', width: 120, height: 30, alignSelf: 'flex-end' }}>
              <Text style={{ fontFamily: Font.MEDIUM, fontSize: 8, lineHeight: 9, color: 'white' }}>Waiting Payment</Text>
            </Button>
          </View> */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: Font.LIGHT, fontSize: 12, lineHeight: 14 }}>Please make payment to the following account :</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#ECECEC', marginBottom: 25 }}>
              <View style={{ padding: 15, flexDirection: 'row' }}>
                <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Col>
                    <Image source={{ uri: props.data.payment.image == undefined ? '' : props.data.payment.image }} resizeMode='contain' style={{ width: 100, height: 50 }} />
                  </Col>
                  {props.data.type == 1 ?
                    <Col style={{ alignItems: 'flex-end' }}>
                      <Text style={{ fontFamily: Font.LIGHT, fontSize: 12, lineHeight: 14, opacity: 0.5 }}>Selected Unit :</Text>
                      <Text style={{ fontFamily: Font.BOLD, fontSize: 14, lineHeight: 14, color: '#202020', marginTop: 5 }}>{props.data.billUnit.unitClusterDesc + ' ' + props.data.billUnit.unitNo}</Text>
                    </Col> : null}
                </Grid>
              </View>
              {renderDetailTransfer(props.data.type)}
            </View>
          </View>
        </View>
      )
    }
  }

  return (
    <Modal isVisible={props.isModalVisible} animationIn='slideInDown' animationOut='slideOutUp' animationOutTiming={500} style={{ margin: 0, backgroundColor: 'white' }} onBackButtonPress={props.isBack}>
      <View style={styles.FullScreenModal}>
        <View>
          <Image style={{ width: null, height: Screen.SCREEN_HEIGHT * 0.15 }} source={require('../assets/bgPurple.png')} />
          {/* <Grid style={{ marginTop: -Screen.SCREEN_HEIGHT * 0.1, }}>
            <Col size={85} style={{ justifyContent: 'center', paddingLeft: 20 }}>
              <Text style={{ color: 'white', fontSize: 14, fontFamily: Font.BOLD }}>Payment Status</Text>
            </Col>
            <Col size={15} style={{ justifyContent: 'center' }}>
              <TouchableWithoutFeedback onPress={props.isBack}>
                <Icon type='Ionicons' name='md-close' style={{ fontSize: 30, color: 'white' }} />
              </TouchableWithoutFeedback>
            </Col>
          </Grid> */}
          <View style={{ flexDirection: 'row', marginTop: -Screen.SCREEN_HEIGHT * 0.12 }}>
            <View style={{ flex: 8, paddingLeft: 10 }}>
              <Text style={{ color: 'white', fontSize: 14, fontFamily: Font.BOLD }}>Payment Status</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableWithoutFeedback onPress={props.isBack}>
                <Icon type='Ionicons' name='md-close' style={{ fontSize: 30, color: 'white' }} />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={{ paddingVertical: 30, backgroundColor: 'white', marginTop: Screen.SCREEN_HEIGHT * 0.045, borderTopLeftRadius: 30, borderTopRightRadius: 30, bottom: 0, padding: 20 }}>
            {renderModalContent()}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const ModalList = (props) => {
  return (
    <Modal isVisible={props.isModalVisible} animationOutTiming={500} style={{ margin: 0 }}>
      <View style={styles.FullScreenModal}>
        <View>
          {/* <Text style={styles.txtM}>{props.titleModal}</Text>
                    <View style={styles.lineHorizontal}></View> */}
          <View style={{
            // position: 'absolute',
            top: 0,
            justifyContent: 'center',
            width: Screen.SCREEN_WIDTH,
            marginLeft: 10,
            marginTop: 10,
            // height: Platform.OS == 'android' ? 56 : 64, backgroundColor: 'white'
            backgroundColor: 'white'
          }}>
            <TouchableWithoutFeedback onPress={props.closeModal}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  type='Ionicons' name="ios-arrow-back"
                  style={{ color: Color.TXT_GREY, alignItems: 'center' }}
                />
                <Text style={{ fontSize: 18, color: Color.TXT_GREY, marginLeft: 10, fontFamily: Font.LIGHT }}>{strings.back.toLowerCase()}</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={{ fontFamily: Font.BOLD, fontSize: 24, color: '#4A4A4A', marginTop: 8, marginBottom: 6 }}>{props.titleModal}</Text>
          </View>
          <FlatList
            data={props.dataList}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item }) =>
              <View style={{ borderBottomWidth: 0.5, marginHorizontal: 10, borderBottomColor: '#E8E8E8' }}>
                <TouchableWithoutFeedback onPress={() => props.handleClick(item)}>
                  <Text style={{ color: '#434343', fontFamily: Font.LIGHT, fontSize: 18, paddingVertical: 20 }}>{item[props.keyList]}</Text>
                </TouchableWithoutFeedback>
              </View>
            }
          />
        </View>
      </View>
    </Modal>
  );
}

const ModalDesc = (props) => {
  return (
    <Modal isVisible={props.isModalVisible} animationOutTiming={500}>
      <View style={styles.contentModal}>
        {/* <Text style={styles.txtM}>{props.titleModal}</Text>
                    <View style={styles.lineHorizontal}></View> */}
        <View style={{
          // position: 'absolute',
          top: 0,
          justifyContent: 'center',
          marginLeft: 10,
          marginTop: 10,
          // height: Platform.OS == 'android' ? 56 : 64, backgroundColor: 'white'
          backgroundColor: 'white'
        }}>
          <TouchableWithoutFeedback onPress={props.closeModal}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                type='Ionicons' name="ios-arrow-back"
                style={{ color: Color.TXT_GREY, alignItems: 'center' }}
              />
              <Text style={{ fontSize: 18, color: Color.TXT_GREY, marginLeft: 10, fontFamily: Font.LIGHT }}>{strings.back.toLowerCase()}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView>
          <View style={{ backgroundColor: 'white', height: Screen.SCREEN_WIDTH * 0.46, marginVertical: 20, borderRadius: 15 }}>
            <ImageBackground
              source={{ uri: props.image }}
              resizeMethod='resize'
              style={styles.imageBg}
              resizeMode='stretch'
              opacity={1}
              imageStyle={{ borderRadius: 10 }}
            >
              {/* <Image style={styles.imageAda} source={require('../assets/logo.png')} /> */}
              <View style={{ marginTop: Screen.SCREEN_WIDTH * 0.15, marginHorizontal: 10 }}>

                <Text numberOfLines={1} style={[styles.textWithShadow, { color: 'white', fontSize: 15 }]} >{props.name}</Text>

                <Text style={[styles.textWithShadow, { color: 'white', fontSize: 15 }]} >1823 - 1238 - 8432 - 2342</Text>
              </View>
            </ImageBackground>
          </View>
          <Text style={{ marginHorizontal: 20, marginBottom: 10, fontSize: 18, fontFamily: Font.BOLD }}>{props.level}</Text>
          <Text style={{ marginHorizontal: 20, marginBottom: 20, fontSize: 15, fontFamily: Font.LIGHT }}>{props.desc}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
}


const ModalUpdate = props => {
  return (
    <Modal isVisible={props.isModalVisible} animationOutTiming={500}>
      <View style={styles.contentModal}>
        <View>
          <Text style={styles.txtT}>{strings.updateTitle}</Text>
          <Text style={styles.txtM}>{props.titleModal}</Text>
          <View style={styles.lineHorizontal}></View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.txtM, { flex: 1 }]} onPress={props.closeModal}>{strings.later}</Text>
            <View style={styles.lineVertical}></View>
            <Text style={[styles.txtM, { flex: 1, color: props.btnColor ? props.btnColor : Color.TXT_LIGHT_GREY }]}
              onPress={props.processModal}>{strings.update}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const ModalConfirmOneBtn = props => {
  return (
    <Modal isVisible={props.isModalVisible} animationOutTiming={500}>
      <View style={styles.contentModal}>
        <View>
          <Text style={styles.txtM}>{props.titleModal}</Text>
          <View style={styles.lineHorizontal}></View>
          <Text style={styles.txtM} onPress={props.closeModal}>{props.txtButton}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentModal: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  FullScreenModal: {
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.1)",
    flex: 1,
  },
  txtT: {
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.TXT_LIGHT_GREY,
    fontFamily: Font.LIGHT
  },
  txtM: {
    padding: 15,
    fontSize: 14,
    textAlign: 'center',
    color: Color.TXT_LIGHT_GREY,
    fontFamily: Font.LIGHT
  },
  txtB: {
    padding: 15,
    fontSize: 14,
    textAlign: 'center',
    color: Color.TXT_BLUE,
    fontFamily: Font.LIGHT
  },
  lineHorizontal: {
    height: 1,
    marginTop: 5,
    backgroundColor: Color.LINE,
  },
  lineVertical: {
    width: 1,
    height: 'auto',
    backgroundColor: Color.LINE,
  },
  imageBg: {
    height: Screen.SCREEN_WIDTH * 0.46,
    width: null,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: "grey",
  },
  imageAda: {
    width: 71,
    height: 28,
    marginLeft: 10,
    marginVertical: 10
  },
  textWithShadow: {
    color: '#FFFFFF',
    textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  }
});

export { ModalConfirmation, ModalUpdate, ModalConfirmOneBtn, ModalList, ModalDesc, ModalPayment, ModalWebView, ModalPsCodePayment, ModalWebViewCustom }
