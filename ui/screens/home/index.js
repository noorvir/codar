import React from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    Image,
    TouchableOpacity, StyleSheet
} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import Dots from "react-native-dots-pagination";
import { Icon } from 'react-native-elements';


import styles from "../../constants/Styles";
import {MonoText} from "../../components/StyledText";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'OnboardingOne';
const TITLE = 'ChainBreaker';

export default function HoneScreen () {

    let peopleCrossed = 0;
    let potentialInfections = 0;
    let positiveInfections = 0;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                <View style={styles.welcomeContainer}>
                    <Text>Card 1</Text>
                    <Icon name='heartbeat' type='font-awesome'/>
                </View>

                <View style={styles.getStartedContainer}>
                    <Text>Card 2</Text>
                </View>

                {
                    peopleCrossed === 0 ?
                    <View style={styles.helpContainer}>
                        <Text>Card 3</Text>
                    </View>:
                    null
                }
                <View style={styles.helpContainer}>
                    <Text>Card 3</Text>
                </View>

            </ScrollView>

            <View style={styles.tabBarInfoContainer}>
                <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

                <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
                    <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
                </View>
            </View>
        </View>
    );
}
