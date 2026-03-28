import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useStore } from '../store/useStore';

export default function Settings() {
  const delay = useStore((s) => s.delay);
  const setDelay = useStore((s) => s.setDelay);

  return (
    <View style={styles.container}>
      <Text>Opóźnienie: {delay} ms</Text>
      <Slider
        minimumValue={0}
        maximumValue={2000}
        value={delay}
        onValueChange={setDelay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});