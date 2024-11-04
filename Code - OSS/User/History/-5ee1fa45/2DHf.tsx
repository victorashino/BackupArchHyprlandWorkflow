import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ExtractItem } from "./ExtractItem";
import Row from "../Row";
import fonts from "@/src/styles/fonts";
import { FontAwesome6 } from "@expo/vector-icons";
import { style } from "./style";
import { colors } from "@/src/styles/global";
import globalFonts from "@/src/styles/fonts";
import { router } from "expo-router";

interface ReleasesProps {
  releases: [];
}

export default function LastReleases({ releases }: ReleasesProps) {
  return (
    <View style={style.container}>
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          justifyContent: "space-between",
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <Text style={fonts.regular14Gray}>Últimos lançamentos:</Text>
        <TouchableOpacity onPress={() => router.replace("/(home)/extract")}>
          <Row>
            <Text style={[fonts.regular14Gray, { marginEnd: "6%" }]}>
              Ver mais
            </Text>
            <FontAwesome6 name="chevron-right" size={16} color={colors.gray} />
          </Row>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: "50%" }}>
        {releases.length === 0 ? (
          <View style={{ marginTop: "10%" }}>
            <Text style={[globalFonts.regular14Gray, { textAlign: "center" }]}>
              Você não possui
            </Text>
            <Text style={[globalFonts.regular14Gray, { textAlign: "center" }]}>
              lançamentos...
            </Text>
          </View>
        ) : (
          releases.slice(0, 4).map((item, index) => (
            <View style={index === 0 ? { marginTop: 10 } : {}} key={index}>
              <ExtractItem extract={item} maxWidth={false} />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
