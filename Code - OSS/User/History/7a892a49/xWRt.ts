import { StyleSheet } from 'react-native';
import { colors } from '@/src/styles/global';

const style = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    line: {
        height: 2,
        color: colors.gray,
        width: 200
    }
})

export default style