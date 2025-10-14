import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import FloatButton from '@/src/components/ui/FloatButton';
import Header from '@/src/components/ui/Header';
import { COLORS, FONTS, SIZES, SVG } from '@/src/constants';
import { useGetTopTrackCharts } from '@/src/hooks/apiQuery/useGetTopTrackCharts';
import { useHandleTopTrackPlay } from '@/src/hooks/useHandleTopTrackPlay';
import { router } from 'expo-router';
import { Song } from '../modules/TrackTopCharts';

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList<Song>);

type Props = {
  countryId: string;
  country: string;
};

type RenderProps = {
  item: Song;
  index: number;
};

const SubCharts = ({ countryId, country }: Props) => {
  const scrollY = useSharedValue(0);
  const { data: currentList } = useGetTopTrackCharts({
    countryId,
    limit: 20,
  });
  const trackList = currentList?.data;

  const { handleTopTrackPlay, currentTrackId, isPlaying } =
    useHandleTopTrackPlay(trackList);

  const renderButton = () => (
    <View style={{ paddingVertical: 15, alignItems: 'center' }}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          paddingVertical: 14,
          paddingHorizontal: 120,
          backgroundColor: COLORS.blue1,
          borderRadius: 8,
        }}
      >
        <Text style={{ ...FONTS.h4, color: COLORS.white1 }}>Play All</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item, index }: RenderProps) => {
    const imageUrl = item?.attributes?.artwork.url
      .replace('{w}', '400')
      .replace('{h}', '400');

    const isTrackPlay = isPlaying && currentTrackId === item.id;

    return (
      <Animated.View entering={FadeIn}>
        <TouchableOpacity
          // onPress={() =>
          //   navigation.push('SongDetails', {
          //     songId: item?.id,
          //     songImage: imageUrl,
          //   })
          // }
          // onLongPress={() => console.log('Multiselect action')}

          onPress={() => router.push(`/SongDetails/${item.id}`)}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            paddingVertical: 16,
            paddingHorizontal: 16,
            position: 'relative',
          }}
        >
          <ImageBackground
            source={{
              uri: imageUrl,
            }}
            resizeMode="contain"
            imageStyle={{ borderRadius: 5 }}
            style={styles.song__cover}
          >
            <View
              style={{
                borderRadius: 5,
                backgroundColor: 'rgba(0,0,0,0.6)',
                justifyContent: 'center',
                alignItems: 'center',
                width: '22%',
                height: '22%',
              }}
            >
              <Text style={{ ...FONTS.m4, fontSize: 14, color: COLORS.white1 }}>
                {index + 1}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => handleTopTrackPlay(item)}
              activeOpacity={0.7}
              style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 100,
                padding: 14,
                marginTop: 10,
              }}
            >
              <Ionicons
                name={isTrackPlay ? 'pause' : 'play'}
                size={18}
                color={COLORS.white1}
              />
            </TouchableOpacity>
          </ImageBackground>

          {/* Descripiton */}
          <View
            style={{
              flex: 1,
              marginLeft: 16,
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text numberOfLines={1} style={styles.song__title}>
                {item?.attributes.name}
              </Text>
              <Text numberOfLines={1} style={styles.song__subtitle}>
                {item?.attributes.artistName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  paddingHorizontal: 9,
                  paddingVertical: 5,
                  borderRadius: 20,
                  backgroundColor: COLORS.black6,
                  bottom: 0,
                }}
              >
                <SVG.AppleMusicSVG
                  width={50}
                  height={15}
                  fill={COLORS.white1}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.5} style={{ marginRight: -5 }}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={24}
                  color={COLORS.icon1}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                bottom: 0,
                width: '100%',
                borderColor: COLORS.lightgrey,
                position: 'absolute',
                borderBottomWidth: 1,
                marginBottom: -15,
              }}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.main__container}>
      <Header country={country} scrollY={scrollY} />

      <ReanimatedFlatList
        ListHeaderComponent={renderButton}
        contentContainerStyle={{ paddingBottom: 50 }}
        bounces={false}
        scrollEventThrottle={16}
        data={trackList}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        onScroll={useAnimatedScrollHandler((event) => {
          scrollY.value = event.contentOffset.y;
        })}
      />

      {isPlaying && <FloatButton />}
    </View>
  );
};

export default SubCharts;

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: COLORS.white1,
  },

  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2,

    elevation: 5,
  },

  header__container: {
    zIndex: 2,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white1,
    paddingHorizontal: 16,
    height: 106,
  },

  header__text: {
    ...FONTS.m3,
    paddingLeft: 30,
    color: COLORS.black1,
  },

  song__cover: {
    width: SIZES.width / 3.3,
    height: SIZES.width / 3.3,
  },

  song__title: {
    ...FONTS.m4,
    fontSize: 16,
    color: COLORS.black1,
    width: SIZES.width / 2,
  },

  song__subtitle: {
    ...FONTS.p4,
    fontSize: 15,
    color: COLORS.icon2,
    paddingTop: 2,
    width: SIZES.width / 2,
  },
});
