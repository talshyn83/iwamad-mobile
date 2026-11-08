import { View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import eventsData from '../../src/data/events';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = eventsData.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Stack.Screen options={{ title: 'Not Found' }} />
        <Text>Event not found</Text>
        <Text>No event with id {id}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Stack.Screen options={{ title: event.title }} />
      <Text>{event.title}</Text>
      <Text>{event.date}</Text>
      <Text>{event.place}</Text>
      {event.seats && <Text>Seats: {event.seats}</Text>}
    </View>
  );
}