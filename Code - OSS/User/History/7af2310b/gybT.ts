
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
        backgroundColor: "gray"
    },
    notifications: {
        marginEnd: 43,
        height: 20,
        width: 20,
        backgroundColor: "gray"
      },
});

export default styles;