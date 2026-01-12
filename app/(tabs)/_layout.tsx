import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from "expo-router";


export default function TabsLayout() {
    return <Tabs screenOptions={{ headerShown: false }} >
        <Tabs.Screen name="(home)" options={{
            title: "Home", tabBarIcon: () => {
                return (
                    <AntDesign name="home" size={24} color="black" />
                )
            }
        }} />
        <Tabs.Screen name="(transaction)" options={{
            title: "Transactions", tabBarIcon: () => {
                return (
                    <FontAwesome6 name="money-bill-transfer" size={24} color="black" />
                    // <Feather name="list" size={24} color="black" />
                )
            }
        }} />
        <Tabs.Screen name="(users)" options={{
            title: "Users", tabBarIcon: () => {
                return (
                    <FontAwesome6 name="users" size={24} color="black" />
                )
            }
        }} />
        <Tabs.Screen name="(profile)" options={{
            title: "Profile",
            tabBarIcon: () => {
                return (
                    <AntDesign name="profile" size={24} color="black" />
                )
            }
        }} />

    </Tabs>
}