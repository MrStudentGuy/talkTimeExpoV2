import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Contacts = (props) => {
    return (
        <TouchableOpacity onPress={() => _Alert(props.text)}>
            <View style ={styles.item}>
                <Text style={styles.itemTxt}>{props.text}</Text>
            
                <View style ={styles.itemRight}>
                    <Text style = {styles.callTxt}>Call</Text>
                </View>
        
            </View>
        </TouchableOpacity>
    );
}

const _Alert = (props) => {
    return (
        Alert.alert(
            "Calling " + props.text,
            "Are you sure you want to call " + props.text + "?",

            [
                {
                    text: "Yes",    
                },
                {
                    text: "No",
                    style: "cancel"
                }
            ]
        )
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 45,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    itemTxt: {
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 80,

        maxWidth: 100,
    },

    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },

    callTxt: {
        color: '#2c2c2c'
    }
})

export default Contacts;