import { COLORS, FONTS, SIZES, SVG } from '@/src/constants';
import { useGetTrackTopFeatured } from '@/src/hooks/apiQuery/useGetTrackTopFeatured';
import { useHandleTopTrackPlay } from '@/src/hooks/useHandleTopTrackPlay';
import { usePlayerStore } from '@/src/store/usePlayerStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type Props = {
  adamid?: string;
};

const TrackTopSongs = ({ adamid }: Props) => {
  const { data: topSong } = useGetTrackTopFeatured(Number(adamid));
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const trackList = topSong?.data[0].views['top-songs'].data;
  const { handleTopTrackPlay, currentTrackId } =
    useHandleTopTrackPlay(trackList);

  return (
    <Animated.View
      entering={FadeIn}
      style={{ backgroundColor: COLORS.black1, paddingTop: 20 }}
    >
      <Text style={styles.top__title}>TOP SONGS</Text>

      <ScrollView horizontal bounces={false}>
        <View style={styles.list__container}>
          {trackList?.map((item) => {
            const isTrackPlay = isPlaying && currentTrackId === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                style={styles.song__container}
                onPress={() => router.push(`/SongDetails/${item.id}`)}
              >
                <ImageBackground
                  source={{
                    uri: item.attributes.artwork.url
                      .replace('{w}', '400')
                      .replace('{h}', '400'),
                  }}
                  resizeMode="contain"
                  imageStyle={styles.image__style}
                  style={styles.image__container}
                >
                  <TouchableOpacity
                    onPress={() => handleTopTrackPlay(item)}
                    activeOpacity={0.7}
                    style={styles.play__button}
                  >
                    <Ionicons
                      name={isTrackPlay ? 'pause' : 'play'}
                      size={21}
                      color={COLORS.white1}
                    />
                  </TouchableOpacity>
                </ImageBackground>

                <View style={{ marginLeft: 16, gap: 5 }}>
                  <Text numberOfLines={1} style={styles.song__title}>
                    {item.attributes.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.song__artist}>
                    {item.attributes.artistName}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.apple_button}
                  >
                    <SVG.AppleMusicSVG
                      width={50}
                      height={15}
                      fill={COLORS.white1}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default TrackTopSongs;

const styles = StyleSheet.create({
  top__title: {
    color: COLORS.white1,
    ...FONTS.h3,
    marginBottom: 25,
    paddingHorizontal: 16,
  },

  list__container: {
    flexWrap: 'wrap',
    height: SIZES.height / 1.8,
    paddingHorizontal: 16,
    rowGap: 35,
    columnGap: 15,
  },

  song__container: {
    flexDirection: 'row',
    width: SIZES.width / 1.16,
  },

  image__style: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.darkgrey,
  },

  image__container: {
    width: SIZES.width / 3.3,
    height: SIZES.width / 3.3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  play__button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 100,
    padding: 15,
  },

  apple_button: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: COLORS.black6,
    bottom: 0,
  },

  song__title: {
    ...FONTS.h3,
    color: COLORS.white1,
    width: SIZES.width / 2.5,
  },

  song__artist: {
    ...FONTS.m3,
    color: COLORS.white1,
    width: SIZES.width / 2.5,
  },
});
