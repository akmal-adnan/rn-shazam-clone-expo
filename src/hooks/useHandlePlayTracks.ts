import { TrackMetaDataResponse } from '@/src/components/modules/TrackMetdaData';
import { TrackRelatedResponse } from '@/src/components/modules/TrackRelated';
import { addTracks } from '@/src/hooks/useAddTracks';
import { useCallback } from 'react';
import TrackPlayer, { State } from 'react-native-track-player';
import { usePlayerStore } from '../store/usePlayerStore';

type HandlePlayParams = {
  trackMetaData?: TrackMetaDataResponse;
  trackRelated?: TrackRelatedResponse;
};

export const useHandlePlayTracks = () => {
  const { setTracks, setCurrentTrack, setPlaying } = usePlayerStore();
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const currentTrackId = currentTrack?.id;

  const handlePlayTracks = useCallback(
    async ({ trackMetaData, trackRelated }: HandlePlayParams) => {
      if (!trackMetaData) return console.warn('Missing track metadata');

      const oriTrack = {
        id: trackMetaData.key,
        url: trackMetaData.hub?.actions?.find((a) => a.type === 'uri')?.uri,
        title: trackMetaData.title,
        artist: trackMetaData.subtitle,
        images: trackMetaData.images?.coverart ?? '',
      };

      if (!oriTrack.url) {
        console.warn('Missing playable URL for this track');
        return;
      }

      const TRACK =
        trackRelated?.tracks
          ?.map((track) => ({
            id: track?.key,
            url: track?.hub?.actions?.find((a) => a.type === 'uri')?.uri,
            title: track?.title,
            artist: track?.subtitle,
            images: track?.images?.coverart,
          }))
          .filter((t) => t.url && t.images) ?? [];

      const mergeTrack = [oriTrack, ...TRACK];

      const playerState = await TrackPlayer.getState();

      if (currentTrackId === trackMetaData.key) {
        if (playerState === State.Playing) {
          await TrackPlayer.pause();
          setPlaying(false);
        } else {
          await TrackPlayer.play();
          setPlaying(true);
        }
        return;
      }

      await TrackPlayer.reset();
      await addTracks(mergeTrack);
      setTracks(mergeTrack);
      setCurrentTrack(oriTrack);
      setPlaying(true);
      await TrackPlayer.play();
    },
    [currentTrackId, setTracks, setCurrentTrack, setPlaying]
  );

  return { handlePlayTracks, currentTrackId };
};
