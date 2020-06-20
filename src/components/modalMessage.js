import React from 'react';
import { Text, View, Icon, Grid, Col } from 'native-base';
import { StyleSheet, Image, TouchableWithoutFeedback, Platform } from 'react-native';
import Modal from "react-native-modal";
import { strings, Color, Screen, Font } from '@api/localization';
import { CustomButton } from '@components/customButton';
import { PLAY_STORE, APPS_STORE } from '@api/constants';

const ModalBottom = props => {
    return (
        <Modal onBackdropPress={props.dismiss} style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={props.isModalVisible} animationOutTiming={500}>
            <View style={[styles.contentBottom, props.styleContent]}>
                <Text style={styles.txtBold}>{props.title}</Text>
                <View style={{ backgroundColor: Color.PRIMARY, width: 40, height: 3, marginTop: 15 }} />
                {props.renderContent}
            </View>
        </Modal>
    );
}

const OpenStore = () => {
    // const openBrowser = async () => {
    //     const url = Platform.OS === 'ios' ? APPS_STORE : PLAY_STORE;
    //     if (await InAppBrowser.isAvailable()) {
    //         await InAppBrowser.open(url);
    //     } else {
    //         Linking.openURL(url);
    //         console.log("openURL");
    //     }
    // }
    // openBrowser()
}

const ModalAlert = props => {
    return (
        <Modal onBackdropPress={props.dismiss} style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={props.isModalVisible} animationOutTiming={500}>
            <View style={[styles.contentBottom, props.styleContent]}>
                <Text style={styles.txtBold}>{props.title}</Text>
                <View style={{ backgroundColor: Color.PRIMARY, width: 40, height: 3, marginTop: 15 }} />
                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.txtRegular15, { color: '#515151' }]}>{props.txtAlert}</Text>
                    {!props.type ? <Grid style={{ marginTop: 30 }}>
                        <Col>
                            <Text onPress={props.handleOk}
                                style={[styles.txtRegular15, { color: Color.PRIMARY, textAlign: 'right' }]}>{props.txtBtn || strings.gotIt.toUpperCase()}</Text>
                        </Col>
                    </Grid> : null}
                </View>
            </View>
        </Modal>
    );
}

const ModalCenter = props => {
    return (
        <Modal isVisible={props.isModalVisible} animationOutTiming={500}>
            <View style={styles.contentModal}>
                {props.contentModal}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 0,
        padding: '7%'
    },
    contentModal: {
        backgroundColor: "white",
        borderRadius: 15,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    contentBottom: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: "white",
        bottom: 0,
        position: 'absolute'
    },
    textModal: {
        fontSize: 20,
        fontFamily: Font.LIGHT,
    },
    contentCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtBold: {
        fontFamily: Font.BOLD,
        fontSize: 18,
        color: 'black'
    },
});
export { ModalBottom, ModalAlert, ModalCenter }