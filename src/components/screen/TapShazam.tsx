import RingAnimation from '@/src/components/ui/RingAnimation';
import RingOuter from '@/src/components/ui/RingOuter';
import { COLORS, FONTS, LOTTIE, SIZES, SVG } from '@/src/constants';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Lottie from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedPress = Animated.createAnimatedComponent(Pressable);

const TapShazam = () => {
  const inset = useSafeAreaInsets();
  const pulse = useSharedValue(1);

  const [showText, setText] = useState(true);

  // Text interval
  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(!showText);
    }, 5000); // Duration to display each set of text

    return () => {
      clearTimeout(timeout);
    };
  }, [showText]);

  // Pulse animation
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1
    );
  }, [pulse]);

  // Define the pulsating animation
  const pulseAnimation = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <LinearGradient
      colors={[COLORS.blue4, COLORS.blue3]}
      style={styles.main__container}
    >
      {/* Close button */}
      <Pressable
        style={{
          marginTop: inset.top + 5,
          marginLeft: 16,
          position: 'absolute',
          zIndex: 1,
        }}
        onPress={() => router.back()}
      >
        <Icons name="close" size={32} color={COLORS.white1} />
      </Pressable>

      {/* Shazam logo */}
      <View style={styles.shazam__container}>
        {[...Array(3).keys()].map((_, index) => (
          <RingAnimation key={index} index={index} />
        ))}

        {[...Array(2).keys()].map((_, index) => (
          <RingOuter key={index} index={index} />
        ))}

        <View>
          <AnimatedPress
            style={[styles.shazam__logo, styles.shadow, pulseAnimation]}
            onPress={() => {
              router.back();
            }}
          >
            <View>
              <SVG.ShazamLogo2SVG
                width={110}
                height={110}
                fill={COLORS.white1}
              />
            </View>
          </AnimatedPress>
        </View>
      </View>

      {/* Render text */}
      <Animated.View
        entering={FadeInDown.delay(400)}
        style={{
          marginTop: SIZES.height / 4.5,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Lottie
            source={LOTTIE.WaveLoading}
            autoPlay
            loop
            style={{
              width: 25,
              height: 25,
              marginBottom: 8,
            }}
          />
        </View>

        {showText && (
          <Animated.View
            style={{ alignItems: 'center' }}
            entering={FadeInDown}
            exiting={FadeOutUp}
          >
            <Text style={{ ...FONTS.m2, color: COLORS.white1 }}>
              Listening for music
            </Text>
            <Text style={{ ...FONTS.p4, color: COLORS.icon1 }}>
              Make sure your device can hear the song clearly
            </Text>
          </Animated.View>
        )}

        {!showText && (
          <Animated.View
            style={{ alignItems: 'center' }}
            entering={FadeInDown}
            exiting={FadeOutUp}
            layout={Layout}
          >
            <Text style={{ ...FONTS.m2, color: COLORS.white1 }}>
              Searching for a match
            </Text>
            <Text style={{ ...FONTS.p4, color: COLORS.icon1 }}>
              Please Wait
            </Text>
          </Animated.View>
        )}
      </Animated.View>
    </LinearGradient>
  );
};

export default TapShazam;

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
  },

  shadow: {
    shadowColor: COLORS.blue2,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.65,

    elevation: 8,
  },

  shazam__container: {
    marginTop: SIZES.height / 3.7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shazam__logo: {
    borderWidth: 0.3,
    borderColor: COLORS.white1,
    backgroundColor: '#4FB3FE',
    padding: 30,
    borderRadius: 1000,
  },
});
