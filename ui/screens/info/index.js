import { useState } from 'react';
import * as React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import Accordion from 'react-native-collapsible/Accordion';

import { Ionicons } from "@expo/vector-icons";

function OptionButton({ icon, label, onPress, isLastOption }) {
    return (
        <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
            <View style={ styles.optionContainer }>
                <View style={styles.optionIconContainer}>
                    <Ionicons name={icon} size={30} color="rgba(0,0,0,0.35)" />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            </View>
        </RectButton>
    );
}

const SECTIONS = [
    {
        title: 'How does it work?',
        content: 'Magic!',
        icon: 'ios-construct',
    },
    {
        title: 'Is my data stored in the cloud?',
        content: 'No no no no!!',
        icon: 'ios-cloud'
    },
    {
        title: 'Who has access to my data?',
        content: 'Nobawdy :D',
        icon: 'ios-lock'
    },
];


export default function InfoScreen() {

    const [activeSection, setActiveSection] = useState([]);

    function updateSections( _activeSection ){
        setActiveSection(_activeSection);
    }

    function renderHeader( section ){
        return (
            <OptionButton
                icon={section.icon}
                label={section.title}
            />
        );
    }

    function renderContent( _section ) {
        return (
            <View style={styles.content}>
                <Text>{_section.content}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <Accordion
                sections={SECTIONS}
                activeSections={activeSection}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
            />
            </ScrollView>
        </View>
    );

}

InfoScreen.navigationOptions = {
    header: null,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 0,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIconContainer: {
        padding: 5,
        width: '15%',
        marginRight: 1,
        justifyContent: 'center'
    },
    optionTextContainer: {

    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
    content: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: '#ededed',
    },
});