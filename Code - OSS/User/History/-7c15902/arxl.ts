import { StyleSheet } from 'react-native';
import { colors } from "@/src/styles/global";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.primaryWhite,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 16,
    },
    headerComponent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.primaryGreen,
    },
    containerData: {
        paddingTop: 16,
    },
    containerInputApp: {
        marginBottom: 16,
    },
    iconEdit: {
        alignSelf: 'flex-end',
        marginBottom: 16,
    },
    regularText: {
        fontSize: 16,
        color: colors.primaryGreen,
        marginBottom: 4,
    },
    boldText: {
        fontSize: 16,
        color: colors.primaryBlue,
        fontWeight: '600',
    },
});
