import React from 'react'
import { View, Text, Spinner } from 'native-base';
import { Color, Screen } from '@api/localization';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { Font } from '../api/localization';
import { StyleSheet } from 'react-native';

const CustomButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} disabled={props.disabled || false} style={props.isShadow ? styles.button : null}>
            <View style={{
                backgroundColor: props.backgroundColor || '#50E3C2', borderRadius: 11,
                height: props.height || Screen.SCREEN_WIDTH * 0.135, alignItems: 'center', justifyContent: 'center',

            }}>
                {props.isLoading ? <Spinner color='white' /> :
                    <Text style={{
                        color: 'white', textAlign: 'center',
                        fontFamily: props.fontFamily || Font.MEDIUM,
                        fontSize: props.fontSize || 16
                    }}>
                        {props.textButton}
                    </Text>
                }
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 11,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 5, width: 5 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 11, // Android
    },
});
export { CustomButton }