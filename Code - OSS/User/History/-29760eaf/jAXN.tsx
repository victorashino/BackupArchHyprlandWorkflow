import Container from "@/src/components/Container"
import CameraFotos from "@/src/components/cameraFotos"
import { StatusBar } from "react-native"

const FotosOnBoarding = () => {

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <CameraFotos />
        </Container>
    )
}

export default FotosOnBoarding