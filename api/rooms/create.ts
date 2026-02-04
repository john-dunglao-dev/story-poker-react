import api from '@/lib/axios';
import { AxiosResponse } from 'axios';
import { CreateRoomDto } from './models/create-room.dto';

export const createRoom = async (
  data: CreateRoomDto
): Promise<AxiosResponse> => {
  return await api.post('/rooms', data);
};
