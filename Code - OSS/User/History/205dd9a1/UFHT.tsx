import { Text, View } from "react-native";
import { styles } from "./style";
import InputApp from "@/src/components/InputApp";
import ButtonMenu from "@/src/components/ButtonMenu";
import { FontAwesome } from "@expo/vector-icons";
import { useContactList } from "../hooks/useContatctList";
import { useEffect } from "react";
import mockContacts from "@/src/components/ContactList/MockContact";
import ButtonApp from "@/src/components/ButtonApp";
import { useHomePix } from "../hooks/useHomePix";
import ContainerSession from "@/src/components/ContainerSession";
import ContactList from "@/src/components/ContactList";


interface ButtonMenuProps {
  name: string;
  iconName: keyof typeof FontAwesome.glyphMap;
  route?: any;
}

export const HomePixAreaPage = () => {
  const {
    keyPix,
    setKeyPix,
    handleContinuePix,
    keyErrorValidade,
    formattedKey,
  } = useHomePix();

  const { listContacts, handlerListContacts } = useContactList();

  useEffect(() => {
    handlerListContacts();
  }, []);

  const menuItens: ButtonMenuProps[] = [
    { name: "QR code", iconName: "qrcode", route: "/(home)/payments/QRCode" },
    {
      name: `PIX\ncopia e cola`,
      iconName: "barcode",
      route: "/(home)/payments/CopyPaste",
    },
    {
      name: "Gerenciar\n chaves",
      iconName: "key",
      route: "/(home)/pixArea/PixKeyManager",
    },
  ];

  return (
    <ContainerSession backHomePage={true} titleHeader="Área Pix">
      <Text style={styles.title}>
        Realize o envio de pagamentos em qualquer momento, 24 horas por dia,
        todos os dias da semana.
      </Text>
        <InputApp
          type="default"
          required={true}
          label={"Chave PIX"}
          value={formattedKey}
          setState={setKeyPix}
          error={keyErrorValidade}
        />
      <Text style={styles.subitleInput}>
        Celular, CPF/CNPJ e chave aleatória
      </Text>
      {keyPix && (
        <View style={styles.containerButton}>
          <ButtonApp
            color="blue"
            text="Prosseguir"
            submit={() => handleContinuePix()}
          />
        </View>
      )}
      <View style={styles.menuCotainer}>
        {menuItens.map((item, index) => (
          <ButtonMenu
            key={index}
            name={item.name}
            iconName={item.iconName}
            route={item.route}
            coming_soon={true}
          />
        ))}
      </View>
      {/* </View> */}
      <ContactList releases={listContacts} />
    </ContainerSession>
  );
};
