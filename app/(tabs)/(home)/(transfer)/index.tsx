import { getAllUsers, me } from "@/api/Auth";
import { sendAmount } from "@/api/transactions";
import colors from "@/data/styling/color";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const imageBaseUrl = "https://bank-app-be-eapi-btf5b.ondigitalocean.app";

const TransferPage = () => {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [amount, setAmount] = useState("");
    const queryClient = useQueryClient();

    const { data: currentUser } = useQuery({
        queryKey: ["user"],
        queryFn: me,
    });

    const { data: usersData, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: () => sendAmount(selectedUser.id, amount),
        onSuccess: (data) => {
            Alert.alert("Success", "Transfer completed!");
            setSelectedUser(null);
            setAmount("");
            queryClient.invalidateQueries({ queryKey: ["user"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: (error: any) => {
            Alert.alert("Error", error.response?.data?.message || "Transfer failed");
        },
    });

    const handleTransfer = () => {
        if (!selectedUser) {
            Alert.alert("Error", "Please select a user");
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert("Error", "Please enter a valid amount");
            return;
        }
        if (parseFloat(amount) > (currentUser?.data?.balance || 0)) {
            Alert.alert("Error", "Insufficient balance");
            return;
        }
        Alert.alert(
            "Confirm Transfer",
            `Send $${amount} to ${selectedUser.username}?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Confirm", onPress: () => mutate() },
            ]
        );
    };

    const users = usersData?.data?.filter(
        (u: any) => u.id !== currentUser?.data?.id
    ) || [];

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Balance Card */}
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Your Balance</Text>
                <Text style={styles.balanceAmount}>
                    ${currentUser?.data?.balance?.toFixed(2) || "0.00"}
                </Text>
            </View>

            {/* Amount Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            {/* Selected User */}
            {selectedUser && (
                <View style={styles.selectedUserCard}>
                    <Text style={styles.label}>Sending to:</Text>
                    <View style={styles.selectedUser}>
                        <Image
                            source={{ uri: `${imageBaseUrl}/${selectedUser.imagePath}` }}
                            style={styles.selectedUserImage}
                        />
                        <Text style={styles.selectedUserName}>{selectedUser.username}</Text>
                        <TouchableOpacity onPress={() => setSelectedUser(null)}>
                            <Feather name="x" size={24} color="#e74c3c" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Users List */}
            <Text style={styles.label}>Select Recipient</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.userItem,
                            selectedUser?.id === item.id && styles.userItemSelected,
                        ]}
                        onPress={() => setSelectedUser(item)}
                    >
                        <Image
                            source={{ uri: `${imageBaseUrl}/${item.imagePath}` }}
                            style={styles.userImage}
                        />
                        <Text style={styles.userName}>{item.username}</Text>
                        {selectedUser?.id === item.id && (
                            <Feather name="check-circle" size={24} color={colors.primary} />
                        )}
                    </TouchableOpacity>
                )}
                style={styles.usersList}
            />

            {/* Transfer Button */}
            <TouchableOpacity
                style={[styles.transferButton, isPending && styles.buttonDisabled]}
                onPress={handleTransfer}
                disabled={isPending}
            >
                {isPending ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.transferButtonText}>Transfer</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default TransferPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    balanceCard: {
        backgroundColor: colors.primary,
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
    },
    balanceLabel: {
        color: "#ccc",
        fontSize: 14,
    },
    balanceAmount: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    selectedUserCard: {
        backgroundColor: "#e8f5e9",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    selectedUser: {
        flexDirection: "row",
        alignItems: "center",
    },
    selectedUserImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    selectedUserName: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "600",
    },
    usersList: {
        flex: 1,
    },
    userItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    userItemSelected: {
        borderWidth: 2,
        borderColor: colors.primary,
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 22,
    },
    userName: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: "500",
    },
    transferButton: {
        backgroundColor: colors.primary,
        padding: 18,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    transferButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});