import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import styles from "../../constants/Styles";


export default function HomeScreen() {

    return (
        <View style={styles.container}>
            {/*<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>*/}

            {/*    <View style={styles.welcomeContainer}>*/}
            {/*        <Image*/}
            {/*            source={*/}
            {/*                __DEV__*/}
            {/*                    ? require('../assets/images/robot-dev.png')*/}
            {/*                    : require('../assets/images/robot-prod.png')*/}
            {/*            }*/}
            {/*            style={styles.welcomeImage}*/}
            {/*        />*/}
            {/*    </View>*/}

            {/*    <View style={styles.getStartedContainer}>*/}
            {/*    </View>*/}

            {/*    <View style={styles.helpContainer}>*/}
            {/*    </View>*/}

            {/*</ScrollView>*/}

            {/*<View style={styles.tabBarInfoContainer}>*/}
            {/*    <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>*/}

            {/*    <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>*/}
            {/*        <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>*/}
            {/*    </View>*/}
            {/*</View>*/}
        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};
