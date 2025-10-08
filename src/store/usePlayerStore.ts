import { create } from 'zustand';

export type CurrentTrackProps = {
  id: string;
  url: string;
  title: string;
  artist: string;
  images: string;
};

type PlayerState = {
  tracks: CurrentTrackProps[];
  currentTrack: CurrentTrackProps | null;
  playbackState: boolean;
  isPlaying: boolean;

  setTracks: (tracks: any[]) => void;
  setCurrentTrack: (track: any) => void;
  setPlaybackState: (state: boolean) => void;
  setPlaying: (playing: boolean) => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  tracks: [],
  currentTrack: null,
  playbackState: false,
  isPlaying: false,

  setTracks: (val) => set({ tracks: val }),
  setCurrentTrack: (val) => set({ currentTrack: val }),
  setPlaybackState: (playbackState) => set({ playbackState }),
  setPlaying: (isPlaying) => set({ isPlaying }),
}));
