import { Component } from 'react';
import {
    Switch,
} from 'react-native';

import Constants from 'expo-constants';

import * as React from 'react';
import { Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import Accordion from 'react-native-collapsible/Accordion';

// import styles from "../../constants/Styles";
import {Ionicons} from "@expo/vector-icons";


const SECTIONS = [
    {
        title: 'First',
        content: 'Lorem ipsum...',
    },
    {
        title: 'Second',
        content: 'Lorem ipsum...',
    },
];

class InfoScreen extends Component {
    state = {
        activeSections: [],
    };
    //
    // _renderSectionTitle = section => {
    //     return (
    //         <View style={styles.content}>
    //             {/*<Text>{section.content}</Text>*/}
    //         </View>
    //     );
    // };

    _renderHeader = section => {
        return (
            <OptionButton icon="md-school" label="How does it work?"/>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <Accordion
                sections={SECTIONS}
                activeSections={this.state.activeSections}
                // renderSectionTitle={this._renderSectionTitle}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
            />
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: Constants.statusBarHeight,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fdfdfd',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
});

export default InfoScreen;


//
// export default function InfoScreen() {
//
//     return (
//         <View style={styles.container}>
//             <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//                 <OptionButton
//                     icon="md-school"
//                     label="How does it work?"
//                     onPress={() => console.log('press')}
//                 />
//
//                 <OptionButton
//                     icon="md-compass"
//                     label="Is map data stored in the cloud?"
//                     onPress={() => console.log('press')}
//                 />
//
//                 <OptionButton
//                     icon="ios-chatboxes"
//                     label="Who has access to my data?"
//                     onPress={() => console.log('press')}
//                     isLastOption
//                 />
//             </ScrollView>
//         </View>
//     );
// }
//
// InfoScreen.navigationOptions = {
//     header: null,
// };
//

function OptionButton({ icon, label, onPress, isLastOption }) {
    return (
        <RectButton style={[styles2.option, isLastOption && styles2.lastOption]} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles2.optionIconContainer}>
                    <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
                </View>
                <View style={styles2.optionTextContainer}>
                    <Text style={styles2.optionText}>{label}</Text>
                </View>
            </View>
        </RectButton>
    );
}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
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
});