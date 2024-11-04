import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const formatCurrency = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const floatValue = parseFloat(numericValue) / 100;
    return floatValue.toFixed(2).replace('.', ',');
};

const CurrencyInput = ({ value, onChange }) => {
    const handleChange = (text) => {
        const formattedValue = formatCurrency(text);
        onChange(formattedValue);
    };

    return (
        <View style={styles.currencyInputContainer}>
            <Text style={styles.currencyPrefix}>R$</Text>
            <TextInput
                style={styles.currencyInput}
                keyboardType="numeric"
                value={value}
                onChangeText={handleChange}
            />
            {parseFloat(value.replace(',', '.')) > 0 && (
                <TouchableOpacity onPress={() => onChange('')}>
                    <Image source={require("@/assets/home/deposito/x.png")} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    currencyInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: "90%",
    },
    currencyPrefix: {
        fontSize: 16,
        marginRight: 8,
    },
    currencyInput: {
        flex: 1,
        fontSize: 24,
    },
    clearButton: {
        fontSize: 24,
        color: '#FF0000',
        marginLeft: 8,
    }
})

export default CurrencyInput;