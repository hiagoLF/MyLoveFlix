import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AngularRayIcon from '@/assets/svg/icon/angular-ray.svg';
import ArrowLeftIcon from '@/assets/svg/icon/arrow-left.svg';
import CardIcon from '@/assets/svg/icon/card.svg';
import CrownIcon from '@/assets/svg/icon/crown.svg';
import CheckCircleIcon from '@/assets/svg/icon/check-circle.svg';
import LockIcon from '@/assets/svg/icon/lock.svg';
import ShieldIcon from '@/assets/svg/icon/shield.svg';
import { Colors, Fonts } from '@/constants/theme';
import { seriesEpisodes } from '@/mock/seriesEpisodes';
import { useMockData } from '@/mock/useMockData';

const colors = Colors.dark;
const episodeUnlockCost = 85;
const coinBalance = 15;

type CoinPackage = {
  id: string;
  amount: number;
  bonus: number;
  price: string;
  badge?: 'POPULAR' | 'BEST VALUE';
};

const coinPackages: CoinPackage[] = [
  { id: '300', amount: 300, bonus: 0, price: '€2.99' },
  { id: '800', amount: 800, bonus: 50, price: '€6.99', badge: 'POPULAR' },
  { id: '2500', amount: 2500, bonus: 200, price: '€19.99' },
  { id: '6000', amount: 6000, bonus: 1000, price: '€49.99', badge: 'BEST VALUE' },
];

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export default function UnlockEpisodeScreen() {
  const { id, episodeNumber } = useLocalSearchParams<{ id: string; episodeNumber: string }>();
  const { getSeriesById } = useMockData();
  const { top, bottom } = useSafeAreaInsets();
  const [selectedPackageId, setSelectedPackageId] = useState('800');
  const [purchaseMessage, setPurchaseMessage] = useState('');

  const selectedSeries = getSeriesById(id);
  const selectedEpisode = seriesEpisodes.find((episode) => episode.number === Number(episodeNumber) && episode.locked);
  const selectedPackage = coinPackages.find((coinPackage) => coinPackage.id === selectedPackageId) ?? coinPackages[1];

  if (!selectedSeries || !selectedEpisode) {
    return (
      <View style={[styles.notFound, { paddingTop: top + 24 }]}>
        <Text style={styles.notFoundTitle}>Episode unavailable</Text>
        <Text style={styles.mutedText}>We couldn’t find this locked episode.</Text>
        <Pressable onPress={() => router.back()} accessibilityRole="button" style={styles.backButton}>
          <Text style={styles.coinAccentText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const imageUrl = `https://picsum.photos/id/${selectedEpisode.imageId}/240/360.jpg`;

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: top + 4 }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton} accessibilityRole="button" accessibilityLabel="Go back">
          <ArrowLeftIcon color={colors.defaultText} width={9} height={15} />
        </Pressable>
        <Text style={styles.headerTitle}>Unlock Episode</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.episodeCard}>
          <View style={styles.coverWrap}>
            <Image source={{ uri: imageUrl }} style={styles.cover} resizeMode="cover" />
            <View style={styles.coverLock}>
              <LockIcon color={colors.defaultText} width={12} height={13} />
            </View>
          </View>
          <View style={styles.episodeDetails}>
            <Text numberOfLines={2} style={styles.episodeSeriesTitle}>{selectedSeries.title}</Text>
            <Text numberOfLines={1} style={styles.episodeStatus}>Episode {selectedEpisode.number} • Locked</Text>
            <View style={styles.unlockPrice}>
              <LockIcon color={colors.coinAccent} width={12} height={13} />
              <Text style={styles.unlockPriceText}>Unlock for {episodeUnlockCost} Coins</Text>
            </View>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.mutedText}>Your Balance</Text>
          <View style={styles.balanceValue}>
            <AngularRayIcon color={colors.coinAccent} width={15} height={16} />
            <Text style={styles.balanceText}>{coinBalance} Coins</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.rechargeSection}>
          <SectionTitle>Recharge Coins</SectionTitle>
          <View style={styles.packageGrid}>
            {coinPackages.map((coinPackage) => (
              <CoinPackageCard
                key={coinPackage.id}
                coinPackage={coinPackage}
                selected={selectedPackage.id === coinPackage.id}
                onPress={() => {
                  setSelectedPackageId(coinPackage.id);
                  setPurchaseMessage('');
                }}
              />
            ))}
          </View>
        </View>

        <View style={styles.bestDealDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.bestDealText}>OR BEST DEAL</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable onPress={() => router.push('/soon')} accessibilityRole="button" accessibilityLabel="VIP Membership" style={styles.vipCard}>
          <View style={styles.crownBadge}>
            <CrownIcon color={colors.secondaryTextStrong} width={22} height={20} />
          </View>
          <View style={styles.vipDetails}>
            <Text numberOfLines={1} style={styles.vipTitle}>VIP Membership</Text>
            <Text numberOfLines={1} style={styles.vipBenefits}>Free episodes • No ads</Text>
          </View>
          <View style={styles.vipPrice}>
            <Text style={styles.vipPriceAmount}>€4.99</Text>
            <Text style={styles.vipPricePeriod}>/ Week</Text>
          </View>
        </Pressable>
      </ScrollView>

      <View style={[styles.purchasePanel, { paddingBottom: Math.max(bottom, 12) }]}>
        {purchaseMessage ? <Text accessibilityLiveRegion="polite" style={styles.purchaseMessage}>{purchaseMessage}</Text> : null}
        <View style={styles.paymentDetails}>
          <View style={styles.paymentMethod}>
            <ShieldIcon color={colors.secondaryTextStrong} width={13} height={15} />
            <Text style={styles.paymentLabel}>Secure</Text>
          </View>
          <View style={styles.paymentMethod}>
            <CardIcon color={colors.secondaryTextStrong} width={15} height={12} />
            <Text style={styles.paymentLabel}>App Store Pay</Text>
          </View>
        </View>
        <Pressable
          onPress={() => setPurchaseMessage('Purchases are unavailable in this demo.')}
          style={styles.purchaseButton}
          accessibilityRole="button"
          accessibilityLabel={`Buy ${selectedPackage.amount} Coins for ${selectedPackage.price}`}
        >
          <Text style={styles.purchaseButtonTitle}>Buy {selectedPackage.amount} Coins</Text>
          <Text style={styles.purchaseButtonPrice}>for {selectedPackage.price}</Text>
        </Pressable>
        <Text style={styles.legalCopy}>
          By purchasing, you agree to our Terms of Service. Subscriptions / auto-renew unless cancelled.
        </Text>
      </View>
    </View>
  );
}

