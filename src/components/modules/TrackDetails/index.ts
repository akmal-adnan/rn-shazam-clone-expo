export type TrackDetailsResponse = {
  data: {
    id: string;
    type: 'shazam-songs';
  }[];
  resources: {
    'artist-highlights': Record<string, ArtistHighlight>;
    'track-highlights': Record<string, TrackHighlight>;
    'related-tracks': Record<string, RelatedTrack>;
    songs: Record<string, SongResource>;
    albums: Record<string, AlbumResource>;
    'shazam-artists': Record<string, ShazamArtist>;
    artists: Record<string, Artist>;
    'shazam-songs': Record<string, ShazamSongResource>;
  };
};

// ---------- Base Resource Types ----------

export type ArtistHighlight = {
  id: string;
  type: 'artist-highlights';
};

export type TrackHighlight = {
  id: string;
  type: 'track-highlights';
};

export type RelatedTrack = {
  id: string;
  type: 'related-tracks';
};

// Song resource (Apple Music song in Shazam)
export type SongResource = {
  id: string;
  type: 'songs';
  attributes: {
    hasLyrics: boolean;
    hasTimeSyncedLyrics: boolean;
    unitags: {
      namespace: string;
      tag: string;
      score: number;
    }[];
  };
};

export type AlbumResource = {
  id: string;
  type: 'albums';
  attributes: {
    artistName: string;
    name: string;
    releaseDate: string;
  };
};

export type ShazamArtist = {
  id: string;
  type: 'shazam-artists';
};

export type Artist = {
  id: string;
  type: 'artists';
  attributes: {
    name: string;
  };
};

// ---------- Shazam Song Resource ----------

export type ShazamSongResource = {
  id: string;
  type: 'shazam-songs';
  attributes: {
    type: string; // e.g. "MUSIC"
    title: string;
    artist: string;
    primaryArtist: string;
    label: string;
    explicit: boolean;
    isrc: string;
    webUrl: string;
    images: {
      artistAvatar: string;
      coverArt: string;
      coverArtHq: string;
    };
    artwork: {
      url: string;
      textColor1: string;
      textColor2: string;
      textColor3: string;
      textColor4: string;
      bgColor: string;
    };
    share: {
      subject: string;
      text: string;
      href: string;
      image: string;
      twitter: string;
      html: string;
      snapchat: string;
    };
    genres: {
      primary: string;
    };
    streaming: {
      preview: string;
      deeplink: string;
      store: string;
    };
    classicalAvailability: boolean;
  };
  relationships: {
    'artist-highlights': {
      data: { id: string; type: 'artist-highlights' }[];
    };
    'track-highlights': {
      data: { id: string; type: 'track-highlights' }[];
    };
    'related-tracks': {
      data: { id: string; type: 'related-tracks' }[];
    };
    songs: {
      data: { id: string; type: 'songs' }[];
    };
    albums: {
      data: { id: string; type: 'albums' }[];
    };
    'shazam-artists': {
      data: { id: string; type: 'shazam-artists' }[];
    };
    artists: {
      data: { id: string; type: 'artists' }[];
    };
  };
};
