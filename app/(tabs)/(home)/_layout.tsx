import { me } from "@/api/Auth";
import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import colors from "@/data/styling/color";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";


const imageBaseUrl = "https://bank-app-be-eapi-btf5b.ondigitalocean.app";

const HomePageLayout = () => {
    const { setIsAuthinticated } = useContext(AuthContext)
    const router = useRouter()
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: me,
    });
    const userData = user?.data;
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
                title: "Home", headerLeft: () => {
                    return (
                        <TouchableOpacity onPress={() => {
                            router.push("/(tabs)/(profile)/profile")
                        }}>
                            <Image
                                source={{ uri: `${imageBaseUrl}/${userData?.imagePath}` }}
                                style={style.profileImage}
                            />
                        </TouchableOpacity>
                    )
                },
                headerRight: () => {
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
        </Stack>
    );
};

export default HomePageLayout;



const style = StyleSheet.create({
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 17,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: colors.white,
    },
})
