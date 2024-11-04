import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import JsBarcode from 'jsbarcode';

// Função para gerar código de barras em base64
const generateBarcode = (code: string) => {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, code, { format: "CODE128" });
  return canvas.toDataURL("image/png");
};

// Estilos do PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  barcode: {
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 60,
    marginTop: 10,
  }
});

// Componente que gera o documento do PDF
const BoletoDocument = ({ boleto }: { boleto: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Boleto</Text>
        <Text style={styles.text}>Valor: R$ {boleto.valor}</Text>
        <Text style={styles.text}>Data: {boleto.data}</Text>
        <Text style={styles.text}>ID: {boleto.id}</Text>
        <Text style={styles.text}>Nome do Favorecido: {boleto.favorecido}</Text>
        <Text style={styles.text}>Vencimento: {boleto.vencimento}</Text>
        <Text style={styles.text}>Número do Código de Barras: {boleto.codigoBarras}</Text>
        <Image style={styles.image} src={generateBarcode(boleto.codigoBarras)} />
      </View>
    </Page>
  </Document>
);

// Componente principal para exportar o PDF
const ExportBoletoPDF = () => {
  const boletoData = {
    valor: "100,00",
    data: "2024-09-13",
    id: "123456789",
    favorecido: "João da Silva",
    vencimento: "2024-09-30",
    codigoBarras: "123456789012345678901234567890123456789012345"
  };

  return (
    <div>
      <PDFDownloadLink
        document={<BoletoDocument boleto={boletoData} />}
        fileName={`boleto-${boletoData.id}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Gerando PDF..." : "Baixar Boleto PDF"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default ExportBoletoPDF;
