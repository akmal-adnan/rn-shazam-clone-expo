// Root
export type TrackTopSongsResponse = {
  data: AppleMusicArtist[];
};

// Artist
export type AppleMusicArtist = {
  id: string;
  type: 'artists';
  href: string;
  attributes: ArtistAttributes;
  relationships: {
    albums: {
      href: string;
      data: AlbumReference[];
    };
  };
  views: {
    'top-songs': ArtistTopSongsView;
  };
  meta: {
    views: {
      order: string[];
    };
  };
};

// Artist attributes
export type ArtistAttributes = {
  artwork: Artwork;
  genreNames: string[];
  name: string;
  url: string;
};

// Artwork (used by both Artist and Song)
export type Artwork = {
  bgColor: string;
  hasP3: boolean;
  height: number;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
  url: string; // has {w}x{h} placeholders
  width: number;
};

// Album reference (inside relationships)
export type AlbumReference = {
  id: string;
  type: 'albums';
  href: string;
};

// Artist top songs view
export type ArtistTopSongsView = {
  href: string;
  next?: string;
  attributes: {
    title: string;
  };
  data: AppleMusicSong[];
};

// Song
export type AppleMusicSong = {
  id: string;
  type: 'songs';
  href: string;
  attributes: SongAttributes;
  meta?: {
    contentVersion: Record<string, number>;
  };
};

// Song attributes
export type SongAttributes = {
  albumName: string;
  artistName: string;
  artwork: Artwork;
  audioLocale: string;
  audioTraits: string[];
  composerName?: string;
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
  playParams: {
    id: string;
    kind: string;
  };
  previews: {
    url: string;
  }[];
  releaseDate: string; // ISO date
  trackNumber: number;
  url: string;
};
