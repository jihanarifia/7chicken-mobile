import { StyleSheet, Dimensions } from 'react-native';
import { Screen, Font, Color } from '../../../api/localization';

export { styles };

const styles = StyleSheet.create({
    qrcode: {
        alignSelf: 'flex-end',
        width: 45,
        height: 45
    },
    point: {
        color: Color.BLACK,
        fontSize: 16,
        fontFamily: Font.MEDIUM,
        fontWeight: 'bold'
    }
});
