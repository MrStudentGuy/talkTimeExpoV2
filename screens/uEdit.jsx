import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import { storage } from '../firebase';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

const uEdit = () => {
    const navigation = useNavigation()
        return(
            <ScrollView>
                <KeyboardAvoidingView>
                    <SafeAreaView>
                        <View style={styles.cont}>
                            <Image style={styles.uImg} source={require('../_Assets__/u.jpg')}
                            />
                            <TextInput
                                style = {styles.Inp}
                                placeholder="Name"
                                placeholderTextColor="#666666"
                                autocorrect={false}
                                // value={userData ? userData.name : ''}
                                // onChangeText={(txt) => setUserData({...userData, name : ''})}
                            />
                            <TextInput
                                style = {styles.Inp}
                                placeholder="Username (No real names please)"
                                placeholderTextColor="#666666"
                                autocorrect={false}
                                // value={userData ? userData.name : ''}
                                // onChangeText={(txt) => setUserData({...userData, name : ''})}
                            />
                            <TextInput
                                style = {styles.Inp}
                                placeholder="City"
                                placeholderTextColor="#666666"
                                autocorrect={false}
                                // value={userData ? userData.name : ''}
                                // onChangeText={(txt) => setUserData({...userData, name : ''})}
                            />
                            <TextInput
                                style = {styles.Inp}
                                placeholder="Country"
                                placeholderTextColor="#666666"
                                autocorrect={false}
                                // value={userData ? userData.name : ''}
                                // onChangeText={(txt) => setUserData({...userData, name : ''})}
                            />
                        </View>

                        <View  style={[styles.cont, styles.backButt]}>
                            <TouchableOpacity 
                                style={[styles.buttWrapper, styles.buttonOutline]}
                                onPress={() => {
                                    
                                    // navigation.navigate("uScr")
                                }}
                            >
                                <Text>Update</Text>
                            </TouchableOpacity>
                        </View>

                        <View  style={[styles.cont, styles.backButt]}>
                            <TouchableOpacity 
                                style={[styles.buttWrapper, styles.buttonOutline]}
                                onPress={() => {
                                    navigation.navigate("uScr")
                                }}
                            >
                                <Text>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </ScrollView>
        )
}

const styles = StyleSheet.create({
    cont: {  
        justifyContent: 'center',
        alignItems: 'center'
    },

    Inp: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10
    },

    uImg: {
        height: 200,
        width: 200,
        borderRadius: 20
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

    backButt: {
        marginTop: 15
    }
})

export default uEdit