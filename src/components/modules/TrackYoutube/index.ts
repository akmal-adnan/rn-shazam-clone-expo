export type TrackYoutubeResponse = {
  caption: string;
  image: {
    dimensions: {
      width: number;
      height: number;
    };
    url: string;
  };
  actions: {
    name: string;
    type: string;
    uri: string;
  }[];
};
