import { Tabs } from 'expo-router';
import { Text } from 'react-native';
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
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.screenBackgroundStrong,
          borderTopColor: colors.backgroundElement,
          height: 65 + bottom,
          paddingTop: 14,
          paddingBottom: bottom,
        },
        tabBarLabel: ({ focused, color, children }) => (
          <Text style={{ color, fontSize: 10, marginTop: 4, fontWeight: focused ? '700' : '400' }}>{children}</Text>
        ),
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <HouseIcon color={color} width={24} height={24} /> }} />
      <Tabs.Screen name="discover" options={{ title: 'Discover', tabBarIcon: ({ color }) => <CompassIcon color={color} width={24} height={24} /> }} />
      <Tabs.Screen name="romance" options={{ title: 'Favorite', tabBarIcon: ({ color }) => <HeartIcon color={color} width={24} height={24} /> }} />
      <Tabs.Screen name="library" options={{ title: 'My List', tabBarIcon: ({ color }) => <MarkerIcon color={color} width={24} height={24} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <PersonIcon color={color} width={24} height={24} /> }} />
      <Tabs.Screen name="soon" options={{ tabBarButton: () => null, tabBarItemStyle: { display: 'none' } }} />
    </Tabs>
  );
}
