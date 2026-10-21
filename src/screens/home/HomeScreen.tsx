import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BellIcon from '@/assets/svg/icon/bell.svg';
import GlassSearchIcon from '@/assets/svg/icon/glass-search.svg';
import HeartIcon from '@/assets/svg/icon/heart.svg';
import PlayIcon from '@/assets/svg/icon/play.svg';
import PlusIcon from '@/assets/svg/icon/plus.svg';
import StarIcon from '@/assets/svg/icon/star.svg';
import { AutoWidthMaskedView } from '@/components/AutoWidthMaskedView';
import { Colors } from '@/constants/theme';
import type { Series } from '@/mock/mock';
import { feedSections, genres, series } from '@/mock/mock';

import { HorizontalGenres } from './components/HorizontalGenres';
import { HorizontalMediaLista } from './components/HorizontalMediaLista';

const colors = Colors.dark;
const featured = series[0];

function openAvailableSoon() {
  router.push('/soon');
}

function openSeriesDetails(item: Series) {
  router.push({ pathname: '/series/[id]', params: { id: item.id } });
}

function IconButton({ children, label, onPress = openAvailableSoon, highlighted = false }: { children: React.ReactNode; label: string; onPress?: () => void; highlighted?: boolean }) {
  return (
    <Pressable onPress={onPress} style={[styles.iconButton, highlighted && styles.highlightedIconButton]} accessibilityRole="button" accessibilityLabel={label}>
      {children}
    </Pressable>
  );
}

