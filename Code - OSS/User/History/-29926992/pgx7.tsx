import Back from "@/components/Back"
import { Container } from "@/components/Container"
import { Image, Text, View } from "react-native"

const ExtratoHome = () => {
    
    const data = [
        { 
            id: "2a21367fba8745acb5f1d46dcdb6c73a", 
            method: "pix", 
            name: "FILIPE SOARES", 
            send: 0, 
            amount: -500, 
            created: "2024-06-18 21:12:33" 
        },
        { 
            id: "2a21367fba8745acb5f1d46dcdb6c73a", 
            method: "pix", 
            name: "FILIPE SOARES", 
            send: 1, 
            amount: -500, 
            created: "2024-06-18 21:12:33" 
        },
        { 
            id: "2a21367fba8745acb5f1d46dcdb6c73a", 
            method: "pix", 
            name: "FILIPE SOARES", 
            send: 1, 
            amount: -500, 
            created: "2024-06-18 21:12:33" 
        },
        { 
            id: "2a21367fba8745acb5f1d46dcdb6c73a", 
            method: "pix", 
            name: "FILIPE SOARES", 
            send: 0, 
            amount: -500, 
            created: "2024-06-18 21:12:33" 
        },
        { 
            id: "2a21367fba8745acb5f1d46dcdb6c73a", 
            method: "pix", 
            name: "FILIPE SOARES", 
            send: 0, 
            amount: -500, 
            created: "2024-06-18 21:12:33" 
        },
        { 
            id: "2a21367fba8745acb5f1d46dcdb6c73a", 
            method: "pix", 
            name: "FILIPE SOARES", 
            send: 1, 
            amount: -500, 
            created: "2024-06-18 21:12:33" 
        },
        { 
            id: "2a21367fba8745acb5f1d46dcdb6c73a", 
            method: "pix", 
            name: "FILIPE SOARES", 
            send: 1, 
            amount: -500, 
            created: "2024-06-18 21:12:33" 
        }
    ]

    return (
        <Container className="gap-4">
            <Back title="Extrato" />
            <View className="bg-background w-full flex-1 px-3 gap-3 py-4 rounded-lg">
                {/* <Image source={require("@/assets/home/extrato/calendario.png")} /> */}
                {
                    data.map((item) => {
                        return (
                            <Text>{item.name}</Text>
                        )
                    })
                }
            </View>
        </Container>
    )
}

export default ExtratoHome