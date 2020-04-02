import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import * as React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import {Button, Card} from "react-native-elements";

import { buttonStyle } from './styles'
import SwitchSelector from 'react-native-switch-selector'
import SymptomsOption from "./symptoms";
import { publish } from "../../lib/encounters";


export function DateSelectorScreen ({ navigation, route }) {

    let dateToday = new Date();
    const [submitting, setSubmitting] = useState(false);
    const [today, setToday] = useState(true);
    const [showAndroidDateSelector, setShowAndroidDateSelector] = useState(false);
    const [date, setDate] = useState(new Date());

    const onDateSwitchChange = () => {
        setToday( !today );
        if ( !today ) {
            setDate(dateToday)
        } else {
            let dateYesterday = (
                d => new Date(d.setDate(d.getDate()-1))
            )(new Date);
            setDate(dateYesterday);
        }
    };

    const onChange = (event, selectedDate) => {

        if (event.type === "dismissed" || event.type === "set"){
            setShowAndroidDateSelector(false)
        }

        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const getDatePicker = () => {
        return (
              <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  maximumDate={dateToday}
                  style={{flex: 1}}
              />
          );
    };

    const submit = () => {
        setSubmitting(true);
        publish("SYMPTOMS_NOT_TESTED").then(() => {
            setSubmitting(false);
            route.params.setIsRegistered(true);
            navigation.reset({
                index: 0,
                routes: [{ name: 'ConfirmedScreen' }],
            });
            navigation.navigate('ConfirmedScreen');
        }).catch(error => console.log(error));
    };

    return (
        <View style={ pageStyle.container }>
            <View style={ {width: '90%'} }>
                <Text style={ {fontSize: 36, fontWeight: 'bold', paddingBottom: 10, paddingLeft: 10} }>
                    Date of Test
                </Text>
                <Text style={ {fontSize: 16, padding: 10,  paddingBottom: 10,} }>
                    Please tell us when you got tested or first noticed the symptoms.
                </Text>
            </View>
            <SwitchSelector
                initial={0}
                style={{width: '90%', margin: 'auto'}}
                onPress={onDateSwitchChange}
                textColor={'black'} //'#7a44cf'
                selectedColor={'black'}
                buttonColor={'#FFF'}
                borderColor={'#EDEEEF'}
                backgroundColor={'#EDEEEF'}
                buttonMargin={2}
                borderRadius={10}
                hasPadding
                options={[
                    { label: "Today", value: "f",  },
                    { label: "Yesterday", value: "m", }
                ]}
            />
            {Platform.OS === "ios" ?
                <View style={pageStyle.dateWheelContainer}>
                    <View style={pageStyle.dateWheel}>
                        {getDatePicker()}
                    </View>
                </View>
                :
                <View style={cardStyle.container}>
                    <TouchableOpacity
                        onPress={ () => {setShowAndroidDateSelector(true)} }
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: '100%'}} >
                        <Card containerStyle={cardStyle.card}>
                            <Text style={{ fontSize: 17, fontWeight:'bold' }}>
                                {date.getDate()} /
                                {date.getMonth() + 1} /
                                {date.getFullYear()}
                            </Text>
                        </Card>
                    </TouchableOpacity>
                    {showAndroidDateSelector ? getDatePicker() : null}
                </View>
            }

            <View style={ buttonStyle.buttonContainer }>
                <Button
                    loading={submitting}
                    buttonStyle={ buttonStyle.button }
                    containerViewStyle={{width: '80%', marginLeft: 0 }}
                    title="Finished"
                    backgroundColor="black"
                    onPress={ submit }
                />
            </View>

        </View>
    )
}



const pageStyle = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10%',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'

    },
    dateWheelContainer: {
        flexShrink: 1,
        paddingTop: 20,
        justifyContent: 'flex-start',
        height: '50%',
        width: '100%'
    },
    dateWheel:{
        height: '45%',
        width: '100%',
    }
});



const cardStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: '20%',
        width: '100%'
    },
    card: {
        flexShrink: 1,
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%'
    }
});
