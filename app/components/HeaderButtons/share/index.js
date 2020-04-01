import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text} from "react-native";
import { Overlay} from "react-native-elements";
import {useState} from "react";

export default function ShareButton () {
    const [confirmationOverlayVisible, setConfirmationOverlayVisible] = useState(false);

    return (
        <>
        <TouchableOpacity onPress={ () => {setConfirmationOverlayVisible(true)}}>
            <View style={ styles.container }>
                <Ionicons name='ios-share-alt' size={30}/>
            </View>
        </TouchableOpacity>
        <ShareConfirmation
            isVisible={confirmationOverlayVisible}
            setIsVisible={setConfirmationOverlayVisible}
        />
        </>
    )
}

export function ShareConfirmation ({ isVisible, setIsVisible } ) {

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
        paddingRight: 10
    }
});