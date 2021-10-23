import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Contacts from '../comp/contacts';

import { auth } from '../firebase';

const Home = () => {
    const navigation = useNavigation()

    var user = auth.currentUser;
    var email;

    if (user != null){
        email = user.email;
    }

    return (
        <View style={styles.container}>
                <TouchableOpacity
                    onPress={() =>
                    {        
                        navigation.navigate("uScr") 
                    }}
                >
                    <View style = {styles.account}>
                        <Text>User Settings for {email}</Text>
                    </View>
                </TouchableOpacity>

            <ScrollView>
            <View style={styles.suggestions}>
                    <Text style={styles.secTitle}>Suggestions</Text>
                
                    <View style={styles.items}>
                        <Contacts text ={"Person 1"}/>
                        <Contacts text ={"Person 2"}/>
                        <Contacts text ={"Person 3"}/>
                        <Contacts text ={"Person 4"}/>
                        <Contacts text ={"Person 5"}/>
                        <Contacts text ={"Person 6"}/>
                        <Contacts text ={"Person 7"}/>
                        <Contacts text ={"Person 8"}/>
                        <Contacts text ={"Person 9 "}/>
                        <Contacts text ={"Person 10"}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#ECEEF0',
    },

    account: {
        marginTop: 40,
        marginBottom: 5,
        backgroundColor: 'white',
        width: '75%',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '12%'
    },

    suggestions: {
        paddingTop: 25,
    },

    secTitle: {
        fontWeight: "bold",   
        fontSize: 25,
        paddingBottom: 25,
        paddingLeft: 20,
    },

    items: {
        marginLeft: 10,
        margin: 10,
    }
})

export default Home