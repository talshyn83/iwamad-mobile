import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSavedIds } from '../src/hooks/useSavedIds';

export default function HomeScreen() {
  const { savedIds } = useSavedIds();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Events</Text>
      <Text style={styles.subtitle}>Saved events: {savedIds.length}</Text>

      <Pressable
        onPress={() => router.push('/events')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Browse Events</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});