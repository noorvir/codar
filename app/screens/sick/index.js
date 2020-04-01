import { useState } from 'react';
import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    Card,
    Button,
} from 'react-native-elements';

import { ScrollView } from 'react-native-gesture-handler';
import ConfirmedScreen from "./confirmed";
import NegativeOption from "./negative";
import PositiveOption from "./positive";
import { DateSelectorScreen } from "./DateSelector";

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from "../../constants/Styles";
import { pageStyle, buttonStyle, disabledTextColor} from './styles'

import SymptomsOption from "./symptoms";


const MeldungStack = createStackNavigator();

export default function MeldungScreen( { navigation } ) {

    const [isRegistered, setIsRegistered] = useState(false);

    // TODO: fix this
    useFocusEffect(
        React.useCallback(() => {
            navigation.dangerouslyGetParent().setOptions({
                headerShown: false
            });

            return () => {
                console.log(navigation);
                navigation.dangerouslyGetParent().setOptions({
                    headerShown: true,
                });
            }
        }, [])
    );


    return(
        <NavigationContainer independent={true} >
            <MeldungStack.Navigator initialRouteName={ isRegistered ? 'ConfirmedScreen' : 'Meldung' }>
                <MeldungStack.Screen
                    name={'Meldung'}
                    component={MeldungLandingScreen}
                    options={ {headerTitleAlign:'center'}}
                />
                <MeldungStack.Screen
                    name={'DateSelectorScreen'}
                    component={DateSelectorScreen}
                    initialParams={{setIsRegistered: setIsRegistered}}
                    options={ {headerTitleAlign:'center'}}
                />
                <MeldungStack.Screen
                    name={'ConfirmedScreen'}
                    component={ConfirmedScreen}
                    options={{
                        headerLeft: null,
                        gesturesEnabled: false,
                        headerTitleAlign:'center'
                    }}
                />
            </MeldungStack.Navigator>
        </NavigationContainer>
    );
}

MeldungScreen.navigationOptions = {
    header: null,
    headerMode: 'none'
};


function MeldungLandingScreen ( { navigation, route } ) {

    const [hasSymptoms, setHasSymptoms] = useState(false);
    const [positiveTest, setPositiveTest] = useState(false);
    const [negativeTest, setNegativeTest] = useState(false);

    const [positiveTestSectionVisible, setPositiveTestSectionVisible] = useState(false);
    const [negativeTestSectionVisible, setNegativeTestSectionVisible] = useState(false);

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

    const navigateToDateSelector = () => {
        navigation.navigate(
            'DateSelectorScreen',
        )
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
                    <TouchableOpacity onPress={ onSymptomChange } style={{width: '100%'}}>
                        <Card containerStyle={ cardStyle.card } >
                            <SymptomsOption isChecked={hasSymptoms} onChange={onSymptomChange}/>
                        </Card>
                    </TouchableOpacity>
                </View>

                <View pointerEvents={ positiveTestSectionVisible ? 'auto' : "none" } >
                    <TouchableOpacity onPress={ onPositiveTestResultChange } style={{width: '100%'}}>
                        <Card containerStyle={ cardStyle.card } >
                            <PositiveOption
                                isActive={hasSymptoms}
                                isChecked={positiveTest}
                                onChange={onPositiveTestResultChange}
                            />
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ onNegativeTestResultChange } style={{width: '100%'}}>
                        <Card containerStyle={ cardStyle.card }>
                            <NegativeOption
                                isActive={hasSymptoms}
                                isChecked={negativeTest}
                                onChange={onNegativeTestResultChange}
                            />
                        </Card>
                    </TouchableOpacity>
                </View>

                <View style={buttonStyle.buttonContainer}>
                    <Button
                        buttonStyle={ buttonStyle.button }
                        containerViewStyle={{width: '90%', marginLeft: 0 }}
                        title="Next"
                        onPress={navigateToDateSelector}
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