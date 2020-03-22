import { useLinking } from '@react-navigation/native';
import { Linking } from "react-native";

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.openURL('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Home: 'home',
          Links: 'links',
          Settings: 'settings',
        },
      },
    },
  });
}
