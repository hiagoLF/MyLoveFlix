import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CompassIcon from '@/assets/svg/icon/compass.svg';
import HeartIcon from '@/assets/svg/icon/heart.svg';
import HouseIcon from '@/assets/svg/icon/house.svg';
import MarkerIcon from '@/assets/svg/icon/marker.svg';
import PersonIcon from '@/assets/svg/icon/person.svg';
import { Colors } from '@/constants/theme';

const colors = Colors.dark;

export default function AppTabs() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.divider,
          height: 60 + bottom,
          paddingTop: 8,
          paddingBottom: bottom,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <HouseIcon color={color} width={20} height={21} /> }} />
      <Tabs.Screen name="discover" options={{ title: 'Discover', tabBarIcon: ({ color }) => <CompassIcon color={color} width={22} height={22} /> }} />
      <Tabs.Screen name="romance" options={{ title: 'Romance', tabBarIcon: ({ color }) => <HeartIcon color={color} width={21} height={19} /> }} />
      <Tabs.Screen name="library" options={{ title: 'Library', tabBarIcon: ({ color }) => <MarkerIcon color={color} width={16} height={20} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <PersonIcon color={color} width={16} height={20} /> }} />
      <Tabs.Screen name="soon" options={{ href: null }} />
    </Tabs>
  );
}
