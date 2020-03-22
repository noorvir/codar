import styles from "../../constants/Styles";
import {ScrollView} from "react-native-gesture-handler";
import {StyleSheet, View} from "react-native";
import * as React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Button} from "react-native-elements";

export default function DateSelectorScreen ({ date, onChange, setShowDate }) {

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

