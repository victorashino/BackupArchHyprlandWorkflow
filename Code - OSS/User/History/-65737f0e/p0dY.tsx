import { FontAwesome6 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, Platform } from "react-native";
import { colors } from "./../../styles/global";
import { router } from "expo-router";
import globalFonts from "@/src/styles/fonts";
import { style } from "./style";

interface IHeaderProps {
  title: string;
  backHomePage: boolean;
  NameIcon?: string;
  clickIcon?: () => void;
  onBackPress?: () => void;
}
const HeaderAreaHome = ({
  title,
  backHomePage,
  NameIcon,
  clickIcon,
  onBackPress,
}: IHeaderProps) => {
  const handleBack = () => {
    if (backHomePage) {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(home)/homePage");
      }
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(home)/homePage");
      }
    }
  };



  return (
    <View
      style={Platform.OS === "android" ? style.container : style.containerIos}
    >
      <TouchableOpacity
        style={
          Platform.OS === "android" ? style.buttonClose : style.buttonCloseIos
        }
        onPress={() => {
          console.log("Back button pressed");
          if (onBackPress) {
            onBackPress()
            handleBack()
          }
        }}
      >
        {backHomePage ? (
          <FontAwesome6 name="x" size={20} color={colors.disableBtn} />
        ) : (
          <FontAwesome6
            name="chevron-left"
            size={20}
            color={colors.disableBtn}
          />
        )}
      </TouchableOpacity>
      <Text style={[globalFonts.semiBold24, { height: 35 }]}>{title}</Text>
      {NameIcon?.length !== 0 && (
        <TouchableOpacity
          onPress={clickIcon}
          style={{ position: "absolute", right: 0 }}
        >
          <FontAwesome6 name={NameIcon} size={20} color={colors.disableBtn} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderAreaHome;
