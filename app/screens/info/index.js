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
        title:
            'Welche Daten werden mit anderen geteilt, wenn ich Symptome melde?',
        content:
            'Niemand außer dir kann deine Person direkt mit deinen ' +
            'Symptomen verknüpft, da alle deine Daten lokal gehalten werden ' +
            'und du die Symptome lediglich an ein Pseudonym knüpfst. Lediglich ' +
            'wenn du einer Person an einem Ort oder Uhrzeit begegnest, bei der ' +
            'man eindeutig auf Dich schließen könnte, ist es theoretisch möglich ' +
            'bei einer Meldung auf dich zurückzuschließen. Du kannst aber ' +
            'entsprechende Kontakte bei der Meldung auch aus der Meldung ausschließen.',
        icon: 'ios-lock'
    },
    {
        title:
            'Kann ich ausschließen, infiziert zu sein, wenn mir keine ' +
            'infizierten Kontakte angezeigt wurden?',
        content:
            'Nein, die ChainBreaker App unterstützt Dich nur dabei, über ' +
            'Kontaktpersonen Bescheid zu wissen. Es gibt viele weitere ' +
            'Möglichkeiten sich zu infizieren bzw. durch das Berühren der ' +
            'gleichen Oberflächen als Infizierte. Darüber hinaus wirst du nur ' +
            'von anderen ChainBreaker-Teilnehmern gewarnt. Also Spread the word!',
        icon: 'ios-git-compare'
    },
    {
        title:
            'Wie kann ich sicher gehen, dass die App ordnungsgemäß funktioniert?',
        content:
            'Wenn du eine Benachrichtigung siehst, ist die App ordnungsgemäß ' +
            'eingerichtet und funktionstüchtig. Die App verifiziert selbstständig, ' +
            'dass Nachrichten gesendet und empfangen werden können. Darüber hinaus ' +
            'wirst du gewarnt, wenn dein Bluetooth beispielsweise ausgeschaltet ist?',
        icon: 'ios-checkmark'
    },
    {
        title:
            'Verringert die App meine Akkulaufzeit?',
        content:
            'Ja, aber nur ein bisschen. Bluetooth Low Energy heisst der ' +
            'Übertragungsstandard, den die App nutzt. Das "Low Energy" ist Programm.',
        icon: 'ios-battery-full'
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
        backgroundColor: '#fff',
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
        width: '85%'
    },
    option: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#aaa',
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