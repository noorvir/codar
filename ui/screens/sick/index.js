import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import styles from "../../constants/Styles";


export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.welcomeContainer}>

                    <Text>Meldung Screen</Text>
                </View>
            </ScrollView>
        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};
