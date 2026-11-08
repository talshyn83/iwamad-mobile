import { useState } from 'react';
import { FlatList, View, Text, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import eventsData from '../../src/data/events';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  // 1. Состояние для текста поиска
  const [search, setSearch] = useState('');

  const handleLongPress = (id: number) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((savedId) => savedId !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  // 2. Фильтруем события при каждом рендере (без учета регистра)
  const filteredEvents = eventsData.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text>Long-press an event to save it. Saved: {savedIds.length}</Text>
      
      {/* 3. Контролируемое поле поиска с точным placeholder */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search events"
        value={search}
        onChangeText={setSearch}
      />
      
      <FlatList
        data={filteredEvents} // Передаем отфильтрованные данные
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            isSaved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => handleLongPress(item.id)}
          />
        )}
        // 4. Текст, если список пуст
        ListEmptyComponent={<Text>No events match.</Text>}
      />
    </View>
  );
}

// Добавили немного стилей для поля ввода
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    minHeight: 44, // Минимальная высота для удобного нажатия
  },
});