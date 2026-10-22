import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BellIcon from '@/assets/svg/icon/bell.svg';
import GlassSearchIcon from '@/assets/svg/icon/glass-search.svg';
import HeartIcon from '@/assets/svg/icon/heart.svg';
import PlayIcon from '@/assets/svg/icon/play.svg';
import PlusIcon from '@/assets/svg/icon/plus.svg';
import StarIcon from '@/assets/svg/icon/star.svg';
import { AutoWidthMaskedView } from '@/components/AutoWidthMaskedView';
import { Colors, Fonts } from '@/constants/theme';
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
    <TouchableOpacity onPress={onPress} style={[styles.iconButton, highlighted && styles.highlightedIconButton]} accessibilityRole="button" accessibilityLabel={label}>
      {children}
    </TouchableOpacity>
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
          <IconButton label="Favorites" highlighted><HeartIcon color={colors.textOnAccent} width={18} height={17} /></IconButton>
          <View style={styles.headerActions}>
            <IconButton label="Search"><GlassSearchIcon color={colors.textPrimary} width={18} height={18} /></IconButton>
            <View style={styles.notificationButton}>
              <IconButton label="Notifications"><BellIcon color={colors.textPrimary} width={18} height={20} /></IconButton>
              <View style={styles.notificationDot} />
            </View>
            <TouchableOpacity onPress={openAvailableSoon} accessibilityRole="button" accessibilityLabel="Profile" style={styles.avatarWrap}>
              <Image source={{ uri: 'https://picsum.photos/id/64/100/100.jpg' }} style={styles.avatar} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.featured}>
          <Image source={{ uri: featured.imageUrl }} style={StyleSheet.absoluteFill} />
          <View style={styles.featuredOverlay} />
          <View style={styles.featuredContent}>
            <View style={styles.featuredTags}>
              <View style={styles.spotlight}><Text style={styles.spotlightText}>Spotlight</Text></View>
              {[...featured.genres, ...featured.subGenres.slice(0, 1)].map((tag, index) => (
                <View style={styles.genreTag} key={tag}>{index > 0 && <View style={styles.genreDot} />}<Text style={styles.tagText}>{tag}</Text></View>
              ))}
            </View>
            <Text style={styles.featuredTitle}>{featured.title}</Text>
            <Text style={styles.featuredDescription}>{featured.description}</Text>
            <View style={styles.featuredMeta}>
              <StarIcon color={colors.featuredMetaText} width={15} height={15} />
              <Text style={[styles.metaText, { color: colors.textPrimary }]}>{featured.score.toFixed(1)}</Text>
              <View style={styles.metaSeparator} />
              <Text style={styles.metaText}>{featured.episodesAmount} episodes</Text>
            </View>
            <View style={styles.featuredActions}>
              <TouchableOpacity onPress={() => router.push('/player')} style={styles.watchButton} accessibilityRole="button">
                <PlayIcon color={colors.textOnAccent} width={12} height={14} /><Text style={styles.watchLabel}>Watch now</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openAvailableSoon} style={styles.addButton} accessibilityRole="button" accessibilityLabel="Add to list">
                <PlusIcon color={colors.buttonVariantText} width={16} height={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <HorizontalGenres items={genres} selected={selectedGenre} onSelect={setSelectedGenre} />

        {visibleSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeading}>
              {section.gradient ? (
                <>
                  <View style={[styles.sectionAccent, { backgroundColor: colors.accent }]} />
                  <AutoWidthMaskedView style={{ experimental_backgroundImage: section.gradient }}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </AutoWidthMaskedView>
                </>
              ) : (
                <>
                  <View style={[styles.sectionAccent, { backgroundColor: colors.textPrimary }]} />
                  <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{section.title}</Text>
                </>
              )}
            </View>
            {section.subGenres.map((subGenre) => {
              const items = section.items.filter((item) => item.subGenres.includes(subGenre));
              if (items.length === 0) return null;
              return (
                <View key={subGenre} style={styles.subSection}>
                  <View style={styles.subHeading}>
                    <Text style={styles.subTitle}>{subGenre}</Text>
                    <TouchableOpacity onPress={openAvailableSoon} accessibilityRole="button" accessibilityLabel={`See all ${subGenre}`} hitSlop={8}>
                      <Text style={styles.seeAll}>See all</Text>
                    </TouchableOpacity>
                  </View>
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
  screen: { flex: 1, backgroundColor: colors.screenBackgroundStrong },
  scroll: { flex: 1 },
  content: { paddingBottom: 80 },
  header: { paddingHorizontal: 16, minHeight: 52, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  iconButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  highlightedIconButton: { borderRadius: 7, backgroundColor: colors.accent },
  notificationButton: { position: 'relative' },
  notificationDot: { position: 'absolute', top: 4, right: 5, width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent },
  avatarWrap: { width: 32, height: 32, borderRadius: 16, overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' },
  featured: { width: '100%', minHeight: 520, marginBottom: 16, overflow: 'hidden', backgroundColor: colors.backgroundElement, justifyContent: 'flex-end' },
  featuredOverlay: { ...StyleSheet.absoluteFill, experimental_backgroundImage: colors.backdropOverlayGradient } as never,
  featuredContent: { paddingHorizontal: 24, paddingTop: 160, paddingBottom: 24 },
  featuredTags: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  spotlight: { borderRadius: 11, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: colors.spotlightBackgroundTranslucent, borderWidth: 1, borderColor: colors.spotlightText },
  spotlightText: { color: colors.spotlightText, fontSize: 12, fontWeight: '600' },
  genreTag: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  genreDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.featuredMetaSeparator },
  featuredTitle: { color: colors.textPrimary, fontFamily: Fonts.serif, fontSize: 36, lineHeight: 42, fontWeight: '700', marginTop: 16 },
  featuredDescription: { color: colors.textSecondary, fontSize: 14, lineHeight: 20, marginTop: 8 },
  featuredMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 },
  metaText: { color: colors.textSecondary, fontSize: 14 },
  metaSeparator: { width: 4, height: 4, marginHorizontal: 2, backgroundColor: colors.featuredMetaSeparator },
  tagText: { color: colors.textSecondary, fontSize: 12 },
  featuredActions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 24 },
  watchButton: { minHeight: 48, flex: 1, paddingHorizontal: 19, paddingVertical: 12, gap: 16, borderRadius: 24, backgroundColor: colors.buttonBackground, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', boxShadow: colors.accentGlowShadow },
  watchLabel: { color: colors.textOnAccent, fontSize: 14, fontWeight: '700', flexShrink: 1 },
  addButton: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: colors.borderSubtle, alignItems: 'center', justifyContent: 'center' },
  section: { marginTop: 28 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 16, marginBottom: 36 },
  sectionAccent: { width: 24, height: 24 },
  sectionTitle: { color: colors.textPrimary, fontFamily: Fonts.serif, fontSize: 24, lineHeight: 29, fontWeight: '700', flexShrink: 1 },
  subSection: { marginBottom: 72 },
  subHeading: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, paddingHorizontal: 16, marginBottom: 14 },
  subTitle: { color: colors.textPrimary, fontFamily: Fonts.serif, fontSize: 18, lineHeight: 22, fontWeight: '700', flexShrink: 1 },
  seeAll: { color: colors.accent, fontSize: 12 },
});
