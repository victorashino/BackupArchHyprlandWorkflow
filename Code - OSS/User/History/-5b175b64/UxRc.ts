import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        alignItems: 'center',
    },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 12,
        alignItems: 'center',
    },
    dropdownText: {
        fontSize: 16,
        color: '#000',
    },
    revealedText: {
        marginTop: 20,
        width: 335,
    },
});

export default styles;