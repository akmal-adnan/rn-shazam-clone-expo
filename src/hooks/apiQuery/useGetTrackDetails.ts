import { queryKeys } from '@/src/api/queryKeys';
import shazamCoreClient from '@/src/api/shazamCoreClient';
import { useQuery } from '@tanstack/react-query';

const fetchApi = async (trackId: number) => {
  const { data } = await shazamCoreClient.get('/v2/tracks/details', {
    params: { track_id: `${trackId}` },
  });
  return data;
};

export const useGetTrackDetails = (trackId: number) =>
  useQuery({
    queryKey: queryKeys.trackDetails(trackId),
    queryFn: () => fetchApi(trackId),
    enabled: !!trackId,
  });
