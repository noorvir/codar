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

import OnboardingOne from "./one";
import styles from "../../constants/Styles";
import {MonoText} from "../../components/StyledText";

const Stack = createStackNavigator();

export default function Onboarding () {
    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={ "OnboardingOne" }
                        component={ OnboardingOne }
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}
