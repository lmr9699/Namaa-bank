import colors from "@/data/styling/color";
import { Stack } from "expo-router";

export default function WithdrawLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
        }}>
            <Stack.Screen name="index" options={{ title: "Withdraw" }} />
        </Stack>
    );
}