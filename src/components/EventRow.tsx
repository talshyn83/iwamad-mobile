import { Pressable, Text, StyleSheet } from 'react-native';

type EventRowProps = {
  event: { id: number; title: string; date: string; place: string; seats?: number };
  onPress: () => void;
  onLongPress: () => void;
  isSaved?: boolean;
};

export default function EventRow({ event, onPress, onLongPress, isSaved }: EventRowProps) {
  return (
    <Pressable 
      onPress={onPress} 
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text>{event.title} {isSaved ? '★ Saved' : ''}</Text>
      <Text>{event.date} - {event.place}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cardPressed: {
    backgroundColor: '#e0e0e0', // Цвет меняется при нажатии
  },
});