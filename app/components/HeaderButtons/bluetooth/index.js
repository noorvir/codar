import * as React from "react";
import {useState} from "react";
import { Ionicons } from "@expo/vector-icons";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import {Overlay} from "react-native-elements";
import {Alert} from "react-native";
import Colors from "../../../constants/Colors";


export default function BluetoothToggle ({ isOn, setIsOn }) {

    const handlePress = () => {
        if ( isOn ) {
            Alert.alert(
                'Turn Off Bluetooth?',
                'Are you sure you want to turn off Bluetooth? You will ' +
                'no longer be able to track interactions with potentially infected people.',
                [
                    {},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Turn Off', onPress: () => setIsOn(false)},
                ],
                { cancelable: false }
            )
        } else {
            setIsOn(true);
            console.log('bluetooth switched on')
        }
    };

    return (
        <>
            <TouchableOpacity onPress={handlePress}>
                <View style={ styles.container }>
                    <Ionicons name='ios-bluetooth' size={30} color={ isOn ? Colors.buttonBlue: null}/>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10
    }
});