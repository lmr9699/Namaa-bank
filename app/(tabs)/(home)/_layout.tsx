import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import colors from "@/data/styling/color";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";

const HomePageLayout = () => {
    const { setIsAuthinticated } = useContext(AuthContext)
    const router = useRouter()
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleStyle: {
                    color: colors.white,
                },
            }}
        >
            <Stack.Screen name="home" options={{
                title: "Home", headerRight: () => {
                    return (
                        <TouchableOpacity onPress={async () => {
                            await deleteToken()
                            setIsAuthinticated(false)
                            router.replace("/(auth)")
                        }}>
                            <SimpleLineIcons name="logout" size={24} color="white" />
                        </TouchableOpacity>
                    )
                }
            }} />
            <Stack.Screen name="[noteId]" options={{ title: "Note Details" }} />
        </Stack>
    );
};

export default HomePageLayout;
