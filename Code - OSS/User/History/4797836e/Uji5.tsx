import { View, TouchableOpacity, Image, StatusBar, useWindowDimensions } from "react-native";
import style from "./style";
import ContentLoader, { Circle, Rect } from "react-content-loader/native"
export default function LoadingScreen() {

    const { height, width } = useWindowDimensions()

    return (
        <View style={style.container} accessibilityRole="progressbar" accessibilityLabel="Loading content">
            <StatusBar backgroundColor="transparent" translucent />
            <ContentLoader
                style={{alignSelf: "center"}}
                viewBox={`0 0 ${width} ${height}`}
                backgroundColor="#DDD"
                foregroundColor="#999" >

                <Rect x={3} y={"1%"} rx={10} ry={10} width={"20%"} height={"5%"} />
                <Circle cx={"86%"} cy={26} r={22} />
                
                <Rect x={3} y={77} rx={24} ry={24} width={"94%"} height={"20%"} />

                <Rect x={7} y={510} rx={10} ry={10} width={"100%"} height={"5%"} />
                <Rect x={7} y={570} rx={10} ry={10} width={"90%"} height={"5%"} />
                <Rect x={7} y={630} rx={10} ry={10} width={"90%"} height={"5%"} />
                <Rect x={7} y={690} rx={10} ry={10} width={"90%"} height={"5%"} />

                <Rect x={3} y={"89%"} rx={25} ry={25} width={"94%"} height={"8%"} />

            </ContentLoader>
        </View>
    );
}
