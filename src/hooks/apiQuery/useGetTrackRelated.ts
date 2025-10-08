import { queryKeys } from '@/src/api/queryKeys';
import shazamClient from '@/src/api/shazamClient';
import { useQuery } from '@tanstack/react-query';

type Props = {
  id: number;
  startFrom?: number;
  pageSize?: number;
};

// fetch function
const fetchTopCountrySongs = async ({
  id,
  startFrom = 0,
  pageSize = 10,
}: Props) => {
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
    queryFn: () => fetchTopCountrySongs({ id, pageSize, startFrom }),
  });
};
