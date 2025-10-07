import { create } from 'zustand';

type PlayerState = {
  tracks: any[];
  currentTrack: any[];
  playbackState: boolean;
  isPlaying: boolean;

  setTracks: (tracks: any[]) => void;
  setCurrentTrack: (track: any) => void;
  setPlaybackState: (state: boolean) => void;
  setPlaying: (playing: boolean) => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  tracks: [],
  currentTrack: [],
  playbackState: false,
  isPlaying: false,

  setTracks: (val) => set({ tracks: val }),
  setCurrentTrack: (val) => set({ currentTrack: [val] }),
  setPlaybackState: (playbackState) => set({ playbackState }),
  setPlaying: (isPlaying) => set({ isPlaying }),
}));
