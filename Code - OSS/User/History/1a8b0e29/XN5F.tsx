import { Button, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useRouter } from "expo-router";


const PixAreaPage = () => {

  const router = useRouter();

  const handlePress = () => {
      router.replace('/(home)/homePage');
  }

  return (
    <View
    style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>
            Pagina de pix
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text>
            Back
          </Text>
        </TouchableOpacity>
    </View>    
  );
}

export default PixAreaPage;