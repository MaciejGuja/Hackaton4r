import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useStore } from '../store/useStore';
import { uploadPDF } from '../api/backend';

export default function HomeScreen({ navigation }: any) {
  const setNotes = useStore((s) => s.setNotes);

  const handleUpload = async () => {
    try {
      // Placeholder for PDF upload - DocumentPicker will be added later when properly configured
      const data = await uploadPDF({
        uri: 'file://sample.pdf',
        name: 'sample.pdf',
        type: 'application/pdf',
      });

      if (data.notes && data.notes.length > 0) {
        setNotes(data.notes);
        Alert.alert('Gotowe', `Wg ${data.notes.length} nut wgrano.`);
      }
    } catch (error: any) {
      console.warn('Upload fail', error);
      Alert.alert('Błąd', 'Nie udało się przesłać PDF');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎹 Piano AI</Text>
      <Button title="Wgraj PDF" onPress={handleUpload} />
      <View style={styles.spacer} />
      <Button title="Start" onPress={() => navigation.navigate('Camera')} />
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
