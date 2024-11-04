import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from "./style";
import fonts from "@/src/styles/fonts";
import { router } from "expo-router";
import { colors } from "@/src/styles/global";
import Line from "@/src/components/Line";
import { FontAwesome6 } from "@expo/vector-icons";

type Notification = {
    id: number;
    title: string;
    body: string;
    created: string;
};

type MockNotificationApi = {
    listNotification: () => Promise<{ data: Notification[] }>;
    deleteNotification: (id: number) => Promise<{ status: number }>;
};

const mockNotifications: Notification[] = [
    {
        id: 1,
        title: "Novo Depósito",
        body: "Você recebeu um depósito de R$100,00",
        created: "2024-09-12 14:00:00",
    },
    {
        id: 2,
        title: "Transferência Realizada",
        body: "Você fez uma transferência de R$50,00",
        created: "2024-09-11 10:30:00",
    },
    {
        id: 3,
        title: "Saldo Atualizado",
        body: "Seu saldo foi atualizado para R$200,00",
        created: "2024-09-10 09:00:00",
    },
    {
        id: 4,
        title: "Erro no Sistema",
        body: "Houve um erro no processamento. Verifique o sistema.",
        created: "2024-09-09 08:00:00",
    },
    {
        id: 5,
        title: "Novo Depósito",
        body: "Você recebeu um depósito de R$100,00",
        created: "2024-09-12 14:00:00",
    },
    {
        id: 6,
        title: "Transferência Realizada",
        body: "Você fez uma transferência de R$50,00",
        created: "2024-09-11 10:30:00",
    },
    {
        id: 7,
        title: "Saldo Atualizado",
        body: "Seu saldo foi atualizado para R$200,00",
        created: "2024-09-10 09:00:00",
    },
    {
        id: 8,
        title: "Erro no Sistema",
        body: "Houve um erro no processamento. Verifique o sistema.",
        created: "2024-09-09 08:00:00",
    },
    {
        id: 9,
        title: "Novo Depósito",
        body: "Você recebeu um depósito de R$100,00",
        created: "2024-09-12 14:00:00",
    },
    {
        id: 10,
        title: "Transferência Realizada",
        body: "Você fez uma transferência de R$50,00",
        created: "2024-09-11 10:30:00",
    },
];

const getTimeFromDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

const mockNotificationApi: MockNotificationApi = {
    listNotification: async () => {
        return new Promise((resolve) =>
            setTimeout(() => resolve({ data: mockNotifications }), 1000)
        );
    },
    deleteNotification: async (id: number) => {
        return new Promise((resolve) => setTimeout(() => resolve({ status: 200 }), 500));
    },
};

const getIconForTitle = (title: string) => {
    switch (title) {
        case "Novo Depósito":
            return <FontAwesome name="money" size={24} color={colors.primaryBlue} />;
        case "Transferência Realizada":
            return <FontAwesome name="exchange" size={24} color={colors.primaryBlue} />;
        case "Saldo Atualizado":
            return <FontAwesome name="line-chart" size={24} color={colors.primaryBlue} />;
        case "Erro no Sistema":
            return <FontAwesome name="exclamation-triangle" size={24} color="red" />;
        default:
            return <FontAwesome name="bell" size={24} color={colors.primaryBlue} />;
    }
};

const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
};

const groupNotificationsByDate = (notifications: Notification[]) => {
    const grouped: { [key: string]: Notification[] } = {};
    notifications.forEach((notification) => {
        const date = new Date(notification.created).toDateString();
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(notification);
    });
    return grouped;
};

const NotificationPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [notificationList, setNotificationList] = useState<Notification[]>([]);
    const [updateList, setUpdateList] = useState<boolean>(false);

    const handleNotification = async () => {
        setLoading(true);
        const res = await mockNotificationApi.listNotification();
        setLoading(false);
        setNotificationList(res.data);
    };

    const deleteNotification = async (id: number) => {
        const res = await mockNotificationApi.deleteNotification(id);
        if (res.status === 200) {
            setUpdateList(true);
        }
    };

    useEffect(() => {
        handleNotification();
        if (updateList) {
            setUpdateList(false);
        }
    }, [updateList]);

    const renderRightActions = (id: number) => (
        <TouchableOpacity
            style={{ backgroundColor: "red", paddingHorizontal: 16, justifyContent: "center", marginStart: 8}}
            onPress={() => deleteNotification(id)}
        >
            <Feather name="trash-2" size={24} color="white" />
        </TouchableOpacity>
    );

    const groupedNotifications = groupNotificationsByDate(notificationList);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.replace("/(home)/homePage")}
                    style={styles.closeIcon}
                >
                    <Feather name="x" size={20} color={colors.gray} />
                </TouchableOpacity>
                <Text style={[fonts.semiBold24]}>Notificações</Text>
            </View>
            {loading ? (
                <View style={styles.content}>
                    <ActivityIndicator size="large" color={colors.primaryBlue} />
                </View>
            ) : notificationList.length === 0 ? (
                <View style={styles.content}>
                    <FontAwesome6 name="envelope" size={207} color={colors.primaryBlue} />
                    <Text style={fonts.regular24}>Você ainda não tem</Text>
                    <Text style={fonts.regular24}>notificações.</Text>
                </View>
            ) : (
                <ScrollView>
                    {Object.keys(groupedNotifications).map((date) => (
                        <View key={date}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[fonts.semiBold14Gray, { padding: 16 }]}>
                                    {formatDate(date)}
                                </Text>
                                <Line width={260} />
                            </View>
                            {groupedNotifications[date].map((item) => (
                                <Swipeable
                                    key={item.id}
                                    renderRightActions={() => renderRightActions(item.id)}
                                >
                                    <View style={styles.notification}>
                                        <View style={{ marginEnd: 38, marginStart: 16}}>
                                            {getIconForTitle(item.title)}
                                        </View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                <Text style={fonts.semiBold14}>{item.title}</Text>
                                                <Text style={fonts.regular14Gray}>{`${getTimeFromDateTime(item.created)}h`}</Text>
                                            </View>
                                            <Text style={[fonts.regular14Gray, { maxWidth: 280 }]}>
                                                {item.body}
                                            </Text>
                                        </View>
                                    </View>
                                    <Line marginBottom={0} marginTop={0} />
                                </Swipeable>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            )}
        </GestureHandlerRootView>
    );
};

export default NotificationPage;
