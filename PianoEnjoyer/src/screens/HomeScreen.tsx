import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { uploadPDF, startSession } from '../api/backend';
import { useStore } from '../store/useStore';

export default function HomeScreen({ navigation }: any) {
  const setFileId = useStore((s) => s.setFileId);
  const delay = useStore((s) => s.delay);
  const setRoomId = useStore((s) => s.setRoomId);

  const handleUploadAndStart = async () => {
    try {
      const file = await DocumentPicker.pickSingle({ type: 'application/pdf' });
      const uploadRes = await uploadPDF(file);
      setFileId(uploadRes.fileId);

      const session = await startSession(uploadRes.fileId, delay);
      if (session.roomId) {
        setRoomId(session.roomId);
      }

      navigation.navigate('Camera');
    } catch (e) {
      console.error(e);
      Alert.alert('Błąd', 'Nie udało się rozpocząć sesji');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎹 Piano AI</Text>
      <Button title="Wgraj PDF + Start" onPress={handleUploadAndStart} />
      <View style={styles.spacer} />
      <Button title="Ustawienia" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  title: { fontSize: 28, marginBottom: 20 },
  spacer: { height: 12 },
});
