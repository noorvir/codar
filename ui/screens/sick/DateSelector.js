import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import * as React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import {Button} from "react-native-elements";
import { pageStyle, cardStyle, disabledTextColor, buttonStyle } from './styles'
import TestText from "./text";

export default function TestDate ( { isActive, date, showDatepicker} ){

    const dateContainerStyle = (borderColor) => {
        return {
            flexDirection: 'column',
            height: '100%',
            borderBottomColor: borderColor,
            borderBottomWidth: 0.5,
            alignItems: 'center',
            justifyContent: 'center'

        }
    };

    return (
        <View style={cardStyle.container}>
            <View style={cardStyle.checkBoxContainer}>

            </View>
            <View style={cardStyle.inputContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}>
                    <TestText color={ isActive ? null : disabledTextColor}>
                        wannn:
                    </TestText>
                </View>
                <View style={{
                    height: 50,
                    flexDirection: 'row'
                }}>
                    <View style={{width: '15%'}}/>
                    <View
                        style={{ width: '85%', paddingRight: '15%'}}
                        pointerEvents={ isActive ? 'auto' : "none" }>
                        <TouchableOpacity
                            onPress={showDatepicker}>
                            <View style={dateContainerStyle(isActive? null: disabledTextColor)}>
                                <TestText
                                    color={ isActive ? null : disabledTextColor}
                                    style={{
                                    flexGrow: 1,
                                    height: '100%',
                                    justifyContent: 'flex-end',
                                    fontSize: 25}} >
                                    { date.getDate() - 1} /
                                    { date.getMonth() + 1} /
                                    { date.getFullYear() }
                                </TestText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )
}

export function DateSelectorScreen ({ date, onChange, setShowDate }) {

    function close() {
        setShowDate(false)
    }

    return (
        <View style={{
            // height: '100%',
            flexDirection: 'column',
            // alignItems: 'center'
            paddingTop:'40%'
        }}>
            <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChange}
            />


            <View style={buttonStyle.buttonContainer}>
                <Button
                    buttonStyle={ {backgroundColor: '#0070e3', width: '100%', borderRadius: 7, margin: 0, padding: 12} }
                    containerViewStyle={{width: '90%', marginLeft: 0 }}
                    title="Fertig"
                    backgroundColor="black"
                    onPress={close}
                />
            </View>

        </View>
    )
}


