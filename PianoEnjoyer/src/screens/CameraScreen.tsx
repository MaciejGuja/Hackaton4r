import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useStore } from '../store/useStore';
import { sendFrameToAI } from '../api/backend';
import ArOverlay from '../components/ArOverlay';

export default function CameraScreen() {
  const notes = useStore((s) => s.notes);
  const delay = useStore((s) => s.delay);
  const currentTime = useStore((s) => s.currentTime);
  const keyboardCoords = useStore((s) => s.keyboardCoords);
  const setCurrentTime = useStore((s) => s.setCurrentTime);
  const setKeyboardCoords = useStore((s) => s.setKeyboardCoords);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => prev + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [setCurrentTime]);

  useEffect(() => {
    const aiInterval = setInterval(async () => {
      const { coords } = await sendFrameToAI('frame_base64');
      setKeyboardCoords(coords);
    }, 1000);

    return () => clearInterval(aiInterval);
  }, [setKeyboardCoords]);

  const delaySeconds = delay / 1000;
  const activeNotes = notes.filter(
    (n) => n.time >= currentTime && n.time <= currentTime + delaySeconds,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎥 Kamera + AR</Text>
      <Text>currentTime: {currentTime.toFixed(1)}s</Text>
      <Text>delay: {delay} ms</Text>

      <Text style={styles.sectionTitle}>Aktywne nuty:</Text>
      <FlatList
        data={activeNotes}
        keyExtractor={(item, index) => `${item.pitch}-${item.time}-${index}`}
        renderItem={({ item }) => (
          <Text style={styles.noteItem}>{item.pitch} @ {item.time.toFixed(1)}s</Text>
        )}
        ListEmptyComponent={<Text>Brak aktualnych nut</Text>}
      />

      <ArOverlay notes={keyboardCoords} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 24 },
  title: { fontSize: 24, marginBottom: 8 },
  sectionTitle: { marginTop: 12, fontWeight: '600' },
  noteItem: { fontSize: 16 },
});
