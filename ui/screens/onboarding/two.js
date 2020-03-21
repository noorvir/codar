import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from "react-native-gesture-handler";
import styles from "../../constants/Styles";
import {Icon} from "react-native-elements";
import Dots from "react-native-dots-pagination";

export default function OnboardingTwo({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={ styles.welcomeContainer }>
                    <Text style={ styles.getStartedText }>
                        App is not Initialized!
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.tabBarInfoContainer}>

                <View style={ {flexDirection: 'row'} }>
                    <View style={ {width: "80%"} }>
                        <Dots length={4} active={1}/>
                    </View>
                    <Icon
                        name="chevron-right"
                        type="feather"
                        onPress={
                            () => navigation.navigate('OnboardingThree')
                        }/>
                </View>

            </View>
        </View>

    )
}