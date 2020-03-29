import React from 'react';

import  {
    Text,
    View
} from 'react-native';
import styles from "../../constants/Styles";
import {ScrollView} from "react-native-gesture-handler";
import { Button } from 'react-native-elements';


export default function OnboardingDone({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={ styles.welcomeContainer }>
                    <Text style={ styles.getStartedText }>
                        Bis dahin, kannst du beruhigt sein, dass  du bisher
                        keinen getroffen hast, der ein Risiko für deine
                        Gesundheit darstellt.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.tabBarInfoContainer}>
                <Button
                    title="Starte jetzt"
                    backgroundColor="black"
                    onPress={ () => {navigation.navigate('OnboardingOne')} }
                />
            </View>

        </View>
    )
}