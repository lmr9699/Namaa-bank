import { transactions } from "@/api/Auth";
import colors from "@/data/styling/color";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

const TransactionsPage = () => {
    const { data: transactionsData, isLoading } = useQuery({
        queryKey: ["transactions"],
        queryFn: transactions,
    });

    const transactionList = transactionsData?.data || [];

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    const renderTransaction = ({ item }: { item: any }) => (
        <View style={styles.transactionItem}>
            <View style={[styles.iconContainer, {
                backgroundColor: item.type === 'DEPOSIT' ? '#e8f5e9' : '#fde8e8'
            }]}>
                <Feather
                    name={item.type === 'DEPOSIT' ? "arrow-down-left" : "arrow-up-right"}
                    size={24}
                    color={item.type === 'DEPOSIT' ? "#2e7d32" : "#e74c3c"}
                />
            </View>
            <View style={styles.details}>
                <Text style={styles.type}>{item.type || "Transaction"}</Text>
                <Text style={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString()}
                </Text>
            </View>
            <Text style={[styles.amount, {
                color: item.type === 'DEPOSIT' ? '#2e7d32' : '#e74c3c'
            }]}>
                {item.type === 'DEPOSIT' ? '+' : '-'}${item.amount?.toFixed(2)}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>All Transactions</Text>
            {transactionList.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Feather name="inbox" size={60} color="#ccc" />
                    <Text style={styles.emptyText}>No transactions yet</Text>
                </View>
            ) : (
                <FlatList
                    data={transactionList}
                    keyExtractor={(item, index) => item._id || index.toString()}
                    renderItem={renderTransaction}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default TransactionsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 12,
    },
    details: {
        flex: 1,
        marginLeft: 15,
    },
    type: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textTransform: 'capitalize',
    },
    date: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 10,
    },
});