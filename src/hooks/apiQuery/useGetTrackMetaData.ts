import { queryKeys } from '@/src/api/queryKeys';
import shazamClient from '@/src/api/shazamClient';
import { TrackMetaDataResponse } from '@/src/components/modules/TrackMetdaData';
import { useQuery } from '@tanstack/react-query';

const fetchApi = async (id: number): Promise<TrackMetaDataResponse> => {
  const { data } = await shazamClient.get(
    `discovery/v5/en-US/MY/web/-/track/${id}?shazamapiversion=v3&video=v3`
  );
  return data;
};

export const useGetTrackMetaData = (id: number) => {
  return useQuery({
    queryKey: queryKeys.trackMetaData(id),
    queryFn: () => fetchApi(id),
    enabled: !!id,
  });
};
