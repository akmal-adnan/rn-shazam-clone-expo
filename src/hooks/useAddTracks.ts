import TrackPlayer from 'react-native-track-player';

export async function addTracks(tracks: any) {
  await TrackPlayer.add(tracks);
}
