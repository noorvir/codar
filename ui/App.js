import 'react-native-gesture-handler';
import * as React from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import i18n from 'i18n-js';

import Onboarding from 'react-native-onboarding-swiper';

// import * as Font from 'expo-font';

import {
  setCustomView,
  setCustomText,
} from 'react-native-global-props';

i18n.translations = {
  en: require("./translations/en.json"),
  de: require("./translations/de.json"),
};
// Set the locale once at the beginning of your app.
// TODO: set locale dynamically
i18n.locale = Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;;
i18n.fallbacks = true;

// Setting a default background color for all View components.

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  const finishOnboarding = () => {
    setIsInitialized(true)
    const _storeData = async () => {
        try {
            await AsyncStorage.setItem('onboardingFinsihed', 'true');
        } catch (error) {
            // Error saving data
            console.warn(error);
            console.warn("Couldn't store that Onboarding finished.")
        }
    }
    _storeData()
  }

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        setIsInitialized(await AsyncStorage.getItem('onboardingFinsihed'));

        // Load fonts
        // await Font.loadAsync({
        //   ...Ionicons.font,
        //   'ubuntu': require('./assets/fonts/Ubuntu-R.ttf'),
        // });
        setCustomText({
          style: {
            fontFamily: 'Ubuntu Regular' // light gray
          }
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        // SplashScreen.hide();
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
                backgroundColor: '#E5E5E5',
                title: i18n.t('onboarding.step_1_heading'),
                image: <Image source={require('./assets/images/onboarding_encounters.svg.png')} style={{ width: 300, height: 200 }} />,
                subtitle: i18n.t('onboarding.step_1_caption'),
              },{
                backgroundColor: '#E5E5E5',
                title: 'step_2',
                image: <Image source={require('./assets/images/onboarding_coffe_mug.svg.png')} style={{ width: 300, height: 200 }} />,
                subtitle: i18n.t('onboarding.step_2_caption'),
              },{
                backgroundColor: '#E5E5E5',
                title: 'step_3',
                image: <Image source={require('./assets/images/onboarding_coffe_mug.svg.png')} style={{ width: 300, height: 300 }} />,
                subtitle: i18n.t('onboarding.step_3_caption'),
              },{
                backgroundColor: '#fff',
                title: i18n.t('onboarding.step_4_heading'),
                image: <Image source={require('./assets/images/onboarding_coffe_mug.svg.png')} style={{ width: 300, height: 300 }} />,
                subtitle: i18n.t('onboarding.step_4_caption'),
              },
            ]}
            onDone={finishOnboarding}
          />
          </View>
      )
    } else {
      return (
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
              <Stack.Navigator>
                <Stack.Screen name="Root" component={BottomTabNavigator} />
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