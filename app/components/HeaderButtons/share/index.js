import * as React from "react";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity, Text, Share, Button } from "react-native";
import { Overlay} from "react-native-elements";


export default function ShareButton () {

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'https://chainbreaker-app.web.app/',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <TouchableOpacity onPress={ onShare }>
                <View style={ styles.container }>
                    <Ionicons name='ios-share-alt' size={30}/>
                </View>
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingRight: 10
    }
});