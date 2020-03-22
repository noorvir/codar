import React, { useState } from 'react';
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
import { Icon, Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import styles from "../../constants/Styles";
import {MonoText} from "../../components/StyledText";


export default function HoneScreen () {

    const [peopleCrossed, setPeopleCrossed] = useState(10);
    const [potentialInfections, setPotentialInfections] = useState(0);
    const [positiveInfections, setPositiveInfections] = useState(0);

    function counterGut() {
        setPeopleCrossed(10);
        setPotentialInfections(0);
        setPositiveInfections(0);
    }

    let counterWarn = function () {
        setPeopleCrossed(20);
        setPotentialInfections(6);
    };

    function counterAlert() {
        setPeopleCrossed(26);
        setPotentialInfections(7);
        setPositiveInfections(1);
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={pageStyle.scrollContainer}
                contentContainerStyle={pageStyle.scrollContentContainer}>

                <Card containerStyle={cardStyle.card}>
                    <View style={cardStyle.container}>
                        <View style={cardStyle.textContainer}>
                            <Text style={cardStyle.text}>Begegnete</Text>
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
                                    <Text style={cardStyle.text}>Potenziell infizierte</Text>
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
                                    <Text style={cardStyle.text}>Positiv getestete</Text>
                                </View>
                                <View style={cardStyle.numberContainer}>
                                    <Text style={cardStyle.number}>{ positiveInfections }</Text>
                                </View>
                            </View>
                        </Card>
                        :
                        null
                }


                {
                    potentialInfections === 0 && positiveInfections === 0 ?
                        <View style={notice.container}>
                            <Text style={notice.infoText}>
                                Alles gut!
                            </Text>
                            <Text/>
                            <Text style={notice.infoText}>
                                Du bist bisher noch keiner Person begegnet,
                                die ein Risiko für deine Gesundheit darstellt.
                            </Text>
                            <Text/>
                            <TouchableOpacity onPress={ counterWarn }>
                                <Ionicons name='ios-checkmark-circle-outline' size={50} color='#30c60c'/>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }

                {
                    potentialInfections !== 0 && positiveInfections === 0 ?
                        <View style={notice.container}>
                            <Text style={notice.infoText}>
                                Achtung!
                            </Text>
                            <Text/>
                            <Text style={notice.infoText}>
                                Du bist in letzter Zeit Personen begegnet, die
                                Symptome gemeldet haben.
                            </Text>
                            <Text/>
                            <Text style={notice.infoText}>
                                Es besteht die Möglichkeit, dass
                                sie den Virus auf dich übertragen haben. Bleibe in nächster
                                Zeit lieber zu Hause und achte auf Symptome.
                            </Text>
                            <Text/>
                            <TouchableOpacity onPress={ counterAlert }>
                                <Ionicons name='ios-warning' size={50} color='#fdd004'/>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }

                {
                    potentialInfections !== 0 && positiveInfections !== 0 ?
                        <View style={notice.container}>
                            <Text style={notice.infoText}>
                                Achtung!
                            </Text>
                            <Text/>
                            <Text style={notice.infoText}>
                                Du bist in letzter Zeit einer Person begegnet, die
                                positiv getestet wurden.  Es ist sehr wahrscheinlich, dass
                                du dich angesteckt hast.
                            </Text>
                            <Text/>
                            <Text style={notice.infoText}>
                                Du solltest dich ab heute in eine zweiwöchige
                                Selbstquarantäne begeben und aufkommende Symptome melden.
                            </Text>
                            <Text/>
                            <TouchableOpacity onPress={ counterGut }>
                                <Ionicons name='ios-alert' size={50} color='#ed4e44f0'/>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }

            </ScrollView>

        </View>
    );
}

const pageStyle = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        flexDirection: 'column',
    },
    scrollContentContainer: {
        paddingTop: 30,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
});

const cardStyle = StyleSheet.create({
    card: {
        padding: 0,
        borderRadius: 10,
        marginTop: 5
    },
    container: {
        width: '90%',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        marginBottom: 5,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    },
    numberContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    number: {
        fontSize: 50
    },
});

const notice = StyleSheet.create({
    container: {
        // position: 'absolute',
        marginTop: 'auto',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 10
    },
    infoText: {
        fontSize: 15,
        fontStyle: 'italic',
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
});