function CoinPackageCard({
  coinPackage,
  selected,
  onPress,
}: {
  coinPackage: CoinPackage;
  selected: boolean;
  onPress: () => void;
}) {
  const isBestValue = coinPackage.badge === 'BEST VALUE';

  return (
    <Pressable
      onPress={onPress}
      style={[styles.packageCard, selected && styles.packageCardSelected]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${coinPackage.amount} coins${coinPackage.bonus ? ` plus ${coinPackage.bonus} bonus` : ''}, ${coinPackage.price}`}
    >
      {coinPackage.badge ? (
        <View style={[styles.packageBadge, isBestValue && styles.bestValueBadge]}>
          <Text style={styles.packageBadgeText}>{coinPackage.badge}</Text>
        </View>
      ) : null}
      {selected ? (
        <View style={styles.selectedIndicator}>
          <CheckCircleIcon color={colors.coinAccent} width={18} height={18} />
        </View>
      ) : null}
      <View style={styles.packageAmountGroup}>
        <AngularRayIcon color={colors.coinAccent} width={18} height={20} />
        <Text style={styles.packageAmount}>{coinPackage.amount}</Text>
      </View>
      {coinPackage.bonus ? <Text style={styles.packageBonus}>+ {coinPackage.bonus} Bonus</Text> : <View style={styles.bonusPlaceholder} />}
      <View style={[styles.packagePriceButton, selected && styles.packagePriceButtonSelected]}>
        <Text style={[styles.packagePrice, selected && styles.packagePriceSelected]}>{coinPackage.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.screenBackgroundStrong },
  header: { minHeight: 57, paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', gap: 16 },
  backButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: colors.defaultText, fontFamily: Fonts.serif, fontSize: 20, lineHeight: 26, fontWeight: '700' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 24, gap: 14 },
  episodeCard: { minHeight: 152, padding: 15, borderRadius: 14, borderWidth: 1, borderColor: colors.surfaceBorder, backgroundColor: colors.surfaceElevated, flexDirection: 'row', alignItems: 'center', gap: 15 },
  coverWrap: { width: 80, height: 120, borderRadius: 9, overflow: 'hidden', backgroundColor: colors.backgroundElement },
  cover: { width: '100%', height: '100%' },
  coverLock: { position: 'absolute', top: 5, right: 5, width: 23, height: 23, borderRadius: 7, backgroundColor: '#08080DCC', alignItems: 'center', justifyContent: 'center' },
  episodeDetails: { flex: 1, justifyContent: 'center', gap: 9 },
  episodeSeriesTitle: { color: colors.defaultText, fontFamily: Fonts.serif, fontSize: 19, lineHeight: 24, fontWeight: '700' },
  episodeStatus: { color: colors.secondaryTextStrong, fontSize: 13, lineHeight: 18 },
  unlockPrice: { minHeight: 30, alignSelf: 'flex-start', paddingHorizontal: 9, borderRadius: 8, backgroundColor: colors.coinActionBackground, flexDirection: 'row', alignItems: 'center', gap: 6 },
  unlockPriceText: { color: colors.coinAccent, fontSize: 12, fontWeight: '700' },
  balanceCard: { minHeight: 58, paddingHorizontal: 19, borderRadius: 14, borderWidth: 1, borderColor: colors.surfaceBorder, backgroundColor: colors.surfaceElevated, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  mutedText: { color: colors.secondaryTextStrong, fontSize: 14 },
  balanceValue: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  balanceText: { color: colors.defaultText, fontSize: 16, fontWeight: '700' },
  divider: { height: 1, backgroundColor: colors.divider, marginTop: 1 },
  rechargeSection: { gap: 12 },
  sectionTitle: { color: colors.defaultText, fontFamily: Fonts.serif, fontSize: 20, lineHeight: 26, fontWeight: '700' },
  packageGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  packageCard: { width: '48.3%', height: 178, paddingHorizontal: 12, paddingTop: 24, paddingBottom: 12, borderRadius: 14, borderWidth: 1, borderColor: colors.surfaceBorder, backgroundColor: colors.surfaceElevated, alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' },
  packageCardSelected: { borderColor: colors.coinAccent, borderWidth: 1.5 },
  packageBadge: { position: 'absolute', top: 0, left: 0, right: 0, height: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.coinAccent },
  bestValueBadge: { experimental_backgroundImage: colors.proBadgeGradient } as never,
  packageBadgeText: { color: colors.defaultText, fontSize: 9, lineHeight: 12, fontWeight: '800', letterSpacing: 0.5 },
  selectedIndicator: { position: 'absolute', top: 25, right: 9 },
  packageAmountGroup: { alignItems: 'center', justifyContent: 'center', gap: 5 },
  packageAmount: { color: colors.defaultText, fontFamily: Fonts.serif, fontSize: 24, lineHeight: 30, fontWeight: '700' },
  packageBonus: { color: colors.bonusText, fontSize: 12, lineHeight: 18, marginTop: 2 },
  bonusPlaceholder: { height: 20 },
  packagePriceButton: { width: '100%', height: 37, marginTop: 10, borderRadius: 11, borderWidth: 1, borderColor: colors.surfaceBorder, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.screenBackgroundStrong },
  packagePriceButtonSelected: { backgroundColor: colors.coinAccent, borderColor: colors.coinAccent },
  packagePrice: { color: colors.defaultText, fontSize: 13, fontWeight: '600' },
  packagePriceSelected: { color: colors.coinActionBackground, fontWeight: '800' },
  bestDealDivider: { flexDirection: 'row', alignItems: 'center', gap: 14, marginVertical: 3 },
  dividerLine: { height: 1, flex: 1, backgroundColor: colors.surfaceBorder },
  bestDealText: { color: colors.secondaryTextStrong, fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  vipCard: { minHeight: 90, padding: 13, borderRadius: 14, borderWidth: 1, borderColor: colors.surfaceBorder, backgroundColor: colors.surfaceElevated, flexDirection: 'row', alignItems: 'center', gap: 10 },
  crownBadge: { width: 46, height: 46, borderRadius: 23, borderWidth: 1, borderColor: colors.surfaceBorder, alignItems: 'center', justifyContent: 'center' },
  vipDetails: { flex: 1, gap: 5 },
  vipTitle: { color: colors.defaultText, fontFamily: Fonts.serif, fontSize: 16, lineHeight: 20, fontWeight: '700' },
  vipBenefits: { color: colors.secondaryTextStrong, fontSize: 11 },
  vipPrice: { alignItems: 'flex-end' },
  vipPriceAmount: { color: colors.defaultText, fontSize: 15, lineHeight: 19, fontWeight: '700' },
  vipPricePeriod: { color: colors.secondaryTextStrong, fontSize: 11 },
  purchasePanel: { paddingHorizontal: 22, paddingTop: 13, backgroundColor: colors.surfaceOverlay, borderTopWidth: 1, borderTopColor: colors.surfaceOverlayBorder, gap: 10 },
  purchaseMessage: { color: colors.coinAccent, textAlign: 'center', fontSize: 12 },
  paymentDetails: { minHeight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24 },
  paymentMethod: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  paymentLabel: { color: colors.secondaryTextStrong, fontSize: 11 },
  purchaseButton: { minHeight: 59, borderRadius: 14, borderWidth: 1, borderColor: colors.coinAccent, backgroundColor: colors.surfaceElevated, alignItems: 'center', justifyContent: 'center', gap: 1 },
  purchaseButtonTitle: { color: colors.coinAccent, fontSize: 17, lineHeight: 21, fontWeight: '800' },
  purchaseButtonPrice: { color: colors.secondaryTextStrong, fontSize: 11, lineHeight: 15 },
  legalCopy: { color: colors.mutedText, fontSize: 9, lineHeight: 13, textAlign: 'center' },
  notFound: { flex: 1, backgroundColor: colors.screenBackgroundStrong, alignItems: 'center', paddingHorizontal: 24 },
  notFoundTitle: { color: colors.defaultText, fontFamily: Fonts.serif, fontSize: 20, fontWeight: '700', marginBottom: 8 },
  coinAccentText: { color: colors.coinAccent, fontWeight: '700' },
});
