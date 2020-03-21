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

import OnboardingOne from "./one";
import OnboardingTwo from "./two";
import OnboardingThree from "./three";
import styles from "../../constants/Styles";
import {MonoText} from "../../components/StyledText";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'OnboardingOne';
const TITLE = 'ChainBreaker';

export default function Onboarding () {

    function log () {
        console.log("click")
    }

    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <NavigationContainer>
                <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
                    <Stack.Screen
                        name={ "OnboardingOne" }
                        component={ OnboardingOne }
                        options={{
                            title: 'ChainBreaker'
                        }}
                    />
                    <Stack.Screen name={ "OnboardingTwo" } component={ OnboardingOne } />
                    <Stack.Screen name={ "OnboardingThree" } component={ OnboardingOne } />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}
