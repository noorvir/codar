import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-elements';

const cardStyle = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 5,
  },
  textContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: '#fff'
  },
  numberContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  number: {
    fontSize: 50,
    color: '#fff'
  },
});

export default function EncounterCard({ containerStyle, title, count, displayZero }) {
  if (!displayZero && count === 0) {
    return null;
  }

  return (
    <Card containerStyle={containerStyle}>
      <View style={cardStyle.container}>
        <View style={cardStyle.textContainer}>
          <Text style={cardStyle.text}>{title}</Text>
        </View>
        <View style={cardStyle.numberContainer}>
          <Text style={cardStyle.number}>{count}</Text>
        </View>
      </View>
    </Card>
  )
}