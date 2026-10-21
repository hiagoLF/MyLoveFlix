import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import CrownIcon from '@/assets/svg/icon/crown.svg';
import { AutoWidthMaskedView } from '@/components/AutoWidthMaskedView';
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
        <Pressable
          onPress={() => onPressItem?.(item)}
          style={styles.card}
          accessibilityRole="button"
          accessibilityLabel={`Abrir ${item.title}, ${item.episodesAmount} episódios, ${item.averageEpisodeDurationMinutes} minutos por episódio`}>
          <View style={styles.posterWrap}>
            <Image source={{ uri: item.imageUrl }} style={styles.poster} />
            {item.isPro && (
              <View style={styles.proBadge}>
                <AutoWidthMaskedView style={styles.proBadgeGradient}>
                  <View style={styles.proBadgeMask}>
                    <CrownIcon color={colors.defaultText} width={10} height={10} />
                    <Text style={styles.proText}>PRO</Text>
                  </View>
                </AutoWidthMaskedView>
                <View pointerEvents="none" style={styles.proBadgeContent}>
                  <CrownIcon color={colors.proBadgeText} width={10} height={10} />
                  <Text style={styles.proText}>PRO</Text>
                </View>
              </View>
            )}
            <View pointerEvents="none" style={styles.posterFooter}>
              <View style={styles.posterFooterOverlay} />
              <View style={styles.posterMeta}>
                <Text style={styles.posterMetaText}>{item.episodesAmount} eps</Text>
                <Text style={styles.posterMetaText}>{item.averageEpisodeDurationMinutes}m/ep</Text>
              </View>
            </View>
          </View>
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 16, gap: 12, paddingBottom: 5 },
  card: { width: 129 },
  posterWrap: { width: 129, height: 193, borderRadius: 10, overflow: 'hidden', backgroundColor: colors.backgroundElement },
  poster: { width: '100%', height: '100%' },
  proBadge: { position: 'absolute', top: 8, left: 8 },
  proBadgeMask: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, height: 15, borderRadius: 8, backgroundColor: colors.defaultText },
  proBadgeGradient: { ...StyleSheet.absoluteFill, experimental_backgroundImage: colors.proBadgeGradient } as never,
  proBadgeContent: { ...StyleSheet.absoluteFill, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8 },
  proText: { color: colors.proBadgeText, fontSize: 8, lineHeight: 10, fontWeight: '900', letterSpacing: 0.4 },
  posterFooter: { ...StyleSheet.absoluteFill, justifyContent: 'flex-end', paddingHorizontal: 8, paddingBottom: 8 },
  posterFooterOverlay: { ...StyleSheet.absoluteFill, experimental_backgroundImage: colors.mediaItemMetadataOverlayGradient } as never,
  posterMeta: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  posterMetaText: { color: colors.defaultText, fontSize: 10, lineHeight: 12, fontWeight: '700' },
  title: { color: colors.defaultText, marginTop: 10, fontSize: 12, lineHeight: 15, fontWeight: '600' },
});
