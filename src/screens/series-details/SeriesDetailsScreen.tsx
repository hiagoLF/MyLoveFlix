import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Image, TouchableOpacity, ScrollView, StyleSheet, Text, TextProps, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ArrowLeftIcon from '@/assets/svg/icon/arrow-left.svg';
import ArrowRightIcon from '@/assets/svg/icon/arrow-right.svg';
import ClockIcon from '@/assets/svg/icon/clock.svg';
import FireIcon from '@/assets/svg/icon/fire.svg';
import HeartIcon from '@/assets/svg/icon/heart.svg';
import LockIcon from '@/assets/svg/icon/lock.svg';
import PlayIcon from '@/assets/svg/icon/play.svg';
import PlaylistIcon from '@/assets/svg/icon/playlist.svg';
import ShareIcon from '@/assets/svg/icon/share.svg';
import ShineStarIcon from '@/assets/svg/icon/shine-star.svg';
import StarIcon from '@/assets/svg/icon/star.svg';
import { Colors, Fonts } from '@/constants/theme';
import { defaultSeriesSynopsis, type Series } from '@/mock/mock';
import { seriesEpisodes } from '@/mock/seriesEpisodes';
import { useMockData } from '@/mock/useMockData';

const colors = Colors.dark;

const castAndCrew = [
  { name: 'Sofia Chen', role: 'Luna', imageUrl: 'https://picsum.photos/id/1027/180/180.jpg' },
  { name: 'Ethan Cole', role: 'Adrian', imageUrl: 'https://picsum.photos/id/1005/180/180.jpg' },
  { name: 'Maya Brooks', role: 'Nina', imageUrl: 'https://picsum.photos/id/1011/180/180.jpg' },
  { name: 'Lucas Reed', role: 'Director', imageUrl: 'https://picsum.photos/id/1001/180/180.jpg' },
  { name: 'Ava Morgan', role: 'Writer', imageUrl: 'https://picsum.photos/id/1012/180/180.jpg' },
];

const recommendationIds = ['s02', 's03', 's04', 's05', 's06', 's07', 's08', 's09'];

function SectionHeading({ children, style }: Omit<TextProps, "ref">) {
  return <Text style={[styles.sectionHeading, style]}>{children}</Text>;
}

function openAvailableSoon() {
  router.push('/soon');
}

function IconButton({ children, label, onPress = openAvailableSoon, transparent = false }: { children: React.ReactNode; label: string; onPress?: () => void; transparent?: boolean }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.iconButton, transparent && styles.transparentButton]} accessibilityRole="button" accessibilityLabel={label}>
      {children}
    </TouchableOpacity>
  );
}

