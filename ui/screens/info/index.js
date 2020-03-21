import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import styles from "../../constants/Styles";


export default function InfoScreen() {

    return (
        <View style={styles.container}>
            <Text>Info Screen</Text>
        </View>
    );
}

InfoScreen.navigationOptions = {
    header: null,
};
