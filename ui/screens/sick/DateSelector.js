import styles from "../../constants/Styles";
import {ScrollView} from "react-native-gesture-handler";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Button} from "react-native-elements";

import { pageStyle, cardStyle } from './styles'

export default function TestDate ( {date, showDatepicker} ){
    return (
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
                    containerViewStyle={{width: '100%'}}
                    title="Fertig"
                    backgroundColor="black"
                    onPress={close}
                />
            </View>

        </View>
    )
}

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

