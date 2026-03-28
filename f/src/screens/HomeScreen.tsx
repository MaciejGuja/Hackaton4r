import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { uploadPDF, startSession } from '../api/backend';
import { useStore } from '../store/useStore';

export default function HomeScreen({ navigation }: any) {
  const setFileId = useStore((s) => s.setFileId);
  const delay = useStore((s) => s.delay);
  const setRoomId = useStore((s) => s.setRoomId);

  const [loading, setLoading] = useState(false);

  const handleUploadAndStart = async () => {
    try {
      setLoading(true);

      const file = await DocumentPicker.pickSingle({ type: 'application/pdf' });

      const uploadRes = await uploadPDF(file);
      console.log('UPLOAD:', uploadRes);

      setFileId(uploadRes.fileId);

      const session = await startSession(uploadRes.fileId, delay);
      console.log('SESSION:', session);

      if (!session.roomId) throw new Error('No roomId');

      setRoomId(session.roomId);

      navigation.navigate('Camera');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎹 Piano AI</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Wgraj PDF + Start" onPress={handleUploadAndStart} />
      )}

      <Button title="Ustawienia" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, marginBottom: 20 }
});