import { SafeAreaView, ScrollView, View, Platform } from "react-native";
import { styles } from "./style";
import { ReactNode } from "react";
import HeaderAreaHome from "../HeaderAreaHome";
import { Href } from "expo-router";


type ContainerProps = {
  children: ReactNode;
  titleHeader: string;
  backHomePage: boolean;
  NameIcon?: string;
  clickIcon?: () => void;
  onBackPress?: () => void;
  secondOption?: Href<string | object>
};

const ContainerSession = ({
  children,
  titleHeader,
  backHomePage,
  NameIcon,
  clickIcon,
  onBackPress,
  secondOption
}: ContainerProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderAreaHome
        title={titleHeader}
        backHomePage={backHomePage}
        NameIcon={NameIcon}
        clickIcon={clickIcon}
        onBackPress={onBackPress}
        secondOption={secondOption}
      />
      <View
        style={
          Platform.OS === "android"
            ? styles.innerContainer
            : styles.containerIos
        }
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ContainerSession;
