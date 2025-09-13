import React, { useMemo, useRef } from 'react';
import {
  FlatList,
  ListRenderItem,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
// import {useSelector} from 'react-redux';
import Charts from '@/components/screen/Chart';
import Home from '@/components/screen/Home';
import Library from '@/components/screen/Library';
import PageIndicator from '@/components/ui/PageIndicator';
import TheDot from '@/components/ui/TheDot';
import { SIZES } from '../constants';

type ScreenItem = {
  key: string;
  component: React.ReactElement;
};

const ReanimatedFlatList = Animated.createAnimatedComponent(
  FlatList<ScreenItem>
);

const MainScreen = () => {
  const slidesRef = useRef<FlatList<any>>(null);
  const scrollX = useSharedValue(390);

  // const isPlaying = useSelector(state => state.player.isPlaying);

  const SCREEN: ScreenItem[] = useMemo(
    () => [
      {
        key: 'library',
        component: <Library />,
      },
      {
        key: 'home',
        component: <Home slidesRef={slidesRef} />,
      },
      {
        key: 'charts',
        component: <Charts />,
      },
    ],
    []
  );

  const renderItem: ListRenderItem<ScreenItem> = ({ item }) => (
    <View style={{ width: SIZES.width, height: SIZES.height }}>
      {item.component}
    </View>
  );

  const renderIndicator = useMemo(
    () => (
      <View style={styles.indicator__container}>
        <PageIndicator data={SCREEN} scrollX={scrollX} />
        <TheDot scrollX={scrollX} />
      </View>
    ),
    [SCREEN, scrollX]
  );

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />

      <ReanimatedFlatList
        ref={slidesRef}
        bounces={false}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        data={SCREEN}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        getItemLayout={(_, index) => ({
          length: SIZES.width,
          offset: SIZES.width * index,
          index,
        })}
        onScroll={useAnimatedScrollHandler((event) => {
          scrollX.value = event.contentOffset.x;
        })}
        initialScrollIndex={1}
      />

      {renderIndicator}

      {/* {isPlaying && <FloatButton navigation={navigation} />} */}
    </>
  );
};

export default MainScreen;

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

  dot__moving: {
    height: 7,
    width: 7,
    borderRadius: 10,
    marginHorizontal: 3.5,
  },
});
