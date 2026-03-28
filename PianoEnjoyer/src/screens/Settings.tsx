import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useStore } from '../store/useStore';

export default function Settings() {
  const delay = useStore((s) => s.delay);
  const setDelay = useStore((s) => s.setDelay);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Opóźnienie: {delay} ms</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2000}
        step={50}
        value={delay}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1a9274"
        onValueChange={(value) => setDelay(Math.floor(value))}
      />
      <Text style={styles.hint}>Wynik jest uwzględniany w logice odtwarzania nut w CameraScreen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  label: { fontSize: 18, marginBottom: 20 },
  slider: { width: '100%', height: 40 },
  hint: { textAlign: 'center', marginTop: 12, color: '#555' },
});
