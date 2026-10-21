import { MaskedView } from '@expo/ui/community/masked-view';
import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent, type ViewStyle } from 'react-native';

type AutoWidthMaskedViewStyle = ViewStyle & {
  experimental_backgroundImage?: string;
};

type AutoWidthMaskedViewProps = {
  children: React.ReactNode;
  style?: AutoWidthMaskedViewStyle;
};

export function AutoWidthMaskedView({ children, style }: AutoWidthMaskedViewProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  function handleLayout({ nativeEvent }: LayoutChangeEvent) {
    const { width, height } = nativeEvent.layout;
    setSize((currentSize) => currentSize.width === width && currentSize.height === height
      ? currentSize
      : { width, height });
  }

  return (
    <View style={styles.container}>
      <View style={styles.measurement} pointerEvents="none" onLayout={handleLayout}>
        {children}
      </View>
      {size.width > 0 && size.height > 0 && (
        <MaskedView
          style={[styles.maskedView, { width: size.width, height: size.height }]}
          maskElement={<View style={styles.maskWrapper}>{children}</View>}>
          <View style={[StyleSheet.absoluteFill, style]} />
        </MaskedView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative', alignSelf: 'flex-start' },
  measurement: { opacity: 0 },
  maskedView: { position: 'absolute', top: 0, left: 0 },
  maskWrapper: { flex: 1, backgroundColor: 'transparent' },
});
