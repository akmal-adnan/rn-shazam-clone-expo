import { addTracks } from '@/src/hooks/useAddTracks';
import { usePlayerStore } from '@/src/store/usePlayerStore';
import { useCallback } from 'react';
import TrackPlayer, { State } from 'react-native-track-player';
import { AppleMusicSong } from '../components/modules/TrackTopSongs';

export type TrackItem = {
  id: string;
  url: string;
  title: string;
  artist: string;
  images: string;
};

export const useHandleTopTrackPlay = (currentTrackList?: AppleMusicSong[]) => {
  const { setTracks, setCurrentTrack, setPlaying } = usePlayerStore();
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const currentTrackId = currentTrack?.id;

  const TrackList = currentTrackList
    ?.map((track) => ({
      id: track.id,
      url: track.attributes.previews[0].url,
      title: track.attributes.name,
      artist: track.attributes.artistName,
      images: track.attributes.artwork.url
        .replace('{w}', '400')
        .replace('{h}', '400'),
    }))
    .filter((track) => track.images !== undefined && track.url !== undefined);

  const handleTopTrackPlay = useCallback(
    async (currentTrack: AppleMusicSong) => {
      const oriTrack = {
        id: currentTrack.id,
        url: currentTrack.attributes.previews[0].url,
        title: currentTrack.attributes.name,
        artist: currentTrack.attributes.artistName,
        images: currentTrack.attributes.artwork.url
          .replace('{w}', '400')
          .replace('{h}', '400'),
      };

      if (!TrackList) {
        return;
      }

      // Merge track with original list
      const mergeTrack = [oriTrack].concat(TrackList);
      // Remove duplicate tracks based on ID
      const uniqueTracks = mergeTrack.filter(
        (track, index, self) =>
          self.findIndex((t) => t.id === track.id) === index
      );

      const playerState = await TrackPlayer.getState();

      if (currentTrackId === oriTrack.id) {
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
      await addTracks(uniqueTracks);
      setTracks(uniqueTracks);
      setCurrentTrack(oriTrack);
      setPlaying(true);
      await TrackPlayer.play();
    },
    [TrackList, currentTrackId, setCurrentTrack, setPlaying, setTracks]
  );

  return { handleTopTrackPlay, currentTrackId, isPlaying };
};
