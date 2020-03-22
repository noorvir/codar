import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import {
    Icon,
    Card,
    CheckBox,
    Button,
    Input,
} from 'react-native-elements';

import styles from "../../constants/Styles";


export default function SickScreen() {

    return (
        <View style={styles.container}>
            <ScrollView
                style={pageStyle.scrollContainer}
                contentContainerStyle={pageStyle.scrollContentContainer}>

                <Card containerStyle={cardStyle.card}>

                    <View style={cardStyle.container}>
                        <View style={cardStyle.checkBoxContainer}>
                            <CheckBox checked={false}/>
                        </View>
                        <View style={cardStyle.textContainer}>
                            <Text style={cardStyle.text}> Ich habe Stymptome </Text>
                        </View>
                    </View>

                    <View style={cardStyle.container}>
                        <View style={cardStyle.checkBoxContainer}>
                            <CheckBox
                                checked={false}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                            />
                        </View>
                        <View style={cardStyle.textContainer}>
                            <Text style={cardStyle.text}> Ich wurde positiv getestet </Text>
                        </View>
                    </View>
                    <View style={cardStyle.container}>
                        <View style={cardStyle.checkBoxContainer}>

                        </View>
                        <View style={cardStyle.inputContainer}>
                            <Input label='wann:'/>
                        </View>
                    </View>

                    <View style={cardStyle.container}>
                        <View style={cardStyle.checkBoxContainer}>
                            <CheckBox
                                checked={false}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                            />
                        </View>
                        <View style={cardStyle.textContainer}>
                            <Text style={cardStyle.text}> Ich wurde negativ getestet </Text>
                        </View>
                    </View>

                </Card>

                <View style={ buttonStyle.buttonContainer}>
                    <Button
                        containerViewStyle={{width: '100%'}}
                        title="Meldung abschicken"
                        backgroundColor="black"
                        onPress={ () => {navigation.navigate('OnboardingOne')} }
                    />
                </View>

            </ScrollView>
        </View>
    );
}

SickScreen.navigationOptions = {
    header: null,
};

const pageStyle = StyleSheet.create({
    scrollContainer: {
        // flexGrow: 1,
        flexDirection: 'column',
    },
    scrollContentContainer: {
        paddingTop: 30,
        flexGrow: 1,
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
});

const cardStyle = StyleSheet.create({
    card: {
        padding: 0,
        borderRadius: 10,
        marginTop: 5
    },
    container: {
        width: '95%',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        marginBottom: 5,
    },
    checkBoxContainer: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 16
    },
    textContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center',
    },
});

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
