import { getAllUsers, me } from "@/api/Auth";
import colors from "@/data/styling/color";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import {
    ActivityIndicator,
    Image,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";


type UserSection = {
    title: string,
    data: any[],
}

const imageBaseUrl = "https://bank-app-be-eapi-btf5b.ondigitalocean.app";

const UsersPage = () => {
    const sectionListRef = useRef<SectionList>(null);

    const { data: currentUser } = useQuery({
        queryKey: ["user"],
        queryFn: me,
    });

    const { data: usersData, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });

    const users = usersData?.data || [];


    const groupUsersByLetter = (usersList: any[]) => {
        const grouped: { [key: string]: any[] } = {};

        usersList.forEach((user) => {
            const firstLetter = user.username?.charAt(0).toUpperCase() || "#";
            if (!grouped[firstLetter]) {
                grouped[firstLetter] = [];
            }
            grouped[firstLetter].push(user);
        });

        return Object.keys(grouped)
            .sort()
            .map((letter) => ({
                title: letter,
                data: grouped[letter].sort((a, b) =>
                    a.username.localeCompare(b.username)
                ),
            }));
    };

    const sections = groupUsersByLetter(users);

    const availableLetters = sections.map((section) => section.title);

    const scrollToSection = (letter: string) => {
        const sectionIndex = sections.findIndex((section) => section.title === letter);
        if (sectionIndex !== -1 && sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                sectionIndex,
                itemIndex: 0,
                animated: true,
                viewOffset: 0,
            });
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    const renderUser = ({ item }: { item: any }) => {
        const isCurrentUser = item.id === currentUser?.data?.id;

        return (
            <View style={[styles.userCard, isCurrentUser && styles.currentUserCard]}>
                <Image
                    source={{ uri: `${imageBaseUrl}/${item.imagePath}` }}
                    style={styles.userImage}
                />
                <View style={styles.userInfo}>
                    <View style={styles.nameRow}>
                        <Text style={styles.userName}>{item.username}</Text>
                        {isCurrentUser && (
                            <View style={styles.youBadge}>
                                <Text style={styles.youBadgeText}>You</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.userBalance}>
                        Balance: ${item.balance?.toFixed(2) || "0.00"}
                    </Text>
                    <Text style={styles.userDate}>
                        Joined: {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
                </View>
            </View>
        );
    };



    const renderSectionHeader = ({ section }: any) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>All Users ({users.length})</Text>

            {users.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No Users Found</Text>
                </View>
            ) : (
                <View style={styles.contentContainer}>
                    <SectionList
                        ref={sectionListRef}
                        sections={sections}
                        style={{ flex: 1 }}
                        keyExtractor={(item) => item.id}
                        renderItem={renderUser}
                        renderSectionHeader={renderSectionHeader}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        stickySectionHeadersEnabled={true}
                        onScrollToIndexFailed={() => { }}
                        getItemLayout={(data, index) => ({
                            length: 96,
                            offset: 96 * index,
                            index,
                        })}
                    />

                    <View style={styles.alphabetSidebar}>
                        {availableLetters.map((letter) => (
                            <TouchableOpacity
                                key={letter}
                                onPress={() => scrollToSection(letter)}
                                style={styles.letterButton}
                            >
                                <Text style={styles.letterText}>{letter}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

export default UsersPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20,
        paddingRight: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    contentContainer: {
        flex: 1,
        flexDirection: "row",
    },
    listContent: {
        paddingBottom: 20,
        paddingRight: 10,
    },
    sectionHeader: {
        backgroundColor: "#f5f5f5",
        paddingVertical: 8,
        paddingHorizontal: 5,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
    },
    userCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
        marginBottom: 12,
        marginRight: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    currentUserCard: {
        borderWidth: 2,
        borderColor: colors.primary,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ddd",
    },
    userInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "center",
    },
    nameRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    youBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 8,
    },
    youBadgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    userBalance: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: "600",
        marginTop: 4,
    },
    userDate: {
        fontSize: 12,
        color: "#999",
        marginTop: 2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#999",
    },
    // Alphabet sidebar styles
    alphabetSidebar: {
        width: 25,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    letterButton: {
        paddingVertical: 3,
        paddingHorizontal: 5,
    },
    letterText: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.primary,
    },
});