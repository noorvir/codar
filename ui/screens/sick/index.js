import { useState } from 'react';
import * as React from 'react';
import {
    Platform,
    View
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


import styles from "../../constants/Styles";
import {cardStyle, pageStyle, buttonStyle, disabledTextColor} from './styles'

import SymptomsOption from "./symptoms";
import Colors from "../../constants/Colors";


export default function MeldungScreen( { navigation } ) {

    const [hasSymptoms, setHasSymptoms] = useState(false);
    const [positiveTest, setPositiveTest] = useState(false);
    const [negativeTest, setNegativeTest] = useState(false);

    const [positiveTestSectionVisible, setPositiveTestSectionVisible] = useState(false);
    const [negativeTestSectionVisible, setNegativeTestSectionVisible] = useState(false);

    const [meldung, setMeldung] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [showDate, setShowDate] = useState(false);

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

    const showDatepicker = () => {
        setShowDate(true);
    };

    const updateMeldung = () => {
        setMeldung(!meldung);
    };

    const cardStyle = () => {
        let color = Colors.neutralBlue;

        if ( positiveTest ) {
            color = Colors.alertRed;
        }
        else if ( negativeTest ) {
            color = Colors.allGoodGreen;
        }
        else if ( hasSymptoms ) {
            color = Colors.warningYellow;
        }

        return {
            padding: 10,
            borderRadius: 10,
            marginTop: 5,
            paddingBottom: 25,
            shadowColor: color,
            shadowRadius: 3,
            marginBottom: 20,
            shadowOpacity: 1
        }
    };

    if ( showDate ) {
        return (
            <View style={styles.container}>
                <DateSelectorScreen
                    date={date}
                    onChange={onChange}
                    setShowDate={setShowDate}
                />
            </View>
        )
    } else if ( meldung ){
        return (
            <ConfirmedScreen/>
        )
    } else {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={pageStyle.scrollContainer}
                    contentContainerStyle={pageStyle.scrollContentContainer}>

                    <Card containerStyle={ cardStyle() }>

                        <SymptomsOption isChecked={hasSymptoms} onChange={onSymptomChange}/>

                        <View pointerEvents={ positiveTestSectionVisible ? 'auto' : "none" } >
                            <PositiveOption
                                isActive={hasSymptoms}
                                isChecked={positiveTest}
                                onChange={onPositiveTestResultChange} />

                            <NegativeOption
                                isActive={hasSymptoms}
                                isChecked={negativeTest}
                                onChange={onNegativeTestResultChange} />

                            <TestDate
                                isActive={ hasSymptoms && (negativeTest || positiveTest) }
                                date={date}
                                showDatepicker={showDatepicker} />
                        </View>

                    </Card>

                    <View style={buttonStyle.buttonContainer}>
                        <Button
                            buttonStyle={ buttonStyle.button }
                            containerViewStyle={{width: '90%', marginLeft: 0 }}
                            title="Meldung abschicken"
                            onPress={ updateMeldung }
                            disabled={ !hasSymptoms }
                            disabledStyle={{ backgroundColor: disabledTextColor}}
                        />
                    </View>

                </ScrollView>

            </View>
        )
    }
}

MeldungScreen.navigationOptions = {
    header: null,
};

