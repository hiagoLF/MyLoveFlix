import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

const colors = Colors.dark;

export default function AvailableSoonScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.mark}><Text style={styles.markText}>♡</Text></View>
      <Text style={styles.title}>Em breve</Text>
      <Text style={styles.description}>Estamos preparando novidades para você.</Text>
      <Pressable onPress={() => router.back()} style={styles.button} accessibilityRole="button">
        <Text style={styles.buttonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, backgroundColor: colors.background },
  mark: { width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center', marginBottom: 24, backgroundColor: colors.backgroundElement },
  markText: { color: colors.accent, fontSize: 38 },
  title: { color: colors.defaultText, fontSize: 26, fontWeight: '700', marginBottom: 10 },
  description: { color: colors.secondaryText, fontSize: 15, textAlign: 'center', marginBottom: 28 },
  button: { borderRadius: 24, backgroundColor: colors.buttonBackground, paddingVertical: 12, paddingHorizontal: 28 },
  buttonText: { color: colors.buttonText, fontSize: 14, fontWeight: '700' },
});
