import { queryKeys } from '@/src/api/queryKeys';
import shazamClient from '@/src/api/shazamClient';
import { TrackRelatedResponse } from '@/src/components/modules/TrackRelated';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type Props = {
  id?: number;
  startFrom?: number;
  pageSize?: number;
  enabled?: boolean;
};

const fetchApi = async ({
  id,
  startFrom = 0,
  pageSize = 10,
}: Props): Promise<TrackRelatedResponse> => {
  if (!id) throw new Error('Track ID is required');
  const { data } = await shazamClient.get(
    `shazam/v3/en-US/MY/web/-/tracks/track-similarities-id-${id}?startFrom=${startFrom}&pageSize=${pageSize}`
  );
  return data;
};

export const useGetTrackRelated = ({
  id,
  startFrom = 0,
  pageSize = 10,
  enabled = false,
}: Props = {}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.trackRelated(id, startFrom, pageSize),
    queryFn: () => fetchApi({ id, startFrom, pageSize }),
    enabled: !!id && enabled,
  });

  const fetchTrackRelated = async (id: number) => {
    return queryClient.ensureQueryData({
      queryKey: queryKeys.trackRelated(id, startFrom, pageSize),
      queryFn: () => fetchApi({ id, startFrom, pageSize }),
    });
  };

  return { ...query, fetchTrackRelated };
};
