import { TrackMetaDataResponse } from '@/src/components/modules/TrackMetdaData';
import { TrackRelatedResponse } from '@/src/components/modules/TrackRelated';
import { addTracks } from '@/src/hooks/useAddTracks';
import TrackPlayer from 'react-native-track-player';
import { usePlayerStore } from '../store/usePlayerStore';

type Props = {
  trackRelated?: TrackRelatedResponse;
  trackMetaData?: TrackMetaDataResponse;
};

export const useHandlePlayTracks = ({ trackRelated, trackMetaData }: Props) => {
  const { setTracks, setCurrentTrack, setPlaying } = usePlayerStore();
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  const TRACK = trackRelated?.tracks
    ?.map((track) => ({
      id: track?.key,
      url: track?.hub?.actions?.find((action) => action.type === 'uri')?.uri,
      title: track?.title,
      artist: track?.subtitle,
      images: track?.images?.coverart,
    }))
    .filter((track) => track.images !== undefined && track.url !== undefined);

  const oriTrack = {
    id: trackMetaData?.key,
    url: trackMetaData?.hub?.actions?.find((action) => action.type === 'uri')
      ?.uri,
    title: trackMetaData?.title,
    artist: trackMetaData?.subtitle,
    images: trackMetaData?.images?.coverart ?? '',
  };

  const mergeTrack = [oriTrack].concat(TRACK ?? []);
  const handlePlayTracks = async () => {
    if (currentTrack?.id === trackMetaData?.key) {
      if (!isPlaying) {
        await TrackPlayer.reset();
        await addTracks(mergeTrack);
        setTracks(mergeTrack);
        setCurrentTrack(oriTrack);
        setPlaying(!isPlaying);
        await TrackPlayer.play();
      } else {
        setPlaying(!isPlaying);
        await TrackPlayer.pause();
      }
    } else {
      await TrackPlayer.reset();
      await addTracks(mergeTrack);
      setTracks(mergeTrack);
      setCurrentTrack(oriTrack);
      setPlaying(true);
      await TrackPlayer.play();
    }
  };

  return { handlePlayTracks };
};
