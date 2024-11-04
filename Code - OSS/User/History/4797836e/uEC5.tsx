import { View, StatusBar, useWindowDimensions } from "react-native";
import style from "./style";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";

export default function LoadingScreen() {
    const { height, width } = useWindowDimensions();

    return (
        <View style={style.container} accessibilityRole="progressbar" accessibilityLabel="Loading content">
            <StatusBar backgroundColor="transparent" translucent />
            <ContentLoader
                style={{ alignSelf: "center" }}
                viewBox={`0 0 ${width} ${height}`}
                backgroundColor="#DDD"
                foregroundColor="#999"
            >
                <Rect x={width * 0.03} y={height * 0.05} rx={10} ry={10} width={width * 0.2} height={height * 0.05} />
                <Circle cx={width * 0.86} cy={height * 0.05} r={width * 0.06} />
                
                <Rect x={width * 0.03} y={height * 0.1} rx={24} ry={24} width={width * 0.94} height={height * 0.2} />

                <Rect x={width * 0.07} y={height * 0.6} rx={10} ry={10} width={width * 0.9} height={height * 0.05} />
                <Rect x={width * 0.07} y={height * 0.67} rx={10} ry={10} width={width * 0.9} height={height * 0.05} />
                <Rect x={width * 0.07} y={height * 0.74} rx={10} ry={10} width={width * 0.9} height={height * 0.05} />
                <Rect x={width * 0.07} y={height * 0.81} rx={10} ry={10} width={width * 0.9} height={height * 0.05} />

                <Rect x={width * 0.03} y={height * 0.89} rx={25} ry={25} width={width * 0.94} height={height * 0.08} />
            </ContentLoader>
        </View>
    );
}
