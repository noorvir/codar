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
import OnboardingDone from "./done";

import styles from "../../constants/Styles";
import {MonoText} from "../../components/StyledText";
import BottomTabNavigator from "../../navigation/BottomTabNavigator";

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
                <Stack.Navigator
                    initialRouteName={INITIAL_ROUTE_NAME}

                >
                    <Stack.Screen
                        name={ "OnboardingOne" }
                        component={ OnboardingOne }
                        options={{
                            title: 'ChainBreaker',
                            headerLeft: null
                        }}
                    />
                    <Stack.Screen
                        name={ "OnboardingTwo" }
                        component={ OnboardingTwo }
                        options={{
                            title: 'ChainBreaker',
                            headerLeft: null
                        }}
                    />
                    <Stack.Screen
                        name={ "OnboardingThree" }
                        component={ OnboardingThree }
                        options={{
                            title: 'ChainBreaker',
                            headerLeft: null
                        }}
                    />
                    <Stack.Screen
                        name={ "OnboardingDone" }
                        component={ OnboardingDone }
                        options={{
                            title: 'ChainBreaker',
                            headerLeft: null
                        }}
                    />
                    <Stack.Screen
                        name="Root"
                        component={BottomTabNavigator}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}
