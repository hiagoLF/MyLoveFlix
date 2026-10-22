import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import CrownIcon from '@/assets/svg/icon/crown.svg';
import { Colors, Fonts } from '@/constants/theme';
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
        <Pressable
          onPress={() => onPressItem?.(item)}
          style={styles.card}
          accessibilityRole="button"
          accessibilityLabel={`Abrir ${item.title}, ${item.episodesAmount} episódios, ${item.averageEpisodeDurationMinutes} minutos por episódio`}>
          <View style={styles.posterWrap}>
            <Image source={{ uri: item.imageUrl }} style={styles.poster} />
            {item.isPro && (
              <View style={styles.proBadge}>
                <View pointerEvents="none" style={styles.proBadgeContent}>
                  <CrownIcon color={colors.textOnAccent} width={10} height={10} />
                  <Text style={styles.proText}>PRO</Text>
                </View>
              </View>
            )}
            <View pointerEvents="none" style={styles.posterFooter}>
              <View style={styles.posterFooterOverlay} />
              <View style={styles.posterMeta}>
                <Text style={styles.posterMetaText}>{item.episodesAmount} Eps</Text>
                <Text style={styles.posterMetaText}>{item.averageEpisodeDurationMinutes}m/ep</Text>
              </View>
            </View>
          </View>
          <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { gap: 16, paddingLeft: 16, paddingBottom: 5 },
  card: { width: 130 },
  posterWrap: { width: 130, height: 195, borderRadius: 4, overflow: 'hidden', backgroundColor: colors.backgroundElement },
  poster: { width: '100%', height: '100%' },
  proBadge: { position: 'absolute', top: 8, left: 9, borderRadius: 7, overflow: 'hidden', experimental_backgroundImage: colors.proBadgeGradient } as never,
  proBadgeContent: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 5, height: 15 },
  proText: { color: colors.textOnAccent, fontSize: 10, lineHeight: 12, fontWeight: '600' },
  posterFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 47, justifyContent: 'flex-end', paddingHorizontal: 9, paddingBottom: 8 },
  posterFooterOverlay: { ...StyleSheet.absoluteFill, experimental_backgroundImage: colors.backgroundGradient } as never,
  posterMeta: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  posterMetaText: { color: colors.textSecondary, fontSize: 10, lineHeight: 12 },
  title: { color: colors.textPrimary, marginTop: 10, fontFamily: Fonts.serif, fontSize: 14, lineHeight: 18, fontWeight: '700' },
});
