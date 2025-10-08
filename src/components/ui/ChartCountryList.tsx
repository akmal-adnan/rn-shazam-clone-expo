import { COLORS, FONTS, SIZES } from '@/src/constants';
import { useGetTopTrackCharts } from '@/src/hooks/apiQuery/useGetTopTrackCharts';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CountryItem } from '../modules/CountryList';

type Props = {
  item: CountryItem;
};

const ChartCountryList: React.FC<Props> = ({ item }) => {
  const { data: DATA } = useGetTopTrackCharts({
    countryId: item.listid,
    limit: 3,
  });

  const topTrackData = DATA?.data;

  return (
    <View key={item.key} style={[styles.charts__group, styles.shadow2]}>
      <View style={styles.charts__text}>
        <Text style={styles.charts__title}>{item?.country} Chart</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          //   onPress={() =>
          //     navigation.push('SubCharts', {
          //       country: item?.country,
          //       listid: item?.listid,
          //     })
          //   }

          onPress={() => router.push('/trackChart/123')}
        >
          <Text style={styles.see__all}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
        {topTrackData?.map((song, index) => {
          const imageUrl = song?.attributes?.artwork.url
            .replace('{w}', '400')
            .replace('{h}', '400');

          return (
            <TouchableOpacity
              //   onPress={() =>
              //     navigation.push('SongDetails', { songId: song?.id })
              //   }
              onPress={() => router.navigate('/SongDetailsScreen')}
              activeOpacity={0.7}
              key={song.id}
              style={{ marginRight: index < 2 ? 10 : 0 }}
            >
              <Image
                source={{ uri: imageUrl }}
                resizeMode="contain"
                style={styles.song__cover}
              />
              <Text numberOfLines={1} style={styles.song__title}>
                {song.attributes.name}
              </Text>
              <Text numberOfLines={1} style={styles.song__subtitle}>
                {song.attributes.artistName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ChartCountryList;

const styles = StyleSheet.create({
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

  shadow2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  charts__group: {
    backgroundColor: COLORS.white1,
    paddingHorizontal: 16,
    marginTop: 10,
  },

  charts__text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  charts__title: { ...FONTS.m4, color: COLORS.icon2 },

  see__all: { ...FONTS.m5, color: COLORS.blue1 },

  song__cover: {
    width: SIZES.width / 3.45,
    height: SIZES.width / 3.45,
    borderRadius: 5,
  },

  song__title: {
    ...FONTS.m4,
    fontSize: 16,
    color: COLORS.black1,
    paddingTop: 8,
    width: 110,
  },

  song__subtitle: {
    ...FONTS.p4,
    fontSize: 15,
    color: COLORS.icon2,
    paddingTop: 2,
    width: 110,
  },
});
