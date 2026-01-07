import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {

  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })

  return (
<SafeAreaView style={{ flex: 1 }} >
     <ScrollView>
    <View style={styles.container}>
<View style={styles.header}>
      <Text style={styles.title} > Namaa </Text>
         <Text style={styles.subtitle} > Login to your acount </Text>
          <View style={styles.form} >
            <View style={styles.input} >
              <Text style={styles.inputLabel}>Email Address</Text>

              <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={form.email} 
              onChangeText={email => setForm({...form, email})}
              style={styles.inputControl}
               />
            </View>
            <View style={styles.input} >
               <Text style={styles.inputLabel}>Password</Text>
               <TextInput
              secureTextEntry
              value={form.password} 
              onChangeText={email => setForm({...form, email})}
              style={styles.inputControl}
               />
            </View>
               
            
            
          </View>
          
        </View>
    </View>
</ScrollView>
    </SafeAreaView>
  );
}


const styles= StyleSheet.create({
  container:{
    flex: 1,
        alignItems: "center",
    padding: 24,
  },
  header:{
    marginVertical: 36,
  },
  headerIcon:{
    width: 80,
    height: 80,
    marginBottom: 36,
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  title:{
    fontSize: 27,
    fontWeight: '700',
    marginHorizontal: 15,
  },
  subtitle:{
    fontSize: 15,
    fontWeight: '500',
  },
  form:{
    alignItems: 'center',
    
  },
  input:{
    marginBottom: 16,
  },
  inputLabel:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom:0,
    zIndex: 9,
    width: 110,
    lineHeight: 44,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: '500',
    color: '#c0c0c0'
  },
  inputControl:{
    height: 44,
    backgroundColor: '#fff',
    paddingLeft: 110,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },

})