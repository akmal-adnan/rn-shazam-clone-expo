import { COLORS } from '@/src/constants';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type TheDotProps = { scrollX: SharedValue<number> };

const TheDot: React.FC<TheDotProps> = ({ scrollX }) => {
  const dotMoving = useAnimatedStyle(() => {
    const animatedIndicator = interpolate(
      scrollX.value,
      [0, 393, 780],
      [0, 13, 26],
      Extrapolation.CLAMP
    );

    return { transform: [{ translateX: animatedIndicator }] };
  });

  const bgColor = useAnimatedStyle(() => {
    const animatedIndicator = interpolateColor(
      scrollX.value,
      [0, 393, 780],
      [COLORS.blue1, COLORS.white1, COLORS.blue3]
    );
    return {
      backgroundColor: animatedIndicator,
    };
  });

  return (
    <View style={{ position: 'absolute', width: '100%' }}>
      <Animated.View style={[dotMoving, bgColor, styles.dot__moving]} />
    </View>
  );
};

export default TheDot;

const styles = StyleSheet.create({
  dot__moving: {
    height: 7,
    width: 7,
    borderRadius: 10,
    marginHorizontal: 3.5,
  },
});