export default function HomeScreen() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const { top } = useSafeAreaInsets();
  const filteredSeries = useMemo(() => selectedGenre === 'All' ? series : series.filter((item) => item.genres.includes(selectedGenre)), [selectedGenre]);
  const visibleSections = useMemo(() => feedSections.map((section) => ({
    ...section,
    items: filteredSeries.filter((item) => item.genres.includes(section.title) || section.subGenres.some((subGenre) => item.subGenres.includes(subGenre))),
  })), [filteredSeries]);

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingTop: top }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconButton label="Favoritos" highlighted><HeartIcon color={colors.accentText} width={18} height={17} /></IconButton>
          <View style={styles.headerActions}>
            <IconButton label="Buscar"><GlassSearchIcon color={colors.secondaryText} width={18} height={18} /></IconButton>
            <View style={styles.notificationButton}>
              <IconButton label="Notificações"><BellIcon color={colors.secondaryText} width={18} height={20} /></IconButton>
              <View style={styles.notificationDot} />
            </View>
            <Pressable onPress={openAvailableSoon} accessibilityRole="button" accessibilityLabel="Perfil" style={styles.avatarWrap}>
              <Image source={{ uri: 'https://picsum.photos/id/64/100/100.jpg' }} style={styles.avatar} />
            </Pressable>
          </View>
        </View>

        <View style={styles.featured}>
          <Image source={{ uri: featured.imageUrl }} style={StyleSheet.absoluteFill} />
          <View style={styles.featuredOverlay} />
          <View style={styles.featuredContent}>
            <View style={styles.featuredTags}>
              <View style={styles.spotlight}><Text style={styles.spotlightText}>SPOTLIGHT</Text></View>
              {[...featured.genres, ...featured.subGenres.slice(0, 1)].map((tag) => (
                <View style={styles.genreTag} key={tag}><View style={styles.genreDot} /><Text style={styles.tagText}>{tag}</Text></View>
              ))}
            </View>
            <Text style={styles.featuredTitle}>{featured.title}</Text>
            <Text style={styles.featuredDescription}>{featured.description}</Text>
            <View style={styles.featuredMeta}>
              <StarIcon color={colors.featuredMetaText} width={15} height={15} />
              <Text style={styles.metaText}>{featured.score.toFixed(1)}</Text>
              <View style={styles.metaSeparator} />
              <Text style={styles.metaText}>{featured.episodesAmount} episódios</Text>
            </View>
            <View style={styles.featuredActions}>
              <Pressable onPress={openAvailableSoon} style={styles.watchButton} accessibilityRole="button">
                <PlayIcon color={colors.buttonText} width={12} height={14} /><Text style={styles.watchLabel}>Ver agora</Text>
              </Pressable>
              <Pressable onPress={openAvailableSoon} style={styles.addButton} accessibilityRole="button" accessibilityLabel="Adicionar à lista">
                <PlusIcon color={colors.buttonVariantText} width={16} height={16} />
              </Pressable>
            </View>
          </View>
        </View>

        <HorizontalGenres items={genres} selected={selectedGenre} onSelect={setSelectedGenre} />

        {visibleSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeading}>
              {section.gradient ? (
                <AutoWidthMaskedView style={{ height: 24, experimental_backgroundImage: section.gradient }}>
                  <View style={styles.sectionHeadingMask}>
                    <View style={styles.sectionAccent} />
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>
                </AutoWidthMaskedView>
              ) : (
                <>
                  <View style={[styles.sectionAccent, { backgroundColor: section.color }]} />
                  <Text style={[styles.sectionTitle, { color: section.color }]}>{section.title}</Text>
                </>
              )}
            </View>
            {section.subGenres.map((subGenre) => {
              const items = section.items.filter((item) => item.subGenres.includes(subGenre));
              if (items.length === 0) return null;
              return (
                <View key={subGenre} style={styles.subSection}>
                  <Text style={styles.subTitle}>{subGenre}</Text>
                  <HorizontalMediaLista items={items} onPressItem={openSeriesDetails} />
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { paddingBottom: 24 },
  header: { paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  highlightedIconButton: { borderRadius: 6, backgroundColor: colors.accent },
  notificationButton: { position: 'relative' },
  notificationDot: { position: 'absolute', top: 4, right: 5, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accent },
  avatarWrap: { width: 40, height: 40, borderRadius: 40, overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' },
  featured: { width: '100%', height: 528, marginTop: 5, marginBottom: 16, overflow: 'hidden', backgroundColor: colors.backgroundElement, justifyContent: 'flex-end' },
  featuredOverlay: { ...StyleSheet.absoluteFill, backgroundColor: colors.featuredOverlayTint, experimental_backgroundImage: 'linear-gradient(180deg, #08080D33 0%, #08080d79 40%, #08080D 100%)' } as never,
  featuredContent: { paddingHorizontal: 24, paddingBottom: 24, gap: 11 },
  featuredTags: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 3 },
  spotlight: { borderRadius: 14, paddingHorizontal: 9, paddingVertical: 5, backgroundColor: colors.spotlightBackgroundTranslucent, borderWidth: 1, borderColor: colors.spotlightText },
  spotlightText: { color: colors.spotlightText, fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
  genreTag: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  genreDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.featuredGenreDot },
  featuredTitle: { color: colors.defaultText, fontSize: 34, lineHeight: 39, fontWeight: '800' },
  featuredDescription: { color: colors.featuredDescriptionText, fontSize: 13, lineHeight: 19, maxWidth: 330 },
  featuredMeta: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 1 },
  metaText: { color: colors.featuredMetaText, fontSize: 12, fontWeight: '600' },
  metaSeparator: { width: 4, height: 4, marginHorizontal: 2, backgroundColor: colors.featuredMetaSeparator },
  tagText: { color: colors.featuredDescriptionText, fontSize: 11, fontWeight: '500' },
  featuredActions: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 3 },
  watchButton: { height: 43, flex: 1, paddingHorizontal: 19, gap: 9, borderRadius: 23, backgroundColor: colors.buttonBackground, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  watchLabel: { color: colors.buttonText, fontSize: 13, fontWeight: '800' },
  addButton: { width: 43, height: 43, borderRadius: 23, backgroundColor: colors.buttonVariantBackground, borderWidth: 1, borderColor: colors.buttonVariantBorder, alignItems: 'center', justifyContent: 'center' },
  section: { marginTop: 22 },
  sectionHeading: { minWidth: 220, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 17, marginBottom: 13 },
  sectionHeadingMask: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  sectionAccent: { width: 24, height: 24, borderRadius: 2, backgroundColor: 'black' },
  sectionTitle: { color: colors.defaultText, fontSize: 20, fontWeight: '800' },
  subSection: { marginBottom: 17 },
  subTitle: { color: colors.secondaryText, fontSize: 14, fontWeight: '700', paddingHorizontal: 17, marginBottom: 9 },
});
