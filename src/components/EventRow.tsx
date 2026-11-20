import { Pressable, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import { CampusEvent } from '../data/events';

type Props = {
  event: CampusEvent;
  saved: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export function EventRow({ event, saved, onPress, onToggleSaved }: Props) {
  const details = Object.entries(event)
    .filter(([key, val]) => !['id', 'title', 'date'].includes(key) && typeof val === 'string')
    .map(([, val]) => val)
    .join(' · ');

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.row, pressed && styles.pressed]}
        >
          <View style={styles.info}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.meta}>
              {event.date}{details ? ` · ${details}` : ''}
            </Text>
          </View>
          {saved && (
            <Animated.Text entering={ZoomIn} style={styles.badge}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pressed: {
    backgroundColor: '#f5f5f5',
  },
  info: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  badge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#d97706',
  },
  action: {
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
    width: 84,
    minHeight: 44,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});