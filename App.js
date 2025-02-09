import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNav from './src/Navigation';

export default function App() {
  return (
    <View style={{flex:1}}>
      <RootNav/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
