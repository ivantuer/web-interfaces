import apiClient from './axios';

export interface BaseAlarmBody {
  active: boolean;
  time: string;
}

export interface FullAlarmBody extends BaseAlarmBody {
  id: string;
}

const getAlarms = () => {
  return apiClient.get<FullAlarmBody[]>('/alarm');
};

const addAlarm = (body: BaseAlarmBody) => {
  return apiClient.post<FullAlarmBody>('/alarm', body);
};

const updateAlarm = (body: FullAlarmBody) => {
  return apiClient.put<FullAlarmBody>('/alarm', body);
};

const deleteAlarm = (id: string) => {
  return apiClient.delete(`/alarm/${id}`);
};

export { addAlarm, deleteAlarm, getAlarms, updateAlarm };
