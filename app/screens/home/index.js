import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    DeviceEventEmitter
} from "react-native";
import { NativeEventEmitter, NativeModules } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon, Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import styles from "../../constants/Styles";
import Colors from "../../constants/Colors";
import EncounterFetcher, { EncounterContext } from '../../components/EncounterFetcher';
import EncounterCard from '../../components/EncounterCard';

const { LocalDatabaseModule } = NativeModules;

function EncounterNotice({ children, icon, color }) {
    return (
        <View style={notice.container}>
            <Text style={notice.infoText}>
                {children}
            </Text>
            <TouchableOpacity>
                <Ionicons name={icon} size={50} color={color} />
            </TouchableOpacity>
        </View>
    )
}

function EncounterCards() {
    const [localEncounters, potentiallyInfectiousEncounters, infectiousEncounters] = React.useContext(EncounterContext);

    return (
        <>
            <EncounterCard
                containerStyle={cardStyle.neutralCard}
                title={"Begegnete"}
                count={localEncounters.length}
                displayZero
            />

            <EncounterCard
                containerStyle={cardStyle.warningCard}
                title={"Potenziell infizierte"}
                count={potentiallyInfectiousEncounters.length}
            />

            <EncounterCard
                containerStyle={cardStyle.alertCard}
                title={"Positiv getestete"}
                count={infectiousEncounters.length}
            />
        </>
    )
}

function EncounterNotices() {
    const [localEncounters, potentiallyInfectiousEncounters, infectiousEncounters] = React.useContext(EncounterContext);
    return (
        <>
            {
                potentiallyInfectiousEncounters.length === 0 && infectiousEncounters.length === 0 ?
                    <EncounterNotice icon="ios-checkmark-circle-outline" color={Colors.allGoodGreen}>
                        Alles gut!{"\n\n"}
                        Du bist bisher noch keiner Person begegnet, die ein Risiko für deine Gesundheit darstellt.
                    </EncounterNotice>
                    :
                    null
            }

            {
                potentiallyInfectiousEncounters.length !== 0 && infectiousEncounters.length === 0 ?
                    <EncounterNotice icon="ios-warning" color="#fdd004">
                        Achtung! {"\n\n"}
                        Du bist in letzter Zeit Personen begegnet, die Symptome gemeldet haben. {"\n\n"}
                        Es besteht die Möglichkeit, dass sie den Virus auf dich übertragen haben.
                        Bleibe in nächster Zeit lieber zu Hause und achte auf Symptome.
                    </EncounterNotice>
                    :
                    null
            }

            {
                infectiousEncounters.length !== 0 ?
                    <EncounterNotice icon='ios-alert' color="#ed4e44f0">
                        Achtung! {"\n\n"}
                        Du bist in letzter Zeit einer Person begegnet, die positiv getestet wurden. Es ist sehr wahrscheinlich, dass du dich angesteckt hast. {"\n\n"}
                        Du solltest dich ab heute in eine zweiwöchige Selbstquarantäne begeben und aufkommende Symptome melden.
                    </EncounterNotice>
                    :
                    null
            }
        </>
    );
}

export default function HomeScreen(navigation) {
    const DataEventEmitterModule = NativeModules.DataEventEmitterModule;
    const [peopleCrossed, setPeopleCrossed] = useState(0);
    const [potentialInfections, setPotentialInfections] = useState(0);
    const [positiveInfections, setPositiveInfections] = useState(0);

    const updateEncountersFromStore = async () => {
        let encounterObj = JSON.parse(await LocalDatabaseModule.getEncounters());
        setPeopleCrossed(encounterObj.length);
    };

    updateEncountersFromStore();

    useEffect(() => {
        DeviceEventEmitter.addListener(
            'newDataAvailable',
            (event) => updateEncountersFromStore()
        );

        return () => DeviceEventEmitter.removeListener(
            'newDataAvailable',
            (event) => updateEncountersFromStore()
        );
    }, [DeviceEventEmitter]);

    function counterGut() {
        // setPeopleCrossed(10);
        setPotentialInfections(0);
        setPositiveInfections(0);
    }

    let counterWarn = function () {
        // setPeopleCrossed(20);
        setPotentialInfections(6);
    };

    function counterAlert() {
        // setPeopleCrossed(26);
        setPotentialInfections(7);
        setPositiveInfections(1);
    }

    return (
        <EncounterFetcher>
            <View style={styles.container}>
                <ScrollView
                    style={pageStyle.scrollContainer}
                    contentContainerStyle={pageStyle.scrollContentContainer}>

                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <EncounterCards />
                    </View>

                    <EncounterNotices />

                </ScrollView >
            </View >
        </EncounterFetcher>
    );                                    
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

const cardStyle = StyleSheet.create({
    neutralCard: {
        padding: 0,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        borderWidth: 0,
        marginTop: 5,
        zIndex: 0,
        width: '90%',
        backgroundColor: Colors.neutralBlue
    },
    warningCard: {
        padding: 0,
        paddingTop: 10,
        paddingBottom: 5,
        borderRadius: 10,
        borderWidth: 0,
        marginTop: -15,
        zIndex: -1,
        width: '90%',
        backgroundColor: Colors.warningYellow
    },
    alertCard: {
        padding: 0,
        paddingTop: 10,
        paddingBottom: 5,
        borderRadius: 10,
        borderWidth: 0,
        marginTop: -15,
        zIndex: -2,
        width: '90%',
        backgroundColor: Colors.alertRed
    },
});

const notice = StyleSheet.create({
    container: {
        // position: 'absolute',
        marginTop: 'auto',
        bottom: 0,
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
