import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, NativeModules, DeviceEventEmitter } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import MapView from "react-native-maps";
import styles from "../../constants/Styles";

const { LocalDatabaseModule } = NativeModules;

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

    let latitude =  52.518611;
    let longitude =  13.408333;
    let latitudeDelta =  0.0922;
    let longitudeDelta =  0.0421;

    let [warningLatLongList, setWarningLatLongList] = React.useState([
        { latitude: 52.51825, longitude: 13.4324 },
        { latitude: 52.51745, longitude: 13.4324 },
        { latitude: 52.51265, longitude: 13.4324 },
        { latitude: 52.51705, longitude: 13.4114 },
        { latitude: 52.51895, longitude: 13.4314 },
    ]);

    let [alertLatLongList, setAlertLatLongList] = React.useState([
        { latitude: 52.51825, longitude: 13.4324 },
        { latitude: 52.51745, longitude: 13.4924 },
        { latitude: 52.51265, longitude: 13.4624 },
        { latitude: 52.51705, longitude: 13.3114 },
        { latitude: 52.51895, longitude: 13.4314 },
    ]);

    const updateEncountersFromStore = async () => {
        let encounterObj = JSON.parse(await LocalDatabaseModule.getEncounters());
        setWarningLatLongList(
            encounterObj.map((encounter) => ({ latitude: encounter.locationLat, longitude: encounter.locationLong})));
    };
    
    React.useEffect(() => {
        updateEncountersFromStore();
        DeviceEventEmitter.addListener('newDataAvailable', (event) => updateEncountersFromStore());
        return () => DeviceEventEmitter.removeListener('newDataAvailable', (event) => updateEncountersFromStore());
    });

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