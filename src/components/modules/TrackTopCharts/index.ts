export type TrackTopChartsResponse = {
  next: string;
  data: Song[];
};

export type Song = {
  id: string;
  type: 'songs';
  href: string;
  attributes: SongAttributes;
  relationships: SongRelationships;
  meta: SongMeta;
};

export type SongAttributes = {
  albumName: string;
  artistName: string;
  artwork: Artwork;
  audioLocale: string;
  audioTraits: string[];
  composerName: string;
  discNumber: number;
  durationInMillis: number;
  genreNames: string[];
  hasLyrics: boolean;
  hasTimeSyncedLyrics: boolean;
  isAppleDigitalMaster: boolean;
  isMasteredForItunes: boolean;
  isVocalAttenuationAllowed: boolean;
  isrc: string;
  name: string;
  playParams: PlayParams;
  previews: Preview[];
  releaseDate: string; // ISO date string
  trackNumber: number;
  url: string;
};

export type Artwork = {
  bgColor: string;
  hasP3: boolean;
  height: number;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
  url: string; // includes {w}x{h} placeholders
  width: number;
};

export type PlayParams = {
  id: string;
  kind: string; // e.g. "song"
};

export type Preview = {
  url: string;
};

export type SongRelationships = {
  artists: {
    href: string;
    data: Artist[];
  };
  'music-videos': {
    href: string;
    data: MusicVideo[];
  };
};

export type Artist = {
  id: string;
  type: 'artists';
  href: string;
};

export type MusicVideo = {
  id: string;
  type: 'music-videos';
  href: string;
};

export type SongMeta = {
  contentVersion: {
    MZ_INDEXER: number;
    RTCI: number;
  };
};
