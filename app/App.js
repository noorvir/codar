import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, useRef } from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  AsyncStorage,
  View,
  AppRegistry,
  NativeModules,
  I18nManager
} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import Onboarding from 'react-native-onboarding-swiper';
import BluetoothToggle from "./components/HeaderButtons/bluetooth";

import localize from './translation'
import ShareButton from "./components/HeaderButtons/share";

// Setting a default background color for all View components.
const Stack = createStackNavigator();

export default function App(props) {
  const [isBluetoothOn, setIsBluetoothOn] = useState(true);
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initialNavigationState, setInitialNavigationState] = useState();
  const containerRef = useRef();
  const {getInitialState} = useLinking(containerRef);

  const finishOnboarding = () => {
    setIsInitialized(true);

    const _storeData = async () => {
      try {
        await AsyncStorage.setItem('onboardingFinsihed', 'true');
      } catch (error) {
        // Error saving data
        console.warn(error);
        console.warn("Couldn't store that Onboarding finished.")
      }
    };
    _storeData()
  };

  // TODO: Get bluetooth on from persistent storage. Doesn't work yet. Blocks.
  async function getBluetoothStatus () {
    try {
      setIsBluetoothOn(await AsyncStorage.getItem('isBluetoothOn'));
    } catch (error) {
      setIsBluetoothOn(false);
      console.log('bluetooth error')
    }
  }
  // getBluetoothStatus();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
        setIsInitialized(await AsyncStorage.getItem('onboardingFinsihed'));

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    if (!isInitialized) {
      return (
          <View style={styles.container}>
            <Onboarding
            pages={[
              {
                backgroundColor: '#fff',
                title: localize('onboarding.step_1_heading'),
                image: <Image source={require('./assets/images/de/onboarding_1.png')} style={{ width: 300, height: 300 }} />,
                subtitle: localize('onboarding.step_1_caption'),
              },{
                backgroundColor: '#fff',
                title: localize('onboarding.step_2_heading'),
                image: <Image source={require('./assets/images/de/onboarding_2.png')} style={{ width: 300, height: 300 }} />,
                subtitle: localize('onboarding.step_2_caption'),
              },{
                backgroundColor: '#fff',
                title: localize('onboarding.step_3_heading'),
                image: <Image source={require('./assets/images/de/onboarding_3.png')} style={{ width: 300, height: 300 }} />,
                subtitle: localize('onboarding.step_3_caption'),
              },{
                backgroundColor: '#fff',
                title: localize('onboarding.step_4_heading'),
                image: <Image source={require('./assets/images/de/onboarding_4.png')} style={{ width: 300, height: 300 }} />,
                subtitle: localize('onboarding.step_4_caption'),
              },{
                backgroundColor: '#fff',
                title: localize('onboarding.step_5_heading'),
                image: <Image source={require('./assets/images/de/onboarding_5.png')} style={{ width: 300, height: 300 }} />,
                subtitle: localize('onboarding.step_5_caption'),
              },
            ]}
            onDone={finishOnboarding}
            onSkip={finishOnboarding}
          />
          </View>
      )
    } else {
      return (
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
              <Stack.Navigator>
                <Stack.Screen
                    name="Root"
                    component={BottomTabNavigator}
                    options={{
                      headerLeft: () => { return (<BluetoothToggle isOn={isBluetoothOn} setIsOn={setIsBluetoothOn}/>) },
                      headerRight: () => { return (<ShareButton/>) }
                    }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
});

AppRegistry.registerComponent('wirvsvirus', App);
