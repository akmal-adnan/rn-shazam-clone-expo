import { queryKeys } from '@/src/api/queryKeys';
import shazamClient from '@/src/api/shazamClient';
import { TrackTopChartsResponse } from '@/src/components/modules/TrackTopCharts';
import { useQuery } from '@tanstack/react-query';

type Props = {
  country?: string;
  countryId?: string;
  limit?: number;
};

// fetch function
const fetchApi = async ({
  countryId = 'pl.92758f0134f34f67a96cef752e47dd16',
  limit = 3,
}: Props): Promise<TrackTopChartsResponse> => {
  const { data } = await shazamClient.get(
    `/services/amapi/v1/catalog/MY/playlists/${countryId}/tracks`,
    {
      params: {
        limit: `${limit}`,
        l: 'en-US',
        'relate[songs]': 'artists,music-videos',
      },
    }
  );
  return data;
};

// query hook
export const useGetTopTrackCharts = (props: Props) => {
  const { countryId = 'pl.92758f0134f34f67a96cef752e47dd16', limit = 3 } =
    props;

  return useQuery({
    queryKey: queryKeys.topTrackCharts(countryId, limit),
    queryFn: () => fetchApi({ countryId, limit }),
  });
};
