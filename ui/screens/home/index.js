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
import { Icon, Card } from 'react-native-elements';


import styles from "../../constants/Styles";
import {MonoText} from "../../components/StyledText";


export default function HoneScreen () {

    let peopleCrossed = 10;
    let potentialInfections = 2;
    let positiveInfections = 1;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


                <Card containerStyle={cardStyle.card}>
                    <View style={cardStyle.container}>
                        <View style={cardStyle.textContainer}>
                            <Text style={cardStyle.text}>Begegnete  Personen</Text>
                        </View>
                        <View style={cardStyle.numberContainer}>
                            <Text style={cardStyle.number}>{ peopleCrossed }</Text>
                        </View>
                    </View>
                </Card>

                {
                    potentialInfections !== 0 ?
                        <Card containerStyle={cardStyle.card}>
                            <View style={cardStyle.container}>
                                <View style={cardStyle.textContainer}>
                                    <Text style={cardStyle.text}>Potenziell infizierte Personen</Text>
                                </View>
                                <View style={cardStyle.numberContainer}>
                                    <Text style={cardStyle.number}>{ potentialInfections }</Text>
                                </View>
                            </View>
                        </Card>
                        :
                        null
                }

                {
                    positiveInfections !== 0 ?
                        <Card containerStyle={cardStyle.card}>
                            <View style={cardStyle.container}>
                                <View style={cardStyle.textContainer}>
                                    <Text style={cardStyle.text}>Positiv getestete Personen</Text>
                                </View>
                                <View style={cardStyle.numberContainer}>
                                    <Text style={cardStyle.number}>{ positiveInfections }</Text>
                                </View>
                            </View>
                        </Card>
                        :
                        null
                }

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

const cardStyle = StyleSheet.create({
    card: {
        padding: 0, borderRadius: 5
    },
    container: {
        width: '90%',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 20,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        fontSize: 25
    },
    numberContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    number: {
        fontSize: 70
    }
});