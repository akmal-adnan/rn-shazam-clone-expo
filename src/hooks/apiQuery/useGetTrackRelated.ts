import { queryKeys } from '@/src/api/queryKeys';
import shazamClient from '@/src/api/shazamClient';
import { TrackRelatedResponse } from '@/src/components/modules/TrackRelated';
import { useQuery } from '@tanstack/react-query';

type Props = {
  id: number;
  startFrom?: number;
  pageSize?: number;
};

// fetch function
const fetchApi = async ({
  id,
  startFrom = 0,
  pageSize = 10,
}: Props): Promise<TrackRelatedResponse> => {
  const { data } = await shazamClient.get(
    `shazam/v3/en-US/MY/web/-/tracks/track-similarities-id-${id}?startFrom=${startFrom}&pageSize=${pageSize}`,
    {
      params: {
        startFrom,
        pageSize,
      },
    }
  );
  return data;
};

// query hook
export const useGetTrackRelated = ({
  id,
  startFrom = 0,
  pageSize = 10,
}: Props) => {
  return useQuery({
    queryKey: queryKeys.trackRelated(id, startFrom, pageSize),
    queryFn: () => fetchApi({ id, pageSize, startFrom }),
  });
};
