import {Text, View} from "react-native";
import {CheckBox} from "react-native-elements";
import TestText from "./text";
import * as React from "react";

import {cardStyle, disabledTextColor} from './styles'
import Colors from "../../constants/Colors";

export default function PositiveOption ( { isActive, isChecked, onChange} ) {
    return (
        <View style={cardStyle.container}>
            <View style={cardStyle.checkBoxContainer}>
                <CheckBox
                    checked={ isChecked }
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={ onChange }
                    uncheckedColor={ isActive ? Colors.tabIconDefault : disabledTextColor }
                />
            </View>
            <View style={cardStyle.textContainer}>
                <TestText
                    style={cardStyle.text}
                    color={ isActive ? null : disabledTextColor }>
                    Ich wurde positiv getestet </TestText>
            </View>
        </View>
    )
}