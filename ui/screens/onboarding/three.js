import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {ScrollView} from "react-native-gesture-handler";
import styles from "../../constants/Styles";

export default function OnboardingThree() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={ styles.welcomeContainer }>
                    <Text style={ styles.getStartedText }>
                        App is not Initialized!
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}