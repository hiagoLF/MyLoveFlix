import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BellIcon from '@/assets/svg/icon/bell.svg';
import GlassSearchIcon from '@/assets/svg/icon/glass-search.svg';
import HeartIcon from '@/assets/svg/icon/heart.svg';
import PlayIcon from '@/assets/svg/icon/play.svg';
import PlusIcon from '@/assets/svg/icon/plus.svg';
import { Colors } from '@/constants/theme';
import { feedSections, genres, series } from '@/mock/mock';

import { HorizontalGenres } from './components/HorizontalGenres';
import { HorizontalMediaLista } from './components/HorizontalMediaLista';

const colors = Colors.dark;
const featured = series[0];

function openAvailableSoon() {
  router.push('/soon');
}

function IconButton({ children, label, onPress = openAvailableSoon }: { children: React.ReactNode; label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.iconButton} accessibilityRole="button" accessibilityLabel={label}>
      {children}
    </Pressable>
  );
}

export default function HomeScreen() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const filteredSeries = useMemo(() => selectedGenre === 'All' ? series : series.filter((item) => item.genres.includes(selectedGenre)), [selectedGenre]);
  const visibleSections = useMemo(() => feedSections.map((section) => ({
    ...section,
    items: filteredSeries.filter((item) => item.genres.includes(section.title) || section.subGenres.some((subGenre) => item.subGenres.includes(subGenre))),
  })), [filteredSeries]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.brand}>LOVE<Text style={styles.brandAccent}>FLIX</Text></Text>
          <View style={styles.headerActions}>
            <IconButton label="Favoritos"><HeartIcon color={colors.secondaryText} width={20} height={19} /></IconButton>
            <IconButton label="Buscar"><GlassSearchIcon color={colors.secondaryText} width={18} height={18} /></IconButton>
            <IconButton label="Notificações"><BellIcon color={colors.secondaryText} width={18} height={20} /></IconButton>
            <Pressable onPress={openAvailableSoon} accessibilityRole="button" accessibilityLabel="Perfil" style={styles.avatarWrap}>
              <Image source={{ uri: 'https://picsum.photos/id/64/100/100.jpg' }} style={styles.avatar} />
            </Pressable>
          </View>
        </View>

        <View style={styles.featured}>
          <Image source={{ uri: featured.imageUrl }} style={StyleSheet.absoluteFill} />
          <View style={styles.featuredOverlay} />
          <View style={styles.featuredContent}>
            <View style={styles.spotlight}><Text style={styles.spotlightText}>✦  SPOTLIGHT</Text></View>
            <Text style={styles.featuredTitle}>{featured.title}</Text>
            <Text style={styles.featuredMeta}>Série original  ·  {featured.episodesAmount} episódios</Text>
            <View style={styles.tags}>
              {[...featured.genres, ...featured.subGenres.slice(0, 1)].map((tag) => <View style={styles.tag} key={tag}><Text style={styles.tagText}>{tag}</Text></View>)}
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
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            {section.subGenres.map((subGenre) => {
              const items = section.items.filter((item) => item.subGenres.includes(subGenre));
              if (items.length === 0) return null;
              return (
                <View key={subGenre} style={styles.subSection}>
                  <Text style={styles.subTitle}>{subGenre}</Text>
                  <HorizontalMediaLista items={items} onPressItem={openAvailableSoon} />
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { paddingBottom: 24 },
  header: { height: 58, paddingHorizontal: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { color: colors.defaultText, fontSize: 17, fontWeight: '900', letterSpacing: 1.2 },
  brandAccent: { color: colors.accent },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  iconButton: { width: 32, height: 36, justifyContent: 'center', alignItems: 'center' },
  avatarWrap: { width: 31, height: 31, borderRadius: 16, borderWidth: 1.5, borderColor: colors.accent, overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' },
  featured: { height: 485, marginHorizontal: 12, marginTop: 5, marginBottom: 16, borderRadius: 17, overflow: 'hidden', backgroundColor: colors.backgroundElement, justifyContent: 'flex-end' },
  featuredOverlay: { ...StyleSheet.absoluteFill, experimental_backgroundImage: 'linear-gradient(180deg, #08080D00 24%, #08080D44 48%, #08080D 100%)' } as never,
  featuredContent: { paddingHorizontal: 18, paddingBottom: 21, gap: 10 },
  spotlight: { alignSelf: 'flex-start', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: colors.accent },
  spotlightText: { color: colors.accentText, fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
  featuredTitle: { color: colors.defaultText, fontSize: 29, lineHeight: 34, fontWeight: '800' },
  featuredMeta: { color: colors.secondaryText, fontSize: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 2 },
  tag: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#18172BCC', borderWidth: 1, borderColor: '#FFFFFF25' },
  tagText: { color: colors.defaultText, fontSize: 10, fontWeight: '600' },
  featuredActions: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 3 },
  watchButton: { height: 43, paddingHorizontal: 19, gap: 9, borderRadius: 23, backgroundColor: colors.buttonBackground, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  watchLabel: { color: colors.buttonText, fontSize: 13, fontWeight: '800' },
  addButton: { width: 43, height: 43, borderRadius: 23, backgroundColor: colors.buttonVariantBackground, borderWidth: 1, borderColor: colors.buttonVariantBorder, alignItems: 'center', justifyContent: 'center' },
  section: { marginTop: 22 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 17, marginBottom: 13 },
  sectionAccent: { width: 8, height: 8, borderRadius: 2, backgroundColor: colors.accent },
  sectionTitle: { color: colors.defaultText, fontSize: 20, fontWeight: '800' },
  subSection: { marginBottom: 17 },
  subTitle: { color: colors.secondaryText, fontSize: 14, fontWeight: '700', paddingHorizontal: 17, marginBottom: 9 },
});
