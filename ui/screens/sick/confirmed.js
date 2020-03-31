import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {Button} from "react-native-elements";
import styles from "../../constants/Styles";
import {ScrollView} from "react-native-gesture-handler";
import {Ionicons} from "@expo/vector-icons";

export default function ConfirmedScreen ({ navigation }) {

    return (
        <View style={styles.container}>
            <ScrollView
                style={pageStyle.scrollContainer}
                contentContainerStyle={pageStyle.scrollContentContainer}>

                <View style={notice.container}>
                    <Text style={notice.infoText}>
                        Confirmed!
                    </Text>
                    <Text/>
                    <Text style={notice.infoText}>
                        Thank you for confirming your diagnosis. Please stay indoors
                        and isolation yourself from public interaction.
                    </Text>
                    <Text/>
                    <Text style={notice.infoText}>
                        We wish you a speedy recovery.
                    </Text>
                    <Text/>
                    <Ionicons name='ios-heart' size={50} color='#fdd004'/>
                </View>
            </ScrollView>

        </View>
    )
}

const pageStyle = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        flexDirection: 'column',
    },
    scrollContentContainer: {
        paddingTop: 30,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
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


const notice = StyleSheet.create({
    container: {
        // position: 'absolute',
        // marginTop: 'auto',
        top: '20%',
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 10
    },
    infoText: {
        fontSize: 15,
        fontStyle: 'italic',
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
});

