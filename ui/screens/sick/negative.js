import {View} from "react-native";
import {CheckBox} from "react-native-elements";
import TestText from "./text";
import * as React from "react";

import { cardStyle } from './styles'

export default function NegativeOption ( {isChecked, onChange} ) {
    return (
        <View style={cardStyle.container}>
            <View style={cardStyle.checkBoxContainer}>
                <CheckBox
                    checked={ isChecked }
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={ onChange }
                />
            </View>
            <View style={cardStyle.textContainer}>
                <TestText color={'red'}> Ich wurde negativ getestet </TestText>
            </View>
        </View>
    )
}