import React from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardCoord } from '../store/useStore';

type ArOverlayProps = {
  notes: KeyboardCoord[];
};

export default function ArOverlay({ notes }: ArOverlayProps) {
  return (
    <View style={styles.overlay} pointerEvents="none">
      {notes.map((n, i) => (
        <View
          key={`${n.pitch ?? 'key'}-${i}`}
          style={[
            styles.noteBox,
            {
              left: n.x,
              top: n.y,
              width: n.width ?? 24,
              height: n.height ?? 24,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  noteBox: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 255, 0, 0.35)',
    borderWidth: 1,
    borderColor: 'lime',
    borderRadius: 4,
  },
});
