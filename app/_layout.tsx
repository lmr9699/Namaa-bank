import AuthContext from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

export default function RootLayout() {
    const [isAuthinticated, setIsAuthinticated] = useState(false);

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={{ isAuthinticated, setIsAuthinticated }}>
                <Stack screenOptions={{ headerShown: false }} />
            </AuthContext.Provider>
        </QueryClientProvider>
    );
}