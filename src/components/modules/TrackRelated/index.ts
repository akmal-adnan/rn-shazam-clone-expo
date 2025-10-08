// Root response
export type TrackRelatedResponse = {
  properties: Record<string, unknown>;
  tracks: ShazamTrack[];
  next?: string;
};

// Track
export type ShazamTrack = {
  layout: string;
  type: string; // "MUSIC"
  key: string;
  title: string;
  subtitle: string;
  share: TrackShare;
  images: TrackImages;
  hub: TrackHub;
  artists: TrackArtist[];
  url: string;
  highlightsurls: Record<string, unknown>;
  properties: Record<string, unknown>;
};

// Share info
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

// Images
export type TrackImages = {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
};

// Hub info (Apple Music etc.)
export type TrackHub = {
  type: string; // "APPLEMUSIC"
  image: string;
  actions: HubAction[];
  explicit: boolean;
  displayname: string;
  options: HubOption[];
};

// Hub action
export type HubAction = {
  name: string;
  type: string; // "applemusicplay" | "uri" | "applemusicopen"
  id?: string;
  uri?: string;
};

// Hub option
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

// Artist info
export type TrackArtist = {
  alias: string;
  id: string;
  adamid: string;
};
