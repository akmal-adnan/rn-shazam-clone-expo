import { queryKeys } from '@/src/api/queryKeys';
import shazamClient from '@/src/api/shazamClient';
import { TrackMetaDataResponse } from '@/src/components/modules/TrackMetdaData';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type UseGetTrackMetaDataProps = {
  id?: number;
  enabled?: boolean;
};

const fetchApi = async (id?: number): Promise<TrackMetaDataResponse> => {
  if (!id) throw new Error('Track ID is required');
  const { data } = await shazamClient.get(
    `discovery/v5/en-US/MY/web/-/track/${id}?shazamapiversion=v3&video=v3`
  );
  return data;
};

export const useGetTrackMetaData = ({
  id,
  enabled = false,
}: UseGetTrackMetaDataProps = {}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.trackMetaData(id),
    queryFn: () => fetchApi(id),
    enabled: !!id && enabled,
  });

  const fetchTrackMetaData = async (id: number) => {
    return queryClient.ensureQueryData({
      queryKey: queryKeys.trackMetaData(id),
      queryFn: () => fetchApi(id),
    });
  };

  return { ...query, fetchTrackMetaData };
};
