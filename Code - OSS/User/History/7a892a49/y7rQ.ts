import { StyleSheet } from 'react-native';
import { colors } from '@/src/styles/global';

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    line: {
        height: 2,
        alignSelf: "center",
        backgroundColor: colors.gray,
        width: 250
    }
})

export default style