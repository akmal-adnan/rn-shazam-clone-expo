import { COLORS, SIZES } from '@/constants';
import { usePlayerStore } from '@/hooks/usePlayerStore';
import { FontAwesome6 } from '@expo/vector-icons';

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';

const PlayerButton = ({ trackIndex, trackLength }: any) => {
  const { setPlaying } = usePlayerStore();
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const handlePlay = async () => {
    if (isPlaying === true) {
      setPlaying(false);
      await TrackPlayer.pause();
    } else {
      setPlaying(true);
      await TrackPlayer.play();
    }
  };

  return (
    <View>
      <View style={styles.player__button}>
        <TouchableOpacity
          onPress={() => {
            if (trackIndex < 1) {
              TrackPlayer.skip(trackLength - 1);
            } else {
              TrackPlayer.skipToPrevious();
            }
          }}
        >
          <FontAwesome6 name="backward-step" size={45} color={COLORS.orange} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[isPlaying ? styles.play__button : styles.play__button2]}
          onPress={() => handlePlay()}
        >
          <FontAwesome6
            name={isPlaying ? 'pause' : 'play'}
            size={36}
            color={COLORS.white1}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
          <FontAwesome6 name="forward-step" size={45} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayerButton;

const styles = StyleSheet.create({
  player__button: {
    width: SIZES.width,
    maxWidth: 220,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  play__button: {
    backgroundColor: COLORS.orange,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },

  play__button2: {
    backgroundColor: COLORS.orange,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    paddingLeft: 4,
  },
});
