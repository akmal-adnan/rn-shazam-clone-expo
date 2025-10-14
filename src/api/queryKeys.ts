export const queryKeys = {
  // Id get from topCountrySongs
  trackDetails: (id?: number) => ['trackDetails', id],

  // Value got from constant hardcoded
  topTrackCharts: (countryId: string, limit: number) => [
    'topCountrySongs',
    countryId,
    limit,
  ],

  // Id get from the track details
  trackMetaData: (id?: number) => ['trackMetaData', id],

  // Id from trackMetaData "artists": [{"adamid": "1478164763"}]
  trackTopFeatured: (id: number) => ['trackTopFeatured', id],

  //  Id from tack details
  trackRelated: (id?: number, startFrom?: number, pageSize?: number) => [
    'trackRelated',
    id,
    startFrom,
    pageSize,
  ],
};
