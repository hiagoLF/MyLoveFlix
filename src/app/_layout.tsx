import { DarkTheme, Stack, ThemeProvider } from 'expo-router';

export default function TabLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="series/[id]" />
      </Stack>
    </ThemeProvider>
  );
}
