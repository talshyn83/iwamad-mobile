import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HolidayNote } from '../../src/components/HolidayNote';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: events, isPending, isError } = useEvents();

  if (isPending) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Loading event...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Could not load event</Text>
        <Pressable onPress={() => router.back()} style={styles.button}>
          <Text style={styles.buttonText}>Back to events</Text>
        </Pressable>
      </View>
    );
  }

  const event = events?.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Event not found</Text>
        <Text style={styles.muted}>No event with id {id}.</Text>
        <Pressable onPress={() => router.replace('/events')} style={styles.button}>
          <Text style={styles.buttonText}>Back to events</Text>
        </Pressable>
      </View>
    );
  }

  const extraFields = Object.entries(event).filter(
    ([key, val]) => !['id', 'title', 'date'].includes(key) && val !== undefined && val !== ''
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>

      <Text style={styles.meta}>{event.date}</Text>
      <HolidayNote date={event.date} />

      {extraFields.map(([key, val]) => (
        <Text key={key} style={styles.description}>
          {String(val)}
        </Text>
      ))}

      <Pressable onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  meta: {
    fontSize: 15,
    color: '#555',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#222',
    marginTop: 12,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  muted: {
    fontSize: 15,
    color: '#666',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});