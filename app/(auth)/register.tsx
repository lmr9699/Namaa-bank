import { login, register } from "@/api/Auth";
import { setToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import colors from '@/data/styling/color';
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState<string>("");
    const { setIsAuthinticated } = useContext(AuthContext)

    const { mutate } = useMutation({
        mutationKey: ["register"],
        mutationFn: () => register({ username, password, image })
        ,
        onSuccess: async (data) => {
            console.log(data)
            const loginData = await login({ username, password })
            await setToken(loginData.data.token)
            router.push("/(tabs)/(home)/home");
            setIsAuthinticated(true)
        },
        onError: (err: any) => {
            console.log("Register error:", err.response?.data || err.message)
            Alert.alert('Error', err.response?.data?.message || 'Registration failed')
        }
    })

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleRegister = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in all fields')
            return
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters')
            return
        }
        console.log(username, password);
        mutate()
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.primary,
                    padding: 20,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View style={{ width: "100%", padding: 20 }}>
                    <Text
                        style={{
                            color: colors.white,
                            fontSize: 24,
                            fontWeight: "bold",
                            marginBottom: 10,
                        }}
                    >
                        Register
                    </Text>
                    <Text style={{ color: colors.white, fontSize: 16 }}>
                        Create your account
                    </Text>
                    <TextInput
                        style={{
                            backgroundColor: colors.white,
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 20,
                        }}
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholderTextColor={colors.black}
                    />

                    <TextInput
                        style={{
                            backgroundColor: colors.white,
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 20,
                        }}
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholderTextColor={colors.black}
                    />

                    <TextInput
                        style={{
                            backgroundColor: colors.white,
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 20,
                        }}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        placeholderTextColor={colors.black}
                    />

                    <TouchableOpacity onPress={pickImage} style={{ marginTop: 20 }}>
                        <Text style={{ color: colors.white, fontSize: 16 }}>
                            Upload Profile Image
                        </Text>
                        {image && (<Image
                            source={{ uri: image }}
                            style={{ width: 200, height: 200, margin: 10 }} />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.white,
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 20,
                            alignItems: "center",
                        }}
                        onPress={handleRegister}
                    >
                        <Text
                            style={{
                                color: colors.primary,
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { router.push("/(auth)") }} style={styles.touch}>
                        <Text style={{ color: colors.white, fontSize: 16 }}>
                            Already have an account?{" "}
                            <Text style={{ color: colors.white, fontWeight: "bold" }}>
                                Login
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Register;

const styles = StyleSheet.create({
    touch: {
        marginTop: 20,
        alignItems: "center"
    },
});
