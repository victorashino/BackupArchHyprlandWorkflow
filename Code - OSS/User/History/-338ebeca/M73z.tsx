import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const formatCurrency = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const floatValue = parseFloat(numericValue) / 100;
    return floatValue.toFixed(2).replace('.', ',');
};

const CurrencyInput = ({ value, onChangeValue, ref }) => {
    const handleChange = (text) => {
        const formattedValue = formatCurrency(text);
        onChangeValue(formattedValue);
    };

    const clearAmount = () => {
        onChangeValue('0,00');
    };

    if (!value) {
        onChangeValue('0,00');
    }

    return (
        <View style={styles.currencyInputContainer}>
            <Text style={styles.currencyPrefix}>R$</Text>
            <TextInput
                style={styles.currencyInput}
                keyboardType="numeric"
                value={value}
                onChangeText={handleChange}
                ref={ref}
            />
            {parseFloat(value.replace(',', '.')) > 0 && (
                <TouchableOpacity onPress={clearAmount}>
                    <Image style={styles.clearButton} source={require("@/assets/home/deposito/x.png")} />
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
        marginTop: 2
    },
    currencyInput: {
        flex: 1,
        fontSize: 24,
        fontWeight: "500"
    },
    clearButton: {
        width: 16,
        height: 16,
        marginLeft: 8,
    }
});

export default CurrencyInput;
