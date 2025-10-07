import { useEffect, useState } from 'react';
import TrackPlayer, { Event } from 'react-native-track-player';

export const useGetTrackIndex = () => {
  const [trackIndex, setTrackIndex] = useState<number>(0);

  useEffect(() => {
    async function setup() {
      await getCurrentTrackInfo();
    }
    setup();

    const listener = TrackPlayer.addEventListener(
      Event.PlaybackActiveTrackChanged,
      () => {
        getCurrentTrackInfo();
      }
    );

    return () => {
      listener.remove();
    };
  }, []);

  const getCurrentTrackInfo = async () => {
    try {
      const index = await TrackPlayer.getActiveTrackIndex();
      setTrackIndex(index ?? 0);
    } catch (error) {
      console.log('Error retrieving current tracks:', error);
    }
  };

  return { trackIndex, setTrackIndex };
};
