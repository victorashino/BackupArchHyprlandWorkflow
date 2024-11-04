import { StyleSheet } from 'react-native';
import { colors } from '@/src/styles/global';

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 47,
        alignSelf: "center",
        justifyContent: "space-around"
    },
    line: {
        height: 2,
        alignSelf: "center",
        backgroundColor: colors.gray,
        marginStart: 7,
        width: 205
    }
})

export default style