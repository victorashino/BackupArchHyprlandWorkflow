import { SafeAreaView, ScrollView, View, Platform } from "react-native";
import { styles } from "./style";
import { ReactNode } from "react";
import HeaderAreaHome from "../HeaderAreaHome";


type ContainerProps = {
  children: ReactNode;
  titleHeader: string;
  backHomePage: boolean;
  NameIcon?: string;
  clickIcon?: () => void;
  onBackPress?: () => void;
};

const ContainerSession = ({
  children,
  titleHeader,
  backHomePage,
  NameIcon,
  clickIcon,
  onBackPress,
}: ContainerProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderAreaHome
        title={titleHeader}
        backHomePage={backHomePage}
        NameIcon={NameIcon}
        clickIcon={clickIcon}
        onBackPress={onBackPress}
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
