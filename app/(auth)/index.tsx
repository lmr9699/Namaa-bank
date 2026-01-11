import { login } from '@/api/Auth';
import { setToken } from '@/api/storage';
import AuthContext from '@/context/AuthContext';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useContext } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Index() {
  const [form, setForm] = React.useState({
    username: '',
    password: '',
  });
  const { setIsAuthinticated } = useContext(AuthContext);

  const { mutate } = useMutation({
    mutationKey: ["sign in"],
    mutationFn: () => login({ username: form.username, password: form.password }),
    onSuccess: async (data) => {
      console.log("success:", data)
      await setToken(data.data.token)
      router.push("/(tabs)/(home)/home");
      setIsAuthinticated(true)
    },
    onError: (error) => {
      console.log("Login error:", error)
      Alert.alert('Error', 'Login failed. Please check your credentials.')
    },
  });

  const handleSingIn = () => {

    // router.push("/(tabs)/(home)/home");
    // return;

    if (!form.username || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    mutate()
  }



  return (

    <SafeAreaView style={{ flex: 1 }} >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerIcon}>

              <Fontisto name="money-symbol" size={60} color="black" />
            </View>
            <Text style={styles.title} > Namaa </Text>
            <Text style={styles.subtitle} > Login to your acount </Text>
          </View>

          <View style={styles.form} >
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              value={form.username}
              onChangeText={username => setForm({ ...form, username })}
              style={styles.inputControl}
              placeholder='Enter Username'
            />

            <TextInput
              secureTextEntry
              value={form.password}
              onChangeText={password => setForm({ ...form, password })}
              style={styles.inputControl}
              placeholder='Password'
              keyboardType='default'
            />


          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={() => {
              handleSingIn()
              console.log(handleSingIn)
            }} >
              <Text style={styles.btn}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              //handle inPress register
              router.push("/(auth)/register")
            }} >
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center"
    padding: 24,
  },
  header: {
    // marginVertical: 36,
    // backgroundColor: "red"
    // textAlign: "center"

  },
  headerIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    marginHorizontal: 15,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 24,
    textAlign: "center"
  },
  form: {
    flex: 1,
    marginBottom: 24,
    // alignItems: 'center',

  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    width: 110,
    lineHeight: 44,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: '500',
    color: '#c0c0c0',
    paddingHorizontal: 10,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 20
  },
  formAction: {
    marginVertical: 24,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 10,
    lineHeight: 26,
    fontWeight: '600',

  },


})