export default function SeriesDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { series, getSeriesById, toggleFavorite } = useMockData();
  const { top, bottom } = useSafeAreaInsets();
  const selectedSeries = getSeriesById(id);
  const recommendations = useMemo(
    () => recommendationIds
      .map((recommendationId) => series.find((item) => item.id === recommendationId))
      .filter((item): item is Series => !!item && item.id !== id),
    [series, id],
  );

  if (!selectedSeries) {
    return (
      <View style={[styles.notFound, { paddingTop: top + 24 }]}>
        <Text style={styles.notFoundText}>We couldn’t find this series.</Text>
        <TouchableOpacity onPress={() => router.back()} accessibilityRole="button">
          <Text style={styles.backLabel}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const favoriteLabel = selectedSeries.isFavorite ? 'Remove from favorites' : 'Add to favorites';
  const toggleCurrentFavorite = () => toggleFavorite(selectedSeries.id);
  const openPlayer = (episodeNumber?: number) => router.push({
    pathname: '/player' as never,
    params: episodeNumber ? { episodeNumber: String(episodeNumber) } : undefined,
  });

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: bottom }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={{ uri: selectedSeries.imageUrl }} style={StyleSheet.absoluteFill} resizeMode="cover" />
          <View pointerEvents="none" style={styles.heroOverlay} />

          <View style={[styles.topActions, { paddingTop: top + 8 }]}>
            <IconButton transparent label="Go back" onPress={() => router.back()}>
              <ArrowLeftIcon color={colors.textPrimary} width={20} height={20} />
            </IconButton>
            <View style={styles.topActionGroup}>
              <IconButton label={favoriteLabel} onPress={toggleCurrentFavorite}>
                <HeartIcon color={selectedSeries.isFavorite ? colors.accent : colors.defaultText} width={21} height={19} />
              </IconButton>
              <IconButton label="Share series">
                <ShareIcon color={colors.textPrimary} width={19} height={19} />
              </IconButton>
            </View>
          </View>

          <View style={styles.heroContent}>
            <View style={styles.pills}>
              {selectedSeries.genres.map((genre) => <View style={styles.genrePill} key={genre}><Text style={styles.pillText}>{genre}</Text></View>)}
              {selectedSeries.subGenres.map((genre) => <View style={styles.subGenrePill} key={genre}><Text style={styles.subGenreText}>{genre}</Text></View>)}
            </View>
            <Text style={styles.title}>{selectedSeries.title}</Text>
            <View style={styles.metadata}>
              <View style={styles.rating}>
                <StarIcon color={colors.textPrimary} width={16} height={16} />
                <Text style={styles.metadataText}>{selectedSeries.score.toFixed(1)}</Text>
                <Text style={styles.reviewCount}>(12k)</Text>
              </View>
              <View style={styles.metadataDot} />
              <Text style={styles.metadataText}>{selectedSeries.releaseYear}</Text>
              <View style={styles.metadataDot} />
              <View style={styles.episodeCount}>
                <PlaylistIcon color={colors.secondaryText} width={14} height={14} />
                <Text style={styles.metadataText}>{selectedSeries.episodesAmount} Eps</Text>
              </View>
            </View>
            <View style={styles.primaryActions}>
              <TouchableOpacity onPress={() => openPlayer()} style={styles.playButton} accessibilityRole="button" accessibilityLabel="Play series">
                <PlayIcon color={colors.textOnAccent} width={12} height={14} />
                <Text style={styles.playLabel}>Play Ep 1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleCurrentFavorite} style={[styles.favoriteButton, selectedSeries.isFavorite && styles.favoriteButtonActive]} accessibilityRole="button" accessibilityLabel={favoriteLabel}>
                <HeartIcon color={selectedSeries.isFavorite ? colors.accent : colors.defaultText} width={18} height={17} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeading>Synopsis</SectionHeading>
          <Text style={styles.synopsis}>{defaultSeriesSynopsis}</Text>
          <View style={styles.loveCard}>
            <View style={styles.loveHeading}>
              <ShineStarIcon color={colors.spotlightText} width={16} height={16} />
              <Text style={styles.loveTitle}>Why you’ll love it</Text>
            </View>
            <View style={styles.loveItem}>
              <FireIcon color={colors.accent} width={14} height={20} />
              <Text style={styles.loveDetail}>Intense chemistry from the very first frame.</Text>
            </View>
            <View style={styles.loveItem}>
              <FireIcon color={colors.accent} width={14} height={20} />
              <Text style={styles.loveDetail}>A gripping double-life narrative with high stakes.</Text>
            </View>
          </View>
        </View>

        <View style={styles.castSection}>
          <SectionHeading style={styles.castHeading}>Cast &amp; Crew</SectionHeading>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.peopleList}>
            {castAndCrew.map((person) => (
              <View style={styles.person} key={person.name}>
                <Image source={{ uri: person.imageUrl }} style={styles.personImage} />
                <Text numberOfLines={1} style={styles.personName}>{person.name}</Text>
                <Text numberOfLines={1} style={styles.personRole}>{person.role}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.episodesHeadingRow}>
            <View style={styles.episodesTitleGroup}>
              <SectionHeading style={styles.headingWithoutMargin}>Episodes</SectionHeading>
              <View style={styles.countBadge}><Text style={styles.reviewCount}>{selectedSeries.episodesAmount}</Text></View>
            </View>
            <TouchableOpacity onPress={openAvailableSoon} accessibilityRole="button"><Text style={styles.sortLabel}>Sort</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={openAvailableSoon} accessibilityRole="button" style={styles.unlockCard}>
            <View style={styles.unlockCopy}>
              <Text style={styles.unlockTitle}>Unlock Full Season</Text>
              <Text style={styles.unlockSubtitle}>Save 40% with the bundle</Text>
            </View>
            <View style={styles.priceBadge}><Text style={styles.priceLabel}>€9.99</Text></View>
          </TouchableOpacity>

          <View style={styles.episodeList}>
            {seriesEpisodes.map((episode) => (
              <TouchableOpacity
                key={episode.number}
                onPress={episode.locked
                  ? () => router.push({ pathname: '/unlock-episode', params: { id: selectedSeries.id, episodeNumber: String(episode.number) } })
                  : () => openPlayer(episode.number)}
                accessibilityRole="button"
                accessibilityLabel={`Episode ${episode.number}${episode.locked ? ', locked' : ''}`}
                style={styles.episodeRow}
              >
                <View style={styles.episodeThumbnailWrap}>
                  <Image source={{ uri: `https://picsum.photos/id/${episode.imageId}/240/140.jpg` }} style={styles.episodeThumbnail} />
                  <View style={styles.thumbnailShade} />
                  <View style={[styles.episodePlayButton, !episode.locked && styles.availablePlayButton]}>
                    {episode.locked
                      ? <LockIcon color={colors.textPrimary} width={13} height={13} />
                      : <PlayIcon color={colors.textOnAccent} width={10} height={12} />}
                  </View>
                </View>
                <View style={styles.episodeCopy}>
                  <Text style={styles.episodeTitle}>{episode.number}. {episode.title}</Text>
                  <View style={styles.episodeMeta}>
                    <ClockIcon color={colors.secondaryText} width={12} height={12} />
                    <Text style={styles.episodeDuration}>{episode.duration}</Text>
                    {episode.locked && <>
                      <Text style={styles.episodeUnlock}>Unlock</Text>
                      <LockIcon color={colors.spotlightText} width={12} height={12} />
                    </>}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={openAvailableSoon} accessibilityRole="button" style={styles.showMoreButton}>
            <Text style={styles.showMoreLabel}>Show more episodes</Text>
            <ArrowRightIcon color={colors.secondaryText} width={12} height={12} />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, styles.recommendationSection]}>
          <SectionHeading style={styles.recommendationHeading}>You might also like</SectionHeading>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recommendationList}>
            {recommendations.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => router.push({ pathname: '/series/[id]', params: { id: item.id } })} style={styles.recommendationCard} accessibilityRole="button" accessibilityLabel={`View ${item.title}`}>
                <Image source={{ uri: item.imageUrl }} style={styles.recommendationImage} />
                <Text numberOfLines={2} style={styles.recommendationTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.screenBackgroundStrong },
  hero: { minHeight: 490, justifyContent: 'space-between', backgroundColor: colors.screenBackgroundStrong },
  heroOverlay: { ...StyleSheet.absoluteFill, experimental_backgroundImage: colors.backdropFadeGradient },
  topActions: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  topActionGroup: { flexDirection: 'row', gap: 12 },
  iconButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.scrimBackground },
  transparentButton: { backgroundColor: 'transparent', alignItems: 'flex-start' },
  heroContent: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 100, gap: 16 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  genrePill: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 16, backgroundColor: colors.variantBackgroundTranslucent, borderWidth: 1, borderColor: colors.surfaceBorder },
  subGenrePill: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 16, borderWidth: 1, borderColor: colors.surfaceBorder, backgroundColor: colors.variantBackgroundTranslucent },
  pillText: { color: colors.textPrimary, fontSize: 10, lineHeight: 12 },
  subGenreText: { color: colors.textPrimary, fontSize: 10, lineHeight: 12 },
  title: { color: colors.textPrimary, fontFamily: Fonts.serif, fontSize: 30, lineHeight: 36, fontWeight: '700' },
  metadata: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  episodeCount: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metadataText: { color: colors.textPrimary, fontSize: 14 },
  reviewCount: { color: colors.secondaryText, fontSize: 12 },
  metadataDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.surfaceBorder },
  primaryActions: { flexDirection: 'row', gap: 12 },
  playButton: { flex: 1, height: 48, borderRadius: 24, backgroundColor: colors.buttonBackground, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: colors.accentGlowShadow },
  playLabel: { color: colors.textOnAccent, fontSize: 16, fontWeight: '700' },
  favoriteButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.screenBackgroundStrong, borderWidth: 1, borderColor: colors.surfaceBorder, alignItems: 'center', justifyContent: 'center' },
  favoriteButtonActive: { backgroundColor: colors.accentBackgroundTranslucent, borderColor: colors.accentBorderTranslucent },
  section: { paddingTop: 24, paddingHorizontal: 20 },
  sectionHeading: { color: colors.textPrimary, fontFamily: Fonts.serif, fontSize: 18, lineHeight: 23, fontWeight: '700', marginBottom: 16 },
  synopsis: { color: colors.secondaryText, fontSize: 14, lineHeight: 23 },
  loveCard: { marginTop: 16, borderRadius: 14, padding: 16, gap: 10, backgroundColor: colors.surfaceSubtle, borderWidth: 1, borderColor: colors.borderMuted },
  loveHeading: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  loveItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  loveTitle: { color: colors.textPrimary, fontFamily: Fonts.serif, fontSize: 14, fontWeight: '700' },
  loveDetail: { flex: 1, color: colors.secondaryText, fontSize: 14, lineHeight: 20 },
  castSection: { marginTop: 24, paddingVertical: 28, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.dividerTranslucent },
  castHeading: { paddingHorizontal: 20, marginBottom: 20 },
  peopleList: { gap: 20, paddingHorizontal: 20 },
  person: { width: 80, alignItems: 'center' },
  personImage: { width: 72, height: 72, borderRadius: 36, marginBottom: 8, backgroundColor: colors.backgroundElement },
  personName: { width: 80, textAlign: 'center', color: colors.textPrimary, fontSize: 12, fontWeight: '600' },
  personRole: { width: 80, textAlign: 'center', color: colors.secondaryText, fontSize: 10, marginTop: 8 },
  episodesHeadingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  episodesTitleGroup: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headingWithoutMargin: { marginBottom: 0 },
  countBadge: { backgroundColor: colors.backgroundElement, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  sortLabel: { color: colors.accent, fontSize: 14 },
  unlockCard: { minHeight: 78, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, experimental_backgroundImage: colors.offerBackgroundGradient, borderWidth: 1, borderColor: colors.surfaceBorder, marginBottom: 24 },
  unlockCopy: { flex: 1, gap: 6 },
  unlockTitle: { color: colors.textPrimary, fontFamily: Fonts.serif, fontSize: 16, fontWeight: '700' },
  unlockSubtitle: { color: colors.secondaryText, fontSize: 12 },
  priceBadge: { borderRadius: 22, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: colors.spotlightBackground, boxShadow: colors.spotlightGlowShadow },
  priceLabel: { color: colors.textOnSpotlight, fontSize: 14, fontWeight: '700' },
  episodeList: { gap: 28 },
  episodeRow: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: 16 },
  episodeThumbnailWrap: { width: 112, height: 64, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', backgroundColor: colors.backgroundElement },
  episodeThumbnail: { ...StyleSheet.absoluteFill, width: undefined, height: undefined },
  thumbnailShade: { ...StyleSheet.absoluteFill, backgroundColor: colors.scrimBackground },
  episodePlayButton: { position: 'absolute', left: '50%', top: '50%', width: 28, height: 28, marginLeft: -14, marginTop: -14, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.scrimBackground },
  availablePlayButton: { backgroundColor: colors.buttonBackground },
  episodeCopy: { flex: 1, gap: 6 },
  episodeTitle: { color: colors.textPrimary, fontFamily: Fonts.serif, fontSize: 14, lineHeight: 19, fontWeight: '700' },
  episodeMeta: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 4 },
  episodeDuration: { color: colors.secondaryText, fontSize: 12, marginRight: 8 },
  episodeUnlock: { color: colors.spotlightText, fontSize: 12 },
  showMoreButton: { alignSelf: 'center', minHeight: 44, marginVertical: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 },
  showMoreLabel: { color: colors.secondaryText, fontSize: 14 },
  recommendationSection: { paddingHorizontal: 0, paddingVertical: 28, backgroundColor: colors.surfaceRecessed },
  recommendationHeading: { paddingLeft: 20, marginBottom: 20 },
  recommendationList: { paddingHorizontal: 20, gap: 16 },
  recommendationCard: { width: 140, gap: 10 },
  recommendationImage: { width: 140, height: 210, borderRadius: 10, backgroundColor: colors.backgroundElement },
  recommendationTitle: { color: colors.textPrimary, fontFamily: Fonts.serif, fontSize: 14, lineHeight: 19 },
  notFound: { flex: 1, alignItems: 'center', backgroundColor: colors.screenBackgroundStrong, paddingHorizontal: 24 },
  notFoundText: { color: colors.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 14 },
  backLabel: { color: colors.accent, fontSize: 13, fontWeight: '700' },
});
