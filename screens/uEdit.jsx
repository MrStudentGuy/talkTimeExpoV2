import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import { fstore } from '../firebase';
import { storage } from '../firebase';
import { auth } from '../firebase';  
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

const uEdit = () => {
    const navigation = useNavigation()
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [userData, setUserData] = useState(null);
    const user = auth.currentUser;

    const uploadPFP = async() => {
        const uploadURI = image;
        let fileName = uploadURI.substring(uploadURI.lastIndexOf('/')+1);

        setUploading(true);
        setTransferred(0);

        const task = storage.ref(filename).putFile(uploadURI); 

        task.on('state_changed', taskSnapshot => {
            console.log('${taskSnapshot.bytesTransferred} out of ${taskSnapshot.totalBytes}');

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
            );
        })

        try {
            await task;
            setUploading(false);
            Alert.alert("Image Saved!")
        } catch(e){
            console.log(e)
        }

        setImage(null);
    }

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setImage(result.uri);
        }
    };

    const getUser = async() => {
        await fstore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
            if( documentSnapshot.exists ) {
                setUserData(documentSnapshot.data())
            }
        })
    }

    useEffect(() => {
        getUser()
    }, [])

        return(
            <ScrollView>
                <KeyboardAvoidingView>
                    <SafeAreaView>
                        <View style={styles.cont}>
                            {image && <Image source={{ uri: image }} style={styles.uImg} />}
                            <TouchableOpacity 
                                style={styles.mBut}
                                onPress={pickImage}
                            >
                                <Text>Change Profile Picture</Text>
                            </TouchableOpacity>

                            <TextInput
                                style = {styles.Inp}
                                placeholder="Username (No real names please)"
                                placeholderTextColor="#666666"
                                autocorrect={false}
                                value={userData ? userData.uName : ''}
                                onChangeText= {(txt) => setUserData({...userData, uName: txt})}
                            />
                            <TextInput
                                style = {styles.Inp}
                                placeholder="City"
                                placeholderTextColor="#666666"
                                autocorrect={false}
                                value={userData ? userData.city : ''}
                                onChangeText={(txt) => setUserData({...userData, city: ''})}
                            />
                            <TextInput
                                style = {styles.Inp}
                                placeholder="Country"
                                placeholderTextColor="#666666"
                                autocorrect={false}
                                value={userData ? userData.country: ''}
                                onChangeText={(txt) => setUserData({...userData, country: ''})}
                            />
                        </View>

                        {uploading ? (
                                <View>
                                    <Text>{transferred}% Completed...</Text>
                                    <ActivityIndicator size='large' color="#2c2c2c"></ActivityIndicator>
                                </View>
                            ) : (
                                <View  style={[styles.cont, styles.backButt]}>
                                    <TouchableOpacity 
                                        style={[styles.buttWrapper, styles.buttonOutline]}
                                        onPress={() => {
                                            navigation.navigate("uScr")
                                        }}
                                    >
                                        <Text>Update</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

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

                        <Text>{auth.currentUser.displayName}</Text>
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
    },

    mBut: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default uEdit