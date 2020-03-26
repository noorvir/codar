import {Text, View} from "react-native";
import {CheckBox} from "react-native-elements";
import * as React from "react";
import {cardStyle} from "./styles";


export default function SymptomsOption ( {isChecked, onChange} ) {
    return (
        <View style={cardStyle.container}>
            <View style={cardStyle.checkBoxContainer}>
                <CheckBox
                    checked={ isChecked }
                    onPress={ onChange }
                />
            </View>
            <View style={cardStyle.textContainer}>
                <Text style={cardStyle.text}> Ich habe Stymptome </Text>
            </View>
        </View>
    )
}
