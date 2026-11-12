import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { CampusEvent } from '../data/events';

type Props = {
  event: CampusEvent;
  saved: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export function EventRow({ event, saved, onPress, onLongPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        {saved && <Text style={styles.savedBadge}>★ Saved</Text>}
      </View>
      <Text style={styles.meta}>
        {event.date} • {event.place}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cardPressed: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  savedBadge: {
    color: '#f59f00',
    fontWeight: '600',
  },
  meta: {
    marginTop: 4,
    color: '#666',
    fontSize: 13,
  },
});