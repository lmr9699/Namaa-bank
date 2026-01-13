import { me, transactions } from "@/api/Auth";
import colors from "@/data/styling/color";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const HomePage = () => {
    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ["user"],
        queryFn: me,
    });

    const { data: transactionsData, isLoading } = useQuery({
        queryKey: ["transactions"],
        queryFn: transactions,
    });

    if (isLoading || userLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.white} />
            </View>
        );
    }
    const userData = user?.data;
    const transactionList = transactionsData?.data || [];

    // const renderTransaction = ({ item }: { item: any }) => (
    //     <View style={styles.transactionItem}>
    //         <View style={[styles.iconContainer, {
    //             backgroundColor: item.type === 'DEPOSIT' ? '#e8f5e9' : '#fde8e8'
    //         }]}>
    //             <Feather
    //                 name={item.type === 'DEPOSIT' ? "arrow-down-left" : "arrow-up-right"}
    //                 size={24}
    //                 color={item.type === 'DEPOSIT' ? "#2e7d32" : "#e74c3c"}
    //             />
    //         </View>
    //         <View style={styles.details}>
    //             <Text style={styles.type}>{item.type || "Transaction"}</Text>
    //             <Text style={styles.date}>
    //                 {new Date(item.createdAt).toLocaleDateString()}
    //             </Text>
    //         </View>
    //         <Text style={[styles.amount, {
    //             color: item.type === 'DEPOSIT' ? '#2e7d32' : '#e74c3c'
    //         }]}>
    //             {item.type === 'DEPOSIT' ? '+' : '-'}${item.amount?.toFixed(2)}
    //         </Text>
    //     </View>
    // );
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Welcome Section */}
                <View style={styles.welcomeSection} >

                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.userName}>{userData?.username || "User"}</Text>
                </View>

                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <Text style={styles.balanceAmount}>{userData?.balance}</Text>
                    <View style={styles.cardDetails}>
                        <Text style={styles.cardNumber}>**** **** **** 4582</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.actionButton}
                        //onPress handle transaction page
                        onPress={() => {
                            router.push("/(tabs)/(home)/(transfer)")
                        }}
                    >
                        <View style={styles.actionIcon}>
                            <Feather name="send" size={24} color={colors.primary} />
                        </View>
                        <Text style={styles.actionText}>Transfer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}
                        onPress={() => { router.push("/(tabs)/(withdraw)") }}
                    >
                        <View style={styles.actionIcon}>
                            <Feather name="download" size={24} color={colors.primary} />
                        </View>
                        <Text style={styles.actionText}>Withdraw</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <MaterialCommunityIcons name="qrcode-scan" size={24} color={colors.primary} />
                        </View>
                        <Text style={styles.actionText}>Deposit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Feather name="more-horizontal" size={24} color={colors.primary} />
                        </View>
                        <Text style={styles.actionText}>More</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Transactions */}
                <View style={styles.transactionsSection}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>

                    {transactionList?.length === 0 ? (
                        <Text style={styles.noTransactions}>No transactions yet</Text>
                    ) : (
                        transactionList?.slice(0, 5).map((item: any, index: number) => (
                            <View key={index} style={styles.transactionItem}>
                                <View style={styles.transactionIcon}>
                                    <Feather name="arrow-up-right" size={20} color="#e74c3c" />
                                </View>
                                <View style={styles.transactionDetails}>
                                    <Text style={styles.transactionTitle}>{item.title}</Text>
                                    <Text style={styles.transactionDate}>Today</Text>
                                </View>
                                <Text style={styles.transactionAmount}>-$50.00</Text>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeSection: {
        padding: 20,
        paddingTop: 10,
    },
    welcomeText: {
        color: "#ccc",
        fontSize: 16,
    },
    userName: {
        color: colors.white,
        fontSize: 24,
        fontWeight: "bold",
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        borderWidth: 2,
        borderColor: colors.white,
    },
    balanceCard: {
        backgroundColor: "#1a5c3a",
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    balanceLabel: {
        color: "#aaa",
        fontSize: 14,
    },
    balanceAmount: {
        color: colors.white,
        fontSize: 36,
        fontWeight: "bold",
        marginTop: 5,
    },
    cardDetails: {
        marginTop: 20,
    },
    cardNumber: {
        color: "#ccc",
        fontSize: 16,
        letterSpacing: 2,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 30,
        paddingHorizontal: 10,
    },
    actionButton: {
        alignItems: "center",
    },
    actionIcon: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 50,
        marginBottom: 8,
    },
    actionText: {
        color: colors.white,
        fontSize: 12,
    },
    transactionsSection: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        minHeight: 300,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    noTransactions: {
        color: "#999",
        textAlign: "center",
        marginTop: 20,
    },
    transactionItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    transactionIcon: {
        backgroundColor: "#fde8e8",
        padding: 10,
        borderRadius: 10,
    },
    transactionDetails: {
        flex: 1,
        marginLeft: 15,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    transactionDate: {
        fontSize: 12,
        color: "#999",
        marginTop: 2,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#e74c3c",
    },
});