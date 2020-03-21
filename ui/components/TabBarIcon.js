import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {

  return (
      <Icon
          name={props.name}
          type='font-awesome'
          style={ {marginBottom: -3} }
          color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
  );
}
