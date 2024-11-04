import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar } from "react-native";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from "./style";
import fonts from "@/src/styles/fonts";
import { router } from "expo-router";
import { colors } from "@/src/styles/global";
import Line from "@/src/components/Line";
import { FontAwesome6 } from "@expo/vector-icons";
import NotificationApi from "@/src/services/NotificationApi";
import ContainerSession from "@/src/components/ContainerSession";

type Notification = {
    id: number;
    title: string;
    body: string;
    created: string;
};


const getTimeFromDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};


const getIconForTitle = (title: string) => {
    switch (title) {
        case "Recebimento de PIX":
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
        const res = await NotificationApi.listNotification();
        setLoading(false);
        if (res && res.data) {
            setNotificationList(res.data);
        }
    };

    const deleteNotification = async (id: number) => {
        const res = await NotificationApi.deleteNotification(id);
        if (res && res.status === 200) {
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
            style={styles.renderRightActions}
            onPress={() => deleteNotification(id)}
        >
            <Feather name="trash-2" size={24} color="white" />
        </TouchableOpacity>
    );

    const groupedNotifications = groupNotificationsByDate(notificationList);

    return (
        <ContainerSession backHomePage={false} titleHeader='Notificações' >
            <GestureHandlerRootView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                {loading ? (
                    <View style={styles.content}>
                        <ActivityIndicator size="large" color={colors.primaryBlue} />
                    </View>
                ) : notificationList.length === 0 ? (
                    <View style={styles.content}>
                        <FontAwesome6 name="envelope" size={207} color={"##7F828C33"} />
                        <Text style={fonts.regular24}>Você ainda não tem</Text>
                        <Text style={fonts.regular24}>notificações.</Text>
                    </View>
                ) : (
                    <ScrollView>
                        {Object.keys(groupedNotifications).map((date) => (
                            <View key={date}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[fonts.semiBold14Gray, styles.lineDate]}>
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
                                            <View style={styles.title}>
                                                {getIconForTitle(item.title)}
                                            </View>
                                            <View style={styles.notificationContentView}>
                                                <View style={styles.notificationContent}>
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
        </ContainerSession>
    );
};

export default NotificationPage;
