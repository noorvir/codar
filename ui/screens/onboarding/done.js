import React from 'react';

import  {
    Text,
    Button,
    View
} from 'react-native';
import styles from "../../constants/Styles";
import {ScrollView} from "react-native-gesture-handler";

export default function OnboardingDone({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={ styles.welcomeContainer }>
                    <Text style={ styles.getStartedText }>
                        Done!
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}