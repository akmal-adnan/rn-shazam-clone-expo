import ApplePlayButton from '@/src/components/ui/ApplePlayButton';
import FloatButton from '@/src/components/ui/FloatButton';
import TrackRelatedSongs from '@/src/components/ui/TrackRelatedSongs';
import TrackTopSongs from '@/src/components/ui/TrackTopSongs';
import TrackYoutube from '@/src/components/ui/TrackYoutube';
import { COLORS, DATA, FONTS, SIZES, SVG } from '@/src/constants';
import { useGetTrackMetaData } from '@/src/hooks/apiQuery/useGetTrackMetaData';
import { useGetTrackRelated } from '@/src/hooks/apiQuery/useGetTrackRelated';
import { useHandlePlayTracks } from '@/src/hooks/useHandlePlayTracks';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCom from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  FadeIn,
  LinearTransition,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  id: number;
};

const TrackInfoLabel = ['Album', 'Label', 'Released'];

const SongDetails = ({ id }: Props) => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  // const { data: trackDetails } = useGetTrackDetails(id);
  // const trackDetailsId = Number(trackDetails?.data[0].id);

  const trackDetailsId = 828086589; // If shazam core api key reached limit

  const { data: trackMetaData } = useGetTrackMetaData({
    id: trackDetailsId,
    enabled: true,
  });
  const { data: trackRelated } = useGetTrackRelated({
    id: trackDetailsId,
    enabled: true,
  });
  const songShazamCount = DATA.TotalShazams;

  const { handlePlayTracks, currentTrackId, isPlaying } = useHandlePlayTracks();

  const isTrackPlay = isPlaying && currentTrackId === trackMetaData?.key;

  const animateHeader = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [280, 440],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      backgroundColor: `rgba(18,18,18, ${opacity})`,
      borderBottomColor: `rgba(44,44,44, ${opacity})`,
    };
  });

  const titleOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [436, 460],
      [0, 1],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  const iconOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [100, 260],
      [1, 0],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  const renderHeader = () => (
    <Animated.View
      style={[
        animateHeader,
        styles.header__container,
        { paddingTop: insets.top },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color={COLORS.white1} />
        </TouchableOpacity>

        <Animated.Text
          numberOfLines={1}
          style={[titleOpacity, styles.header__title]}
        >
          {trackMetaData?.title}
        </Animated.Text>
      </View>

      <Animated.View
        style={[iconOpacity, { flexDirection: 'row', alignItems: 'center' }]}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          activeOpacity={0.6}
        >
          <MaterialCom name="playlist-music" size={30} color={COLORS.white1} />
          <Text style={styles.header__text}>LYRICS</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6}>
          <Ionicons
            name="share-social-sharp"
            size={25}
            color={COLORS.white1}
            style={{ paddingRight: 30, paddingLeft: 20 }}
          />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6}>
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.icon1} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );

  const renderItemTop = () => (
    <LinearGradient
      colors={[
        'rgba(0,0,0, 0.2)',
        'rgba(0,0,0, 0.3)',
        'rgba(0,0,0, 0.65)',
        'rgba(0,0,0, 1)',
      ]}
      style={{
        height: SIZES.height / 1.13,
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text
            style={{
              color: COLORS.white1,
              ...FONTS.h1,
              paddingBottom: 5,
              maxWidth: SIZES.width / 1.3,
            }}
          >
            {trackMetaData?.title}
          </Text>
          <Text
            style={{
              color: COLORS.icon2,
              ...FONTS.p4,
              paddingBottom: 5,
              maxWidth: SIZES.width / 1.5,
            }}
          >
            {trackMetaData?.subtitle}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 10,
            }}
          >
            <SVG.ShazamLogoSVG width={15} height={15} fill={COLORS.icon2} />
            <Text
              style={{ color: COLORS.darkgrey, ...FONTS.p5, paddingLeft: 5 }}
            >
              {songShazamCount?.total} Shazams
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handlePlayTracks({ trackMetaData, trackRelated })}
          activeOpacity={0.7}
          style={{
            backgroundColor: 'rgba(212,212,212,0.13)',
            borderRadius: 100,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 55,
          }}
        >
          <Ionicons
            name={isTrackPlay ? 'pause' : 'play'}
            size={21}
            color={COLORS.white1}
          />
        </TouchableOpacity>
      </View>

      <ApplePlayButton />
    </LinearGradient>
  );

  const renderFooter = () => (
    <View
      style={{
        backgroundColor: COLORS.black5,
        paddingVertical: 35,
        paddingHorizontal: 16,
        rowGap: 15,
      }}
    >
      <Text style={{ ...FONTS.h3, color: COLORS.white1, paddingBottom: 20 }}>
        TRACK INFORMATION
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.trackinfo__label}>Track :</Text>
        <Text style={styles.trackinfo__text}>{trackMetaData?.title}</Text>
      </View>

      <View style={{ height: 1, backgroundColor: COLORS.black6 }} />

      {TrackInfoLabel.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.trackinfo__label}>{item} :</Text>
            <Text style={styles.trackinfo__text}>
              {trackMetaData?.sections?.[0]?.metadata?.[index]?.text}
            </Text>
          </View>

          {index !== 2 && (
            <View style={{ height: 1, backgroundColor: COLORS.black6 }} />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  const shareButton = () => (
    <View
      style={{
        backgroundColor: COLORS.black1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 35,
        paddingBottom: 90,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.blue1,
          paddingVertical: 13,
          paddingHorizontal: 100,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: COLORS.white1, ...FONTS.h3 }}>Share song</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={{
        uri: trackMetaData?.images?.background,
      }}
      resizeMode="cover"
      imageStyle={{
        width: SIZES.width,
        height: SIZES.height / 1.7,
      }}
      style={{ backgroundColor: COLORS.black1 }}
    >
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      {/* Top Header */}
      {renderHeader()}

      <LinearGradient
        colors={[
          'rgba(0,0,0, 0)',
          'rgba(0,0,0, 0)',
          'rgba(0,0,0, 0.95)',
          'rgba(0,0,0, 1)',
          'rgba(0,0,0, 1)',
        ]}
        style={styles.linear__bottom}
      />

      {/* For auto video player */}
      <Animated.View entering={FadeIn.delay(1200)}>
        {/* <TrackVideo
          videoUrl={trackMetaData?.highlightsurls?.trackhighlighturl}
        /> */}
      </Animated.View>

      <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        onScroll={useAnimatedScrollHandler((event) => {
          scrollY.value = event.contentOffset.y;
        })}
      >
        {renderItemTop()}

        {trackMetaData?.artists[0].adamid && (
          <Animated.View layout={LinearTransition}>
            <TrackTopSongs adamid={trackMetaData.artists[0].adamid} />
          </Animated.View>
        )}

        <Animated.View layout={LinearTransition}>
          {trackMetaData?.sections[2] && (
            <TrackYoutube
            // url={trackMetaData?.sections[2].youtubeurl}
            />
          )}
        </Animated.View>

        {trackMetaData && trackRelated && (
          <Animated.View layout={LinearTransition}>
            <TrackRelatedSongs trackRelated={trackRelated} />
          </Animated.View>
        )}

        <Animated.View layout={LinearTransition}>
          {renderFooter()}
          {shareButton()}
        </Animated.View>
      </Animated.ScrollView>

      {isPlaying && <FloatButton />}
    </ImageBackground>
  );
};

export default SongDetails;

const styles = StyleSheet.create({
  header__container: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 106,
    borderWidth: 0.5,
  },

  header__text: {
    ...FONTS.m5,
    fontSize: 15,
    paddingLeft: 3,
    color: COLORS.white1,
  },

  header__title: {
    ...FONTS.m5,
    fontSize: 15,
    paddingLeft: 3,
    color: COLORS.white1,
    marginLeft: 34,
    maxWidth: SIZES.width / 1.5,
    position: 'absolute',
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

  linear__bottom: {
    position: 'absolute',
    width: '100%',
    height: SIZES.height / 1.22,
    bottom: 0,
  },

  trackinfo__label: { ...FONTS.m4, color: COLORS.darkgrey },

  trackinfo__text: {
    ...FONTS.m4,
    color: COLORS.white1,
    maxWidth: SIZES.width / 1.3,
    textAlign: 'right',
  },
});
