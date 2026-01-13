import { me } from "@/api/Auth";
import { withdrawAmount } from "@/api/transactions";
import colors from "@/data/styling/color";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const WithdrawPage = () => {
    const [amount, setAmount] = useState("");
    const queryClient = useQueryClient();

    const { data: currentUser, isLoading: userLoading } = useQuery({
        queryKey: ["user"],
        queryFn: me,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: () => withdrawAmount({ amount: parseFloat(amount) }),
        onSuccess: () => {
            Alert.alert("Success", "Withdrawal completed!", [
                { text: "OK", onPress: () => router.back() }
            ]);
            setAmount("");
            queryClient.invalidateQueries({ queryKey: ["user"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: (error: any) => {
            Alert.alert("Error", error.response?.data?.message || "Withdrawal failed");
        },
    });

    const handleWithdraw = () => {
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert("Error", "Please enter a valid amount");
            return;
        }
        if (parseFloat(amount) > (currentUser?.data?.balance || 0)) {
            Alert.alert("Error", "Insufficient balance");
            return;
        }
        Alert.alert(
            "Confirm Withdrawal",
            `Withdraw $${amount} from your account?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Confirm", onPress: () => mutate() },
            ]
        );
    };

    const quickAmounts = [50, 100, 200, 500];

    if (userLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {/* Balance Card */}
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <Text style={styles.balanceAmount}>
                    ${currentUser?.data?.balance?.toFixed(2) || "0.00"}
                </Text>
            </View>

            {/* Amount Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Withdrawal Amount</Text>
                <View style={styles.inputWrapper}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                        placeholderTextColor="#999"
                    />
                </View>
            </View>

            {/* Quick Amount Buttons */}
            <View style={styles.quickAmountsContainer}>
                <Text style={styles.label}>Quick Select</Text>
                <View style={styles.quickAmounts}>
                    {quickAmounts.map((quickAmount) => (
                        <TouchableOpacity
                            key={quickAmount}
                            style={[
                                styles.quickAmountButton,
                                amount === String(quickAmount) && styles.quickAmountSelected
                            ]}
                            onPress={() => setAmount(String(quickAmount))}
                        >
                            <Text style={[
                                styles.quickAmountText,
                                amount === String(quickAmount) && styles.quickAmountTextSelected
                            ]}>
                                ${quickAmount}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Info Box */}
            <View style={styles.infoBox}>
                <Feather name="info" size={20} color={colors.primary} />
                <Text style={styles.infoText}>
                    Withdrawals are processed instantly to your linked account.
                </Text>
            </View>

            {/* Withdraw Button */}
            <TouchableOpacity
                style={[styles.withdrawButton, isPending && styles.buttonDisabled]}
                onPress={handleWithdraw}
                disabled={isPending}
            >
                {isPending ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        <Feather name="download" size={20} color="#fff" style={styles.buttonIcon} />
                        <Text style={styles.withdrawButtonText}>Withdraw</Text>
                    </>
                )}
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default WithdrawPage;

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
        padding: 25,
        borderRadius: 15,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    balanceLabel: {
        color: "#ccc",
        fontSize: 14,
    },
    balanceAmount: {
        color: "#fff",
        fontSize: 36,
        fontWeight: "bold",
        marginTop: 5,
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
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 15,
    },
    currencySymbol: {
        fontSize: 24,
        fontWeight: "600",
        color: "#333",
    },
    input: {
        flex: 1,
        padding: 15,
        fontSize: 24,
        fontWeight: "600",
        color: "#333",
    },
    quickAmountsContainer: {
        marginBottom: 20,
    },
    quickAmounts: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    quickAmountButton: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    quickAmountSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    quickAmountText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    quickAmountTextSelected: {
        color: "#fff",
    },
    infoBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e8f5e9",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        color: "#333",
        fontSize: 14,
    },
    withdrawButton: {
        backgroundColor: colors.primary,
        padding: 18,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "auto",
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonIcon: {
        marginRight: 8,
    },
    withdrawButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});