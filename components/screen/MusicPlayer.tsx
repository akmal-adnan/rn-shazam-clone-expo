import ApplePlayButton from '@/components/ui/ApplePlayButton';
import Header2 from '@/components/ui/Header2';
import PlayerButton from '@/components/ui/PlayerButton';
import PlayHeader from '@/components/ui/PlayHeader';
import PlayRelated from '@/components/ui/PlayRelated';
import { COLORS, SIZES } from '@/constants/theme';
import { useGetTrackIndex } from '@/hooks/useGetTrackIndex';
import { usePlayerStore } from '@/hooks/usePlayerStore';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  ColorValue,
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);

const black = (opacity: number): ColorValue => `rgba(0,0,0,${opacity})`;
export const LinearGradient1 = [
  black(0),
  black(0),
  black(0),
  black(0.7),
] as const;
export const LinearGradient2 = [black(0.8), black(0)] as const;
export const LinearGradient3 = [
  black(0),
  black(0),
  black(0.95),
  black(1),
  black(1),
] as const;

const MusicPlayer = () => {
  const scrollRef = useRef<FlatList<any> | null>(null);
  const scrollY = useSharedValue(0);
  const AxisY = useSharedValue(0);

  const tracks = usePlayerStore((state) => state.tracks);
  //   const [trackIndex, setTrackIndex] = useState<number>(0);
  const { trackIndex } = useGetTrackIndex();

  const imageUrl = tracks[trackIndex]?.images
    ?.replace('400', 800)
    ?.replace('400', 800);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 150);
  }, []);

  const TranslateY = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 500],
      [0, 140],
      Extrapolation.CLAMP
    );

    return { transform: [{ translateY }] };
  });

  const AnimatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 500],
      [1, 0],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  const renderPlayer = useCallback(
    () => (
      <LinearGradient colors={LinearGradient1}>
        <Animated.View style={[TranslateY, styles.player__container]}>
          {/* Media player */}
          <PlayerButton trackIndex={trackIndex} trackLength={tracks.length} />

          {/* Play full songs button */}
          <Animated.View style={[AnimatedOpacity]}>
            <TouchableOpacity>
              <ApplePlayButton />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    ),
    [AnimatedOpacity, TranslateY, trackIndex, tracks.length]
  );

  // This is the trackbar progress
  const renderTrackBar = () => <PlayHeader AxisY={AxisY} trackList={tracks} />;

  // This is the related song list
  const renderTrackList = useCallback(
    () => <PlayRelated AxisY={AxisY} trackList={tracks} imageUrl={imageUrl} />,
    [AxisY, tracks, imageUrl]
  );

  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      resizeMode="cover"
      style={styles.imageBg__container}
    >
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      <LinearGradient colors={LinearGradient2} style={styles.linear__top} />
      <LinearGradient colors={LinearGradient3} style={styles.linear__bottom} />

      <Header2 trackList={tracks} trackIndex={trackIndex} />

      <ReanimatedFlatList
        ref={scrollRef}
        bounces={false}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        data={[{ key: 1 }]}
        keyExtractor={(item: any) => item.key}
        ListHeaderComponent={renderPlayer}
        renderItem={renderTrackBar}
        ListFooterComponent={renderTrackList}
        ListFooterComponentStyle={{ height: SIZES.height / 1.53 }}
        scrollEventThrottle={16}
        onScroll={useAnimatedScrollHandler((event) => {
          scrollY.value = event.contentOffset.y;
        })}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={SIZES.height}
      />
    </ImageBackground>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  linear__top: {
    position: 'absolute',
    width: '100%',
    height: SIZES.height / 3.4,
    top: 0,
  },

  linear__bottom: {
    position: 'absolute',
    width: '100%',
    height: SIZES.height / 1.5,
    bottom: 0,
  },

  imageBg__container: {
    width: SIZES.width,
    height: SIZES.height / 1.5,
    backgroundColor: COLORS.black1,
    flex: 1,
  },

  player__container: {
    alignSelf: 'center',
    paddingTop: SIZES.height / 1.485,
    paddingBottom: 25,
  },

  player__button: {
    width: SIZES.width,
    maxWidth: 240,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  play__button: {
    backgroundColor: COLORS.orange,
    padding: 18,
    borderRadius: 100,
  },
});
