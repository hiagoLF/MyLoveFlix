import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import CrownIcon from '@/assets/svg/icon/crown.svg';
import StarIcon from '@/assets/svg/icon/star.svg';
import { Colors } from '@/constants/theme';
import type { Series } from '@/mock/mock';

const colors = Colors.dark;

type Props = { items: Series[]; onPressItem?: (item: Series) => void };

export function HorizontalMediaLista({ items, onPressItem }: Props) {
  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressItem?.(item)} style={styles.card} accessibilityRole="button" accessibilityLabel={`Abrir ${item.title}`}>
          <View style={styles.posterWrap}>
            <Image source={{ uri: item.imageUrl }} style={styles.poster} />
            {item.isPro && (
              <View style={styles.proBadge}>
                <CrownIcon color={colors.proBadgeText} width={12} height={11} />
                <Text style={styles.proText}>PRO</Text>
              </View>
            )}
          </View>
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
          <View style={styles.meta}>
            <StarIcon color={colors.accent} width={12} height={12} />
            <Text style={styles.metaText}>{item.score.toFixed(1)}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{item.episodesAmount} eps</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 16, gap: 12, paddingBottom: 5 },
  card: { width: 132 },
  posterWrap: { width: 132, height: 188, borderRadius: 10, overflow: 'hidden', backgroundColor: colors.backgroundElement },
  poster: { width: '100%', height: '100%' },
  proBadge: { position: 'absolute', top: 7, left: 7, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 7, paddingVertical: 4, borderRadius: 5, backgroundColor: colors.proBadgeBackground },
  proText: { color: colors.proBadgeText, fontSize: 9, fontWeight: '800', letterSpacing: 0.4 },
  title: { color: colors.defaultText, marginTop: 8, fontSize: 13, fontWeight: '600' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  metaText: { color: colors.secondaryText, fontSize: 11 },
  metaDot: { color: colors.mutedText, fontSize: 11 },
});
