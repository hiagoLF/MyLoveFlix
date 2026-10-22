import { FlatList, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

const colors = Colors.dark;

type Props = { items: string[]; selected: string; onSelect: (item: string) => void };

export function HorizontalGenres({ items, selected, onSelect }: Props) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={items}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const active = item === selected;
        return (
          <TouchableOpacity onPress={() => onSelect(item)} accessibilityRole="button" accessibilityState={{ selected: active }}>
            <View style={[styles.chip, active && styles.activeChip]}>
              <Text style={[styles.label, active && styles.activeLabel]}>{item}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 16, gap: 8, paddingBottom: 0 },
  chip: { paddingHorizontal: 16, height: 34, borderRadius: 17, borderWidth: 1, borderColor: colors.borderSubtle, backgroundColor: colors.tagBackground, alignItems: 'center', justifyContent: 'center' },
  activeChip: { borderColor: colors.accent, backgroundColor: colors.accent },
  label: { color: colors.secondaryText, fontSize: 14 },
  activeLabel: { color: colors.textOnAccent },
});
