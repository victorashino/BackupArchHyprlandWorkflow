
import { colors } from '@/src/styles/global';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        paddingTop: 62,
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    logo: {
        width: 90,
        height: 35,
        marginStart: 32,
        backgroundColor: "gray",
        borderRadius: 5
    },
    notifications: {
        marginEnd: 43,
        height: 35,
        width: 35,
        backgroundColor: "gray",
        borderRadius: 5
    },
    cardBalance: {
        width: "90%",
        height: "60%",
        backgroundColor: "gray",
        borderRadius: 24,
        alignSelf: "center"
    },
});

export default styles;