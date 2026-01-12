import colors from "@/data/styling/color";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

// Dummy data - replace with your API data
const dummyUser = {
    username: "John Doe",
    balance: 12450.00,
    imagePath: "",
    createdAt: "2024-01-15",
    id: "abc123",
};

const ProfilePage = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Profile Header */}
            <View style={styles.header}>
                <View style={styles.profileImageContainer}>
                    <View style={styles.profileImage}>
                        <Text style={styles.avatarText}>
                            {dummyUser.username.charAt(0)}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.editImageButton}>
                        <Feather name="camera" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.userName}>{dummyUser.username}</Text>
                <Text style={styles.userId}>ID: {dummyUser.id}</Text>
            </View>

            {/* Balance Card */}
            <View style={styles.balanceCard}>
                <View style={styles.balanceHeader}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <Feather name="eye" size={20} color="#fff" />
                </View>
                <Text style={styles.balanceAmount}>
                    ${dummyUser.balance.toFixed(2)}
                </Text>
                <Text style={styles.accountType}>Premium Account</Text>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>12</Text>
                    <Text style={styles.statLabel}>Transactions</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>5</Text>
                    <Text style={styles.statLabel}>Transfers</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>30</Text>
                    <Text style={styles.statLabel}>Days Active</Text>
                </View>
            </View>

            {/* Menu Options */}
            <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Account</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={[styles.menuIcon, { backgroundColor: '#e3f2fd' }]}>
                        <Feather name="user" size={20} color="#1976d2" />
                    </View>
                    <Text style={styles.menuText}>Edit Profile</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={[styles.menuIcon, { backgroundColor: '#fff3e0' }]}>
                        <Feather name="lock" size={20} color="#f57c00" />
                    </View>
                    <Text style={styles.menuText}>Change Password</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={[styles.menuIcon, { backgroundColor: '#e8f5e9' }]}>
                        <Feather name="bell" size={20} color="#388e3c" />
                    </View>
                    <Text style={styles.menuText}>Notifications</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={[styles.menuIcon, { backgroundColor: '#f3e5f5' }]}>
                        <MaterialIcons name="security" size={20} color="#7b1fa2" />
                    </View>
                    <Text style={styles.menuText}>Security</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>
            </View>

            {/* Support Section */}
            <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Support</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={[styles.menuIcon, { backgroundColor: '#e0f7fa' }]}>
                        <Feather name="help-circle" size={20} color="#00838f" />
                    </View>
                    <Text style={styles.menuText}>Help Center</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <View style={[styles.menuIcon, { backgroundColor: '#fce4ec' }]}>
                        <Feather name="message-circle" size={20} color="#c2185b" />
                    </View>
                    <Text style={styles.menuText}>Contact Us</Text>
                    <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton}>
                <Feather name="log-out" size={20} color="#e74c3c" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text style={styles.version}>Version 1.0.0</Text>
        </ScrollView>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        alignItems: "center",
        paddingVertical: 30,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileImageContainer: {
        position: "relative",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: "rgba(255,255,255,0.3)",
    },
    avatarText: {
        fontSize: 40,
        fontWeight: "bold",
        color: colors.primary,
    },
    editImageButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#333",
        padding: 8,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: colors.primary,
    },
    userName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 15,
    },
    userId: {
        fontSize: 14,
        color: "rgba(255,255,255,0.7)",
        marginTop: 5,
    },
    balanceCard: {
        backgroundColor: "#1a5c3a",
        margin: 20,
        padding: 20,
        borderRadius: 20,
        marginTop: -20,
    },
    balanceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    balanceLabel: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 14,
    },
    balanceAmount: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 5,
    },
    accountType: {
        color: "#4caf50",
        fontSize: 12,
        marginTop: 10,
        fontWeight: "600",
    },
    statsContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    statLabel: {
        fontSize: 12,
        color: "#999",
        marginTop: 5,
    },
    statDivider: {
        width: 1,
        backgroundColor: "#eee",
    },
    menuSection: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#999",
        marginBottom: 15,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    menuText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        color: "#333",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e74c3c",
        marginBottom: 20,
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#e74c3c",
        fontWeight: "600",
    },
    version: {
        textAlign: "center",
        color: "#999",
        fontSize: 12,
        marginBottom: 30,
    },
});