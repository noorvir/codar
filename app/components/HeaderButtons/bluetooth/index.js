import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import {Overlay} from "react-native-elements";
import {useState} from "react";

export default function BluetoothToggle () {
    const [isBluetoothOn, setIsBluetoothOn] = useState(true);
    const [confirmationOverlayVisible, setConfirmationOverlayVisible] = useState(false);

    const handlePress = () => {
        if ( isBluetoothOn ) {
            setConfirmationOverlayVisible(true);
        } else {
            setIsBluetoothOn(true);
        }
    };

    return (
        <>
        <TouchableOpacity onPress={handlePress}>
            <View style={ styles.container }>
                <Ionicons name='ios-bluetooth' size={30} color='#ed4e44f0'/>
            </View>
        </TouchableOpacity>
        <BluetoothOffConfirmation
            isVisible={confirmationOverlayVisible}
            setIsVisible={setConfirmationOverlayVisible}
        />
        </>
    )
}

export function BluetoothOffConfirmation ({ isVisible, setIsVisible } ) {

    const handleSubmit = () => {

    };

    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={ () => {setIsVisible(false)}}>
            <Text> Confirm </Text>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10
    }
});