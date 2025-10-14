import { queryKeys } from '@/src/api/queryKeys';
import shazamClient from '@/src/api/shazamClient';
import { TrackYoutubeResponse } from '@/src/components/modules/TrackYoutube';
import { useQuery } from '@tanstack/react-query';

type Props = {
  id: number;
  nameQuery: string;
};

const fetchApi = async ({
  id,
  nameQuery,
}: Props): Promise<TrackYoutubeResponse> => {
  if (!id && !nameQuery) throw new Error('Track ID is required');
  const { data } = await shazamClient.get(
    `/video/v3/-/-/web/${id}/youtube/video?q=${nameQuery}`
  );
  return data;
};

export const useGetYoutubeVideo = ({ id, nameQuery }: Props) => {
  return useQuery({
    queryKey: queryKeys.trackYoutube(id, nameQuery),
    queryFn: () => fetchApi({ id, nameQuery }),
    enabled: !!id && !!nameQuery,
  });
};
