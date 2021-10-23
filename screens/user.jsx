import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';

const uScr = () => {
    const navigation = useNavigation()

    const so = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    var user = auth.currentUser;
    var email;

    if (user != null){
        email = user.email;
    }

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#ECEEF0'}}>
            <ScrollView
                style={styles.cont}
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            >
                <Image style={styles.uImg} source={require('../_Assets__/u.jpg')}
                />

                <Text style={styles.nText}>{email}</Text>

                <View>
                    <TouchableOpacity 
                        style={[styles.buttWrapper, styles.buttonOutline]}         
                        onPress={() => {
                            navigation.navigate("uEdit")
                        }}
                    >
                        <Text>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                <View  style={[styles.cont, styles.backButt]}>
                    <TouchableOpacity 
                        style={[styles.buttWrapper, styles.buttonOutline]}
                        onPress={() => {
                            navigation.navigate("Home")
                        }}
                    >
                        
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.SO}
                onPress={so}
            >
                <Text style={styles.soTxt}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    uImg: {
        height: 200,
        width: 200,
        borderRadius: 20
    },

    nText: {
        fontWeight: '500',
        fontSize: 18,
    },

    buttWrapper: {
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

    SO:{
        justifyContent: 'center',
        alignItems: 'center'
    },

    soTxt:{
        color: 'red'
    }
})

export default uScr