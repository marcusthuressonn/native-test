import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabBarBackground() {
  const { bottom } = useSafeAreaInsets();

  return (
    <BlurView
      // https://github.com/Kureev/react-native-blur/issues/488
      experimentalBlurMethod="dimezisBlurView"
      intensity={80}
      style={[styles.container, { paddingBottom: bottom }]}
    />
  );
}

export function useBottomTabOverflow() {
  const { bottom } = useSafeAreaInsets();
  return bottom;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
