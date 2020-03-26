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
import DateSelectorScreen from "./DateSelector";


import styles from "../../constants/Styles";
import { cardStyle, pageStyle, buttonStyle } from './styles'

import SymptomsOption from "./symptoms";


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

        if ( !hasSymptoms ) {
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

    if ( showDate ) {
        return (
            <DateSelectorScreen
                date={date}
                onChange={onChange}
                setShowDate={setShowDate}
            />
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

                    <Card containerStyle={cardStyle.card}>

                        <SymptomsOption isChecked={hasSymptoms} onChange={onSymptomChange}/>

                        <View pointerEvents={ positiveTestSectionVisible ? 'auto' : "none" } >
                            <PositiveOption isChecked={positiveTest} onChange={onPositiveTestResultChange} />
                            <NegativeOption isChecked={negativeTest} onChange={onNegativeTestResultChange} />
                            <TestDate date={date} showDatepicker={showDatepicker}/>
                        </View>

                    </Card>

                    <View style={buttonStyle.buttonContainer}>
                        <Button
                            containerViewStyle={{width: '100%'}}
                            title="Meldung abschicken"
                            backgroundColor="black"
                            onPress={ updateMeldung }
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
