import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { auth } from '../firebase';
import { fstore } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("uEdit") 
            }
        })

        return unsubscribe
    }, [])

    const _register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials;
            })
            .then(() => {
                fstore.collection('user').doc(auth.currentUser.uid)
                .set({
                    uName: "",
                    city: "",
                    country: "", 
                    email: email,
                    createdAt: fstore.Timestamp.fromDate(new Date()),
                    userImg: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
                })
            })
            .catch(error => alert(error.message))
    }

    const _login = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials;
            })
            .catch(error => alert(error.message))
    }

    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputCont}>
                <TextInput 
                    placeholder="Email Address"
                    value={ email }
                    onChangeText = { text => setEmail(text)}
                    style = {styles.input}
                />
                <TextInput 
                    placeholder="Password"
                    value={ password }
                    onChangeText = { text => setPassword(text) }
                    style = {styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.butCont}>
                <TouchableOpacity
                    onPress = {_login}
                    style = {[styles.button, styles.buttonOutline]} 
                >
                    <Text style={styles.buttonTxt}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {_register}
                    style = {[styles.button, styles.buttonOutline]}  
                >
                    <Text style={styles.buttonTxt }>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputCont: {
        width: '80%'      
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10
    },
    butCont: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: 'white',
        width: 200,
        borderRadius: 5,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#2c2c2c',
        borderWidth: 2
    },
    buttonTxt: {
        color: '#2c2c2c',
        fontWeight: '700'
    }   
})


export default Login;