import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

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
          <Pressable onPress={() => onSelect(item)} accessibilityRole="button" accessibilityState={{ selected: active }}>
            <View style={[styles.chip, active && styles.activeChip]}>
              <Text style={[styles.label, active && styles.activeLabel]}>{item}</Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 16, gap: 9, paddingBottom: 3 },
  chip: { paddingHorizontal: 17, height: 36, borderRadius: 20, borderWidth: 1, borderColor: colors.buttonVariantBorder, backgroundColor: colors.tagBackground, alignItems: 'center', justifyContent: 'center' },
  activeChip: { borderColor: colors.accent, backgroundColor: colors.accent },
  label: { color: colors.secondaryText, fontSize: 12, fontWeight: '600' },
  activeLabel: { color: colors.accentText },
});
