import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import MapView from "react-native-maps";
import styles from "../../constants/Styles";


export default function MapScreen() {

    return (
        <View style={styles.container}>
            {/*<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>*/}
                <View  style={mapStyle.mapContainer}>
                    <MapView style={mapStyle.map}
                             initialRegion={{
                                 latitude: 37.78825,
                                 longitude: -122.4324,
                                 latitudeDelta: 0.0922,
                                 longitudeDelta: 0.0421,
                             }}
                    />
                </View>
            {/*</ScrollView>*/}
        </View>
    );
}

MapScreen.navigationOptions = {
    header: null,
};

const mapStyle = StyleSheet.create({
   mapContainer: {
       position: 'relative',
       width: '100%',
       height: '100%'
   },
    map: {
       width: '100%',
       height: '100%'
    }
});