import clientApi from '@/old-lib/axios-client';

export const getRoomDetails = async (slug: string): Promise<any> => {
  return clientApi.get(`/rooms/${slug}`);
};
