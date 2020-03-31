import {useEffect, useLayoutEffect, useState} from 'react';
import * as React from 'react';
import {
    Platform,
    View,
    StyleSheet, Text,
} from 'react-native';

import {
    Card,
    Button,
} from 'react-native-elements';

import { ScrollView } from 'react-native-gesture-handler';
import ConfirmedScreen from "./confirmed";
import TestText from "./text";
import TestDate from "./DateSelector";
import NegativeOption from "./negative";
import PositiveOption from "./positive";
import { DateSelectorScreen } from "./DateSelector";

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from "../../constants/Styles";
import { pageStyle, buttonStyle, disabledTextColor} from './styles'

import SymptomsOption from "./symptoms";
import Colors from "../../constants/Colors";
import OnboardingOne from "../onboarding/one";


const MeldungStack = createStackNavigator();

export default function MeldungScreen( { navigation } ) {

    const [meldung, setMeldung] = useState(false);


    // TODO: fix this
    useFocusEffect(
        React.useCallback(() => {
            navigation.dangerouslyGetParent().setOptions({
                headerShown: false
            });
            console.log('mounted');

            return () => {
                console.log(navigation);
                navigation.dangerouslyGetParent().setOptions({
                    headerShown: true
                });
                console.log('unmounted')
            }
        }, [])
    );


    return(
        <NavigationContainer independent={true} >
            <MeldungStack.Navigator initialRouteName={'Meldung'}>
                <MeldungStack.Screen
                    name={'Meldung'}
                    component={MeldungLandingScreen}
                />
                <MeldungStack.Screen
                    name={'DateSelectorScreen'}
                    component={DateSelectorScreen}
                    options={{headerLeft: button}}
                />
                <MeldungStack.Screen
                    name={'ConfirmedScreen'}
                    component={ConfirmedScreen}
                    options={{headerLeft: button}}
                    initialParams={{ meldung, setMeldung}}
                />
            </MeldungStack.Navigator>
        </NavigationContainer>
    );
}

MeldungScreen.navigationOptions = {
    header: null,
    headerMode: 'none'
};

function button () {
    return (
        <View style={ {paddingLeft: 10} }>
            <Text style={ {fontSize: 16} }>Back</Text>
        </View>
    )
}

function MeldungLandingScreen ( { navigation, meldung, setMeldung } ) {

    const [hasSymptoms, setHasSymptoms] = useState(false);
    const [positiveTest, setPositiveTest] = useState(false);
    const [negativeTest, setNegativeTest] = useState(false);

    const [positiveTestSectionVisible, setPositiveTestSectionVisible] = useState(false);
    const [negativeTestSectionVisible, setNegativeTestSectionVisible] = useState(false);

    const [date, setDate] = useState(new Date(1598051730000));
    const [showDate, setShowDate] = useState(false);

    const [isRegistered, setIsRegistered] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate.getFullYear());
    };

    const onSymptomChange = () => {
        setHasSymptoms( !hasSymptoms );
        setPositiveTestSectionVisible( !positiveTestSectionVisible );
        setNegativeTestSectionVisible( !negativeTestSectionVisible );

        // hasSymptoms state isn't updated yet - so this is opposite of what
        // you'd expect
        if ( hasSymptoms ) {
            setPositiveTest(false);
            setNegativeTest(false);
        }
    };

    const onPositiveTestResultChange = () => {
        setPositiveTest( !positiveTest );
        setNegativeTest(false);
    };

    const onNegativeTestResultChange = () => {
        setNegativeTest( !negativeTest );
        setPositiveTest(false);
    };

    const updateMeldung = () => {
        setMeldung(!meldung);
    };


    return (
        <View style={styles.container}>
            <ScrollView
                style={pageStyle.scrollContainer}
                contentContainerStyle={pageStyle.scrollContentContainer}>
                <View style={ {width: '90%'} }>
                    <Text style={ {fontSize: 36, fontWeight: 'bold', paddingBottom: 10, paddingLeft: 10} }>
                        Self Report
                    </Text>
                    <Text style={ {fontSize: 16, padding: 10,  paddingBottom: 15,} }>
                        Please tell us what your current state is.
                    </Text>
                </View>
                <View>
                    <Card containerStyle={ cardStyle.card } >

                        <SymptomsOption isChecked={hasSymptoms} onChange={onSymptomChange}/>
                    </Card>
                </View>
                <View pointerEvents={ positiveTestSectionVisible ? 'auto' : "none" } >
                    <Card containerStyle={ cardStyle.card } >

                        <PositiveOption
                            isActive={hasSymptoms}
                            isChecked={positiveTest}
                            onChange={onPositiveTestResultChange} />
                    </Card>
                    <Card containerStyle={ cardStyle.card }>
                        <NegativeOption
                            isActive={hasSymptoms}
                            isChecked={negativeTest}
                            onChange={onNegativeTestResultChange} />
                    </Card>
                </View>



                <View style={buttonStyle.buttonContainer}>
                    <Button
                        buttonStyle={ buttonStyle.button }
                        containerViewStyle={{width: '90%', marginLeft: 0 }}
                        title="Next"
                        onPress={
                            navigation.navigate(
                                'DateSelectorScreen',
                                { date, onChange, setShowDate})
                        }
                        disabled={ !hasSymptoms }
                        disabledStyle={{ backgroundColor: disabledTextColor}}
                    />
                </View>

            </ScrollView>

        </View>
    )
}




const cardStyle = StyleSheet.create({
   card: {
       padding: 10,
       borderRadius: 10,
       marginTop: 5,
       marginBottom: 10,
       justifyContent: 'center',
       alignItems: 'center',
       width: '90%'
   }
});