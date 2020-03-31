import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import * as React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import {Button} from "react-native-elements";
import Colors from "../../constants/Colors";

import { cardStyle, disabledTextColor, buttonStyle } from './styles'
import TestText from "./text";
import SwitchSelector from 'react-native-switch-selector'


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
            <View style={{
                    flexGrow: 1,
                    flexDirection: 'column',
                    // justifyContent: 'flex-start',
                    alignItems: 'center',
            }}>
                <View>
                <TestText color={ isActive ? null : disabledTextColor }>
                    Test Date
                </TestText>
                </View>
                {/*<View style={dateContainerStyle(isActive? null: disabledTextColor)}>*/}
                <View style={ {marginTop: 15} }>
                    <TouchableOpacity onPress={showDatepicker}>
                        <TestText color={ isActive ? null : disabledTextColor}>
                            { date.getDate() - 1} /
                            { date.getMonth() + 1} /
                            { date.getFullYear() }
                        </TestText>
                    </TouchableOpacity>
                </View>
                {/*</View>*/}
            </View>
        </View>
    )
}

export function DateSelectorScreen ({ date, onChange, setShowDate, navigation }) {

    let dateToday = new Date().getDate();
    const [today, setToday] = useState(true);

    function close() {
        setShowDate(false)
    }

    return (
        <View style={ pageStyle.container }>
            <SwitchSelector
                initial={0}
                style={{width: '90%', margin: 'auto'}}
                onPress={value => setToday(!today)}
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

            <View style={pageStyle.dateWheelContainer}>
                <View  style={pageStyle.dateWheel}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        maximumDate={ dateToday }
                        style={{flex:1}}
                    />
                </View>
            </View>
            <View style={ buttonStyle.buttonContainer }>
                <Button
                    buttonStyle={ buttonStyle.button }
                    containerViewStyle={{width: '80%', marginLeft: 0 }}
                    title="Finished"
                    backgroundColor="black"
                    onPress={close}
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
        width: '100%'

    },
    dateWheelContainer: {
        flexShrink: 1,
        paddingTop: 20,
        justifyContent: 'flex-start',
        height: '70%',
        width: '100%'
    },
    dateWheel:{
        height: '40%',
        width: '100%',
    }
});