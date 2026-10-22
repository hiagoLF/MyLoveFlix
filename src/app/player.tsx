import { useEvent } from 'expo';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { TouchableOpacity, StatusBar, StyleSheet, Text, View } from 'react-native';

const videoUrl = 'https://lorem.video/cat_128kbps';

export default function PlayerScreen() {
  const player = useVideoPlayer(videoUrl, (videoPlayer) => {
    videoPlayer.play();
  });
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <VideoView player={player} style={StyleSheet.absoluteFill} contentFit="contain" nativeControls={false} />
      <TouchableOpacity onPress={() => router.back()} style={styles.closeButton} accessibilityRole="button" accessibilityLabel="Close video">
        <Text style={styles.closeLabel}>×</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => isPlaying ? player.pause() : player.play()}
        style={styles.playPauseButton}
        accessibilityRole="button"
        accessibilityLabel={isPlaying ? 'Pause video' : 'Play video'}
      >
        <Text style={styles.playPauseLabel}>{isPlaying ? 'Ⅱ' : '▶'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  closeButton: { position: 'absolute', top: 48, left: 20, width: 44, height: 44, borderRadius: 22, backgroundColor: '#0009', alignItems: 'center', justifyContent: 'center' },
  closeLabel: { color: '#fff', fontSize: 30, lineHeight: 34 },
  playPauseButton: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#0009', borderWidth: 1, borderColor: '#ffffff80', alignItems: 'center', justifyContent: 'center' },
  playPauseLabel: { color: '#fff', fontSize: 25, fontWeight: '700' },
});
