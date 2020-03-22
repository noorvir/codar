import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import MapView from "react-native-maps";
import styles from "../../constants/Styles";


function WarningMarker({ latitude, longitude }) {
    let RADIUS = 100;

    return (
        <MapView.Circle
            key = { (longitude + longitude).toString() }
            center = { {latitude: latitude, longitude: longitude} }
            radius = { RADIUS }
            strokeWidth = { 1 }
            strokeColor = { '#fdd004' }
            fillColor = { 'rgba(253, 208, 4, 0.6)' }
        />
    );
}

function AlertMarker({ latitude, longitude }) {
    let RADIUS = 150;

    return (
        <MapView.Circle
            key = { (longitude + longitude).toString() }
            center = { {latitude: latitude, longitude: longitude} }
            radius = { RADIUS }
            strokeWidth = { 1 }
            strokeColor = { '#fdd004' }
            fillColor = { 'rgba(237, 78, 68, 0.6)' }
        />
    );
}

export default function MapScreen() {

    let latitude =  37.78825;
    let longitude =  -122.4324;
    let latitudeDelta =  0.0922;
    let longitudeDelta =  0.0421;

    let warningLatLongList = [
        { latitude: 37.78825, longitude: -122.4324 },
        { latitude: 37.78745, longitude: -122.4324 },
        { latitude: 37.78265, longitude: -122.4324 },
        { latitude: 37.77705, longitude: -122.4114 },
        { latitude: 37.78895, longitude: -122.4314 },
    ];

    let alertLatLongList = [
        { latitude: 37.79825, longitude: -122.4324 },
        { latitude: 37.70745, longitude: -122.4924 },
        { latitude: 37.78265, longitude: -122.4624 },
        { latitude: 37.78705, longitude: -122.3114 },
        { latitude: 37.78895, longitude: -122.4314 },
    ];


    return (
        <View style={styles.container}>
            {/*<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>*/}
                <View  style={mapStyle.mapContainer}>
                    <MapView style={mapStyle.map}
                             initialRegion={{
                                 latitude: latitude,
                                 longitude: longitude,
                                 latitudeDelta: latitudeDelta,
                                 longitudeDelta: longitudeDelta,
                             }}>
                        {/*<WarningMarker latitude={latitude} longitude={longitude}/>*/}
                        {warningLatLongList.map(coords => <WarningMarker latitude={coords.latitude} longitude={coords.longitude}/>)}
                        {alertLatLongList.map(coords => <AlertMarker latitude={coords.latitude} longitude={coords.longitude}/>)}

                    </MapView>

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