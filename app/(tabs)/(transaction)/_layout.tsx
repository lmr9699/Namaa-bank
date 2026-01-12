import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const TransactionsLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="transactions" options={{
                title: "Users",
                headerStyle: { backgroundColor: 'green' },
                headerTitleStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
            }} />

        </Stack>
    )
}

export default TransactionsLayout

const styles = StyleSheet.create({})