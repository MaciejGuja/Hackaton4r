import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useStore } from '../store/useStore';
import { stopSession } from '../api/backend';

export default function CameraScreen() {
  const roomId = useStore((s) => s.roomId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎥 Kamera / AR</Text>
      <Text>Room: {roomId}</Text>
      <Text>Backend renderuje nuty (Smelter)</Text>

      <Button title="Stop" onPress={stopSession} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 10 }
});import React from 'react';
   import { View, Text, Button, StyleSheet } from 'react-native';
   import { useStore } from '../store/useStore';
   import { stopSession } from '../api/backend';

   export default function CameraScreen() {
     const roomId = useStore((s) => s.roomId);

     return (
       <View style={styles.container}>
         <Text style={styles.title}>🎥 Kamera / AR</Text>
         <Text>Room: {roomId}</Text>
         <Text>Backend renderuje nuty (Smelter)</Text>

         <Button title="Stop" onPress={stopSession} />
       </View>
     );
   }

   const styles = StyleSheet.create({
     container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
     title: { fontSize: 20, marginBottom: 10 }
   });