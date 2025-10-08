import { queryKeys } from '@/src/api/queryKeys';
import shazamClient from '@/src/api/shazamClient';
import { useQuery } from '@tanstack/react-query';

const fetchApi = async (id: number) => {
  const { data } = await shazamClient.get(
    `services/amapi/v1/catalog/MY/artists/${id}?views=top-songs`
  );
  return data;
};

export const useGetTrackTopFeatured = (id: number) => {
  return useQuery({
    queryKey: queryKeys.trackTopFeatured(id),
    queryFn: () => fetchApi(id),
    enabled: !!id,
  });
};
