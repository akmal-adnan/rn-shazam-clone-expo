export type TrackMetaDataResponse = {
  layout: string;
  type: string; // e.g. "MUSIC"
  key: string;
  title: string;
  subtitle: string;
  images: TrackImages;
  share: TrackShare;
  hub: TrackHub;
  sections: Section[];
  url: string;
  artists: TrackArtist[];
  alias: string;
  genres: {
    primary: string;
  };
  urlparams: Record<string, string>;
  highlightsurls: Record<string, unknown>;
  relatedtracksurl: string;
  albumadamid: string;
  trackadamid: string;
  releasedate: string; // e.g. "19-06-2025"
  isrc: string;
};

export type TrackImages = {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
};

export type TrackShare = {
  subject: string;
  text: string;
  href: string;
  image: string;
  twitter: string;
  html: string;
  avatar: string;
  snapchat: string;
};

export type TrackHub = {
  type: string; // "APPLEMUSIC"
  image: string;
  actions: HubAction[];
  explicit: boolean;
  displayname: string;
  options: HubOption[];
};

export type HubAction = {
  name: string;
  type: string; // "applemusicplay" | "uri" | "applemusicopen" etc.
  id?: string;
  uri?: string;
};

export type HubOption = {
  caption: string;
  actions: HubAction[];
  beacondata: {
    type: string;
    providername: string;
  };
  image: string;
  type: string;
  listcaption: string;
  overflowimage: string;
  colouroverflowimage: boolean;
  providername: string;
};

// export type Section = SongSection | RelatedSection;

export type Section = {
  type: 'SONG' | 'RELATED';
  tabname: string;
  metadata?: Metadata[];
  url?: string;
  metapages?: MetaPage[];
};

export type SongSection = {
  type: 'SONG';
  metapages: MetaPage[];
  tabname: string; // "Song"
  metadata: Metadata[];
};

export type RelatedSection = {
  type: 'RELATED';
  url: string;
  tabname: string; // "Related"
};

export type MetaPage = {
  image: string;
  caption: string;
};

export type Metadata = {
  title: string;
  text: string;
};

export type TrackArtist = {
  alias: string;
  id: string;
  adamid: string;
};
