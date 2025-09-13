import { COLORS, SIZES } from '@/constants';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type ScreenItem = {
  key: string;
  component: React.ReactElement;
};

type PageIndicatorProps = {
  data: ScreenItem[];
  scrollX: SharedValue<number>;
};

type DotProps = {
  index: number;
  scrollX: SharedValue<number>;
  itemKey: string;
};

const Dot: React.FC<DotProps> = ({ index, scrollX, itemKey }) => {
  const inputRange = [
    (index - 1) * SIZES.width,
    index * SIZES.width,
    (index + 1) * SIZES.width,
  ];

  const dotWidth = useAnimatedStyle(() => {
    const animatedIndicator = interpolate(
      scrollX.value,
      inputRange,
      [6, 7, 6],
      Extrapolation.CLAMP
    );
    return { width: animatedIndicator };
  });

  const bgColor = useAnimatedStyle(() => {
    const animatedIndicator = interpolateColor(
      scrollX.value,
      [0, SIZES.width, SIZES.width * 2],
      ['#B4B4B4', COLORS.icon1, '#B4B4B4']
    );
    return { backgroundColor: animatedIndicator };
  });

  return (
    <Animated.View style={[styles.dot, dotWidth, bgColor]} key={itemKey} />
  );
};

const PageIndicator: React.FC<PageIndicatorProps> = ({ data, scrollX }) => (
  <View style={{ flexDirection: 'row' }}>
    {data.map((item, i) => (
      <Dot key={item.key} index={i} scrollX={scrollX} itemKey={item.key} />
    ))}
  </View>
);

export default PageIndicator;

const styles = StyleSheet.create({
  indicator__container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? SIZES.height / 9 : SIZES.height / 12.5,
  },

  dot: {
    height: 6,
    borderRadius: 10,
    marginHorizontal: 3.5,
  },
});
