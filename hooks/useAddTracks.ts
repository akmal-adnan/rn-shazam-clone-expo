import TrackPlayer, { RepeatMode } from 'react-native-track-player';

export async function addTracks(tracks: any) {
  await TrackPlayer.add(tracks);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}
