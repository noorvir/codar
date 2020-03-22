import { useState } from 'react';
import * as React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ConfirmedScreen from "./confirmed";

import DateSelectorScreen from "./DateSelector";

import {
    Icon,
    Card,
    CheckBox,
    Button,
    Input,
} from 'react-native-elements';

import styles from "../../constants/Styles";


export default function MeldungScreen( { navigation } ) {

    const [meldung, setMeldung] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [showDate, setShowDate] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate.getFullYear());
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

                        <View style={cardStyle.container}>
                            <View style={cardStyle.checkBoxContainer}>
                                <CheckBox checked={false}/>
                            </View>
                            <View style={cardStyle.textContainer}>
                                <Text style={cardStyle.text}> Ich habe
                                    Stymptome </Text>
                            </View>
                        </View>

                        <View style={cardStyle.container}>
                            <View style={cardStyle.checkBoxContainer}>
                                <CheckBox
                                    checked={false}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                />
                            </View>
                            <View style={cardStyle.textContainer}>
                                <Text style={cardStyle.text}> Ich wurde
                                    positiv getestet </Text>
                            </View>
                        </View>
                        <View style={cardStyle.container}>
                            <View style={cardStyle.checkBoxContainer}>

                            </View>
                            <View style={cardStyle.inputContainer}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                }}>
                                    <Text>wannn:</Text>
                                </View>
                                <View style={{
                                    height: 50,
                                    flexDirection: 'row'
                                }}>
                                    <View style={{width: '15%'}}/>
                                    <View style={{
                                        width: '85%',
                                        paddingRight: '15%'
                                    }}>
                                        <TouchableOpacity
                                            onPress={showDatepicker}>
                                            <View style={{
                                                flexDirection: 'column',
                                                height: '100%',
                                                borderBottomColor: 'black',
                                                borderBottomWidth: 0.5,
                                                alignItems: 'center',
                                                justifyContent: 'center'

                                            }}>
                                                <Text style={{
                                                    flexGrow: 1,
                                                    height: '100%',
                                                    justifyContent: 'flex-end',
                                                    fontSize: 25

                                                }}>
                                                    { date.getDate() - 1} /
                                                    { date.getMonth() + 1} /
                                                    { date.getFullYear() }
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>

                        <View style={cardStyle.container}>
                            <View style={cardStyle.checkBoxContainer}>
                                <CheckBox
                                    checked={false}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                />
                            </View>
                            <View style={cardStyle.textContainer}>
                                <Text style={cardStyle.text}> Ich wurde
                                    negativ getestet </Text>
                            </View>
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

const pageStyle = StyleSheet.create({
    scrollContainer: {
        // flexGrow: 1,
        flexDirection: 'column',
    },
    scrollContentContainer: {
        paddingTop: 30,
        flexGrow: 1,
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
});

const cardStyle = StyleSheet.create({
    card: {
        padding: 0,
        borderRadius: 10,
        marginTop: 5
    },
    container: {
        width: '95%',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        marginBottom: 5,
    },
    checkBoxContainer: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 16
    },
    textContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        // alignItems: 'center',
        // backgroundColor: 'blue'
    },
});

const buttonStyle = StyleSheet.create({
    buttonContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 10
    }
});
