import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router'; // Добавлен импорт Link
import { router } from 'expo-router';

export default function HomeScreen() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello, World!</Text>
      <Text style={styles.heading}>Talshyn Saparkhan</Text>

      <Text style={styles.likesText}>Likes: {likes}</Text>
      <Pressable onPress={() => setLikes(likes + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      {/* Переместили Link внутрь View, сразу под кнопку Like */}
      <Link href="/events" asChild>
        <Pressable style={{ marginTop: 20, padding: 10, backgroundColor: '#ddd' }}>
          <Text>Events</Text>
        </Pressable>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  likesText: {
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});