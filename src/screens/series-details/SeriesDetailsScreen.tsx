import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextProps, View } from 'react-native';
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
import UnlockIcon from '@/assets/svg/icon/unlock.svg';
import { Colors } from '@/constants/theme';
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

function IconButton({ children, label, onPress }: { children: React.ReactNode; label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.iconButton} accessibilityRole="button" accessibilityLabel={label}>
      {children}
    </Pressable>
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
        <Pressable onPress={() => router.back()} accessibilityRole="button">
          <Text style={styles.backLabel}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const favoriteLabel = selectedSeries.isFavorite ? 'Remove from favorites' : 'Add to favorites';
  const toggleCurrentFavorite = () => toggleFavorite(selectedSeries.id);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 35 + bottom }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={{ uri: selectedSeries.imageUrl }} style={StyleSheet.absoluteFill} resizeMode="cover" />
          <View pointerEvents="none" style={styles.heroOverlay} />

          <View style={[styles.topActions, { paddingTop: top + 8 }]}>
            <IconButton label="Go back" onPress={() => router.back()}>
              <ArrowLeftIcon color={colors.defaultText} width={20} height={20} />
            </IconButton>
            <View style={styles.topActionGroup}>
              <IconButton label={favoriteLabel} onPress={toggleCurrentFavorite}>
                <HeartIcon color={selectedSeries.isFavorite ? colors.accent : colors.defaultText} width={21} height={19} />
              </IconButton>
              <IconButton label="Share series">
                <ShareIcon color={colors.defaultText} width={19} height={19} />
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
                <StarIcon color={colors.secondaryText} width={15} height={15} />
                <Text style={styles.metadataText}>{selectedSeries.score.toFixed(1)}</Text>
              </View>
              <View style={styles.metadataDot} />
              <Text style={styles.metadataText}>{selectedSeries.releaseYear}</Text>
              <View style={styles.metadataDot} />
              <View style={styles.episodeCount}>
                <PlaylistIcon color={colors.secondaryText} width={14} height={14} />
                <Text style={styles.metadataText}>{selectedSeries.episodesAmount} Episodes</Text>
              </View>
            </View>
            <View style={styles.primaryActions}>
              <Pressable style={styles.playButton} accessibilityRole="button" accessibilityLabel="Play series">
                <PlayIcon color={colors.buttonText} width={12} height={14} />
                <Text style={styles.playLabel}>Play</Text>
              </Pressable>
              <Pressable onPress={toggleCurrentFavorite} style={[styles.favoriteButton, selectedSeries.isFavorite && styles.favoriteButtonActive]} accessibilityRole="button" accessibilityLabel={favoriteLabel}>
                <HeartIcon color={selectedSeries.isFavorite ? colors.accent : colors.defaultText} width={18} height={17} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeading>Synopsis</SectionHeading>
          <Text style={styles.synopsis}>{defaultSeriesSynopsis}</Text>
        </View>

        <View style={styles.section}>
          <SectionHeading>Why You’ll Love It</SectionHeading>
          <View style={styles.loveCard}>
            <View style={styles.loveItem}>
              <FireIcon color={colors.spotlightText} width={17} height={20} />
              <View style={styles.loveCopy}>
                <Text style={styles.loveTitle}>A slow-burn romance</Text>
                <Text style={styles.loveDetail}>Every glance and little gesture brings them closer.</Text>
              </View>
            </View>
            <View style={styles.loveDivider} />
            <View style={styles.loveItem}>
              <ShineStarIcon color={colors.accent} width={18} height={18} />
              <View style={styles.loveCopy}>
                <Text style={styles.loveTitle}>One more episode energy</Text>
                <Text style={styles.loveDetail}>Short episodes make every cliffhanger irresistible.</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeading>Cast &amp; Crew</SectionHeading>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.peopleList}>
            {castAndCrew.map((person) => (
              <View style={styles.person} key={person.name}>
                <Image source={{ uri: person.imageUrl }} style={styles.personImage} />
                <Text numberOfLines={1} style={styles.personName}>{person.name}</Text>
                <Text style={styles.personRole}>{person.role}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.episodesHeadingRow}>
            <SectionHeading>Episodes</SectionHeading>
            <Text style={styles.seasonLabel}>Season 1</Text>
          </View>
          <Pressable accessibilityRole="button" style={styles.unlockCard}>
            <View style={styles.unlockIcon}><UnlockIcon color={colors.spotlightText} width={18} height={18} /></View>
            <View style={styles.unlockCopy}>
              <Text style={styles.unlockTitle}>Unlock Full Season</Text>
              <Text style={styles.unlockSubtitle}>Get access to every episode</Text>
            </View>
            <ArrowRightIcon color={colors.spotlightText} width={14} height={14} />
          </Pressable>

          <View style={styles.episodeList}>
            {seriesEpisodes.map((episode) => (
              <Pressable
                key={episode.number}
                onPress={episode.locked ? () => router.push({
                  pathname: '/unlock-episode',
                  params: { id: selectedSeries.id, episodeNumber: String(episode.number) },
                }) : undefined}
                accessibilityRole="button"
                accessibilityLabel={`Episode ${episode.number}${episode.locked ? ', locked' : ''}`}
                style={styles.episodeRow}
              >
                <View style={styles.episodeThumbnailWrap}>
                  <Image source={{ uri: `https://picsum.photos/id/${episode.imageId}/240/140.jpg` }} style={styles.episodeThumbnail} />
                  <View style={styles.thumbnailShade} />
                  <Text style={styles.episodeNumber}>{String(episode.number).padStart(2, '0')}</Text>
                  <View style={styles.episodePlayButton}>
                    {episode.locked
                      ? <LockIcon color={colors.defaultText} width={13} height={13} />
                      : <PlayIcon color={colors.defaultText} width={10} height={12} />}
                  </View>
                </View>
                <View style={styles.episodeCopy}>
                  <Text style={styles.episodeTitle}>{episode.title}</Text>
                  <View style={styles.episodeMeta}>
                    <ClockIcon color={colors.mutedText} width={12} height={12} />
                    <Text style={styles.episodeDuration}>{episode.duration}</Text>
                    {episode.locked && <>
                      <Text style={styles.episodeUnlock}>Unlock</Text>
                      <LockIcon color={colors.spotlightText} width={12} height={12} />
                    </>}
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
          <Pressable accessibilityRole="button" style={styles.showMoreButton}>
            <Text style={styles.showMoreLabel}>Show more episodes</Text>
            <ArrowRightIcon color={colors.secondaryText} width={12} height={12} />
          </Pressable>
        </View>

        <View style={[styles.section, styles.recommendationSection]}>
          <SectionHeading style={{paddingLeft: 20}}>You Might Also Like</SectionHeading>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recommendationList}>
            {recommendations.map((item) => (
              <Pressable key={item.id} onPress={() => router.push({ pathname: '/series/[id]', params: { id: item.id } })} style={styles.recommendationCard} accessibilityRole="button" accessibilityLabel={`View ${item.title}`}>
                <Image source={{ uri: item.imageUrl }} style={styles.recommendationImage} />
                <View style={styles.recommendationGradient} />
                <View style={styles.recommendationMeta}><StarIcon color={colors.secondaryText} width={12} height={12} /><Text style={styles.recommendationScore}>{item.score.toFixed(1)}</Text></View>
                <Text numberOfLines={2} style={styles.recommendationTitle}>{item.title}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  hero: { height: 592, justifyContent: 'space-between', backgroundColor: colors.backgroundElement, overflow: 'hidden' },
  heroOverlay: { ...StyleSheet.absoluteFill, backgroundColor: colors.featuredOverlayTint, experimental_backgroundImage: colors.detailsHeroOverlayGradient } as never,
  topActions: { zIndex: 1, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  topActionGroup: { flexDirection: 'row', gap: 12 },
  iconButton: { width: 42, height: 42, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.featuredOverlayTint, borderWidth: 1, borderColor: colors.contrastBorderSubtle },
  heroContent: { paddingHorizontal: 22, paddingBottom: 22, gap: 11 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 7, marginBottom: 2 },
  genrePill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, backgroundColor: colors.variantBackgroundTranslucent, borderWidth: 1, borderColor: colors.contrastBorderSoft },
  subGenrePill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: colors.contrastBorderSoft, backgroundColor: colors.variantBackgroundTranslucent },
  pillText: { color: colors.defaultText, fontSize: 10, lineHeight: 12, fontWeight: '700' },
  subGenreText: { color: colors.defaultText, fontSize: 10, lineHeight: 12, fontWeight: '600' },
  title: { color: colors.defaultText, fontSize: 31, lineHeight: 36, fontWeight: '800' },
  metadata: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  episodeCount: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metadataText: { color: colors.secondaryText, fontSize: 12, fontWeight: '600' },
  metadataDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.mutedText },
  primaryActions: { flexDirection: 'row', gap: 10, marginTop: 5 },
  playButton: { flex: 1, height: 45, borderRadius: 24, backgroundColor: colors.buttonBackground, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  playLabel: { color: colors.buttonText, fontSize: 13, fontWeight: '800' },
  favoriteButton: { width: 45, height: 45, borderRadius: 23, backgroundColor: colors.variantBackgroundTranslucent, borderWidth: 1, borderColor: colors.contrastBorderSoft, alignItems: 'center', justifyContent: 'center' },
  favoriteButtonActive: { backgroundColor: colors.spotlightBackgroundTranslucent, borderColor: colors.spotlightBorderTranslucent },
  section: { paddingTop: 26, paddingHorizontal: 20 },
  sectionHeading: { color: colors.defaultText, fontSize: 18, lineHeight: 23, fontWeight: '800', marginBottom: 12 },
  synopsis: { color: colors.secondaryText, fontSize: 13, lineHeight: 21 },
  loveCard: { borderRadius: 14, paddingHorizontal: 14, paddingVertical: 14, gap: 12, backgroundColor: colors.backgroundElement, borderWidth: 1, borderColor: colors.contrastBorderSubtle },
  loveItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  loveCopy: { flex: 1, gap: 4 },
  loveTitle: { color: colors.defaultText, fontSize: 12, fontWeight: '700' },
  loveDetail: { color: colors.secondaryText, fontSize: 11, lineHeight: 16 },
  loveDivider: { height: 1, backgroundColor: colors.divider },
  peopleList: { gap: 15, paddingRight: 20 },
  person: { width: 76, alignItems: 'center' },
  personImage: { width: 68, height: 68, borderRadius: 34, marginBottom: 8, backgroundColor: colors.backgroundElement },
  personName: { width: 76, textAlign: 'center', color: colors.defaultText, fontSize: 10, fontWeight: '700' },
  personRole: { color: colors.mutedText, fontSize: 10, marginTop: 3 },
  episodesHeadingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seasonLabel: { color: colors.secondaryText, fontSize: 11, fontWeight: '600', marginBottom: 12 },
  unlockCard: { minHeight: 72, borderRadius: 13, paddingHorizontal: 13, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: colors.spotlightBackgroundTranslucent, borderWidth: 1, borderColor: colors.spotlightBorderTranslucent, marginBottom: 14 },
  unlockIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.spotlightBackgroundTranslucent },
  unlockCopy: { flex: 1, gap: 4 },
  unlockTitle: { color: colors.defaultText, fontSize: 12, fontWeight: '800' },
  unlockSubtitle: { color: colors.secondaryText, fontSize: 10 },
  episodeList: { gap: 10 },
  episodeRow: { minHeight: 75, flexDirection: 'row', alignItems: 'center', gap: 12 },
  episodeThumbnailWrap: { width: 112, height: 61, borderRadius: 8, overflow: 'hidden', justifyContent: 'center', backgroundColor: colors.backgroundElement },
  episodeThumbnail: { ...StyleSheet.absoluteFill, width: undefined, height: undefined },
  thumbnailShade: { ...StyleSheet.absoluteFill, backgroundColor: colors.featuredOverlayTint },
  episodeNumber: { color: colors.defaultText, fontSize: 16, fontWeight: '800', marginLeft: 11 },
  episodePlayButton: { position: 'absolute', left: '50%', top: '50%', width: 28, height: 28, marginLeft: -14, marginTop: -14, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.overlayTranslucentStrong },
  episodeCopy: { flex: 1, gap: 7 },
  episodeTitle: { color: colors.defaultText, fontSize: 12, fontWeight: '700' },
  episodeMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  episodeDuration: { color: colors.mutedText, fontSize: 10 },
  episodeUnlock: { color: colors.spotlightText, fontSize: 10, fontWeight: '700', marginLeft: 5 },
  showMoreButton: { alignSelf: 'center', minHeight: 38, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  showMoreLabel: { color: colors.secondaryText, fontSize: 11, fontWeight: '600' },
  recommendationSection: { paddingHorizontal: 0 },
  recommendationList: { paddingHorizontal: 20, gap: 12, paddingBottom: 2 },
  recommendationCard: { width: 132, height: 172, borderRadius: 12, overflow: 'hidden', backgroundColor: colors.backgroundElement, justifyContent: 'flex-end' },
  recommendationImage: { ...StyleSheet.absoluteFill, width: undefined, height: undefined },
  recommendationGradient: { ...StyleSheet.absoluteFill, experimental_backgroundImage: colors.mediaCardOverlayGradient } as never,
  recommendationMeta: { position: 'absolute', top: 9, right: 9, flexDirection: 'row', alignItems: 'center', gap: 4 },
  recommendationScore: { color: colors.defaultText, fontSize: 10, fontWeight: '700' },
  recommendationTitle: { color: colors.defaultText, fontSize: 12, lineHeight: 15, fontWeight: '700', padding: 10 },
  notFound: { flex: 1, alignItems: 'center', backgroundColor: colors.background, paddingHorizontal: 24 },
  notFoundText: { color: colors.defaultText, fontSize: 16, fontWeight: '700', marginBottom: 14 },
  backLabel: { color: colors.accent, fontSize: 13, fontWeight: '700' },
});
