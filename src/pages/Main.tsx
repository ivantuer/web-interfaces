import 'react-toastify/dist/ReactToastify.css';

import { Box, Button } from '@mui/material';
import { isEqual, setHours, setMinutes, setSeconds } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { Alarm } from '../components/Alarm';
import {
  addAlarm,
  deleteAlarm,
  FullAlarmBody,
  getAlarms,
  updateAlarm,
} from '../services/alarm';

const initialTime = new Date();

const getDateFromTimeString = (time: string) => {
  const [hours, minutes, seconds] = time.split(':');

  const date = setSeconds(
    setMinutes(setHours(new Date(), +hours), +minutes),
    +seconds
  );

  return date;
};

export const Main = () => {
  const [alarms, setAlarms] = useState<Array<FullAlarmBody>>([]);

  const [currentTime, setCurrentTime] = useState(
    `${initialTime.getHours()}:${initialTime.getMinutes()}:${initialTime.getSeconds()}`
  );

  const createAlarm = useCallback(async () => {
    const alarm = await addAlarm({ active: false, time: '00:00:00' });
    setAlarms((prev) => [...prev, alarm.data]);
  }, [setAlarms]);

  const removeAlarm = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const id = e.currentTarget.dataset.id as string;

      console.log('DELETING', id);
      await deleteAlarm(id);
      setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
    },
    [setAlarms]
  );

  const changeAlarmStatus = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = e.target.id;
      const alarmToUpdate = alarms.find(
        (alarm) => alarm.id === id
      ) as FullAlarmBody;

      const updatedAlarm = await updateAlarm({
        ...alarmToUpdate,
        active: !alarmToUpdate.active,
      });

      setAlarms((prev) =>
        prev.map((alarm) => (alarm.id !== id ? alarm : updatedAlarm.data))
      );
    },
    [setAlarms, alarms]
  );

  const changeTime = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = e.currentTarget?.dataset?.id;

      const alarmToUpdate = alarms.find(
        (alarm) => alarm.id === id
      ) as FullAlarmBody;

      updateAlarm({
        ...alarmToUpdate,
        time: e.target.value,
      });

      setAlarms((prev) =>
        prev.map((alarm) =>
          alarm.id !== id ? alarm : { ...alarmToUpdate, time: e.target.value }
        )
      );
    },
    [setAlarms, alarms]
  );

  useEffect(() => {
    const timeout = () => {
      const date = new Date();
      setCurrentTime(
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      );
    };

    const interval = setInterval(timeout, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [setCurrentTime]);

  useEffect(() => {
    alarms.forEach((al) => {
      if (
        al.active &&
        isEqual(
          getDateFromTimeString(currentTime),
          getDateFromTimeString(al.time)
        )
      ) {
        toast(`Your timer for ${currentTime} is expired`);
      }
    });
  }, [currentTime, alarms]);

  useEffect(() => {
    (async () => {
      const alarms = await getAlarms();
      console.log(alarms);
      setAlarms(alarms.data);
    })();
    // .then((alarms) => setAlarms(alarms.data));
  }, []);

  return (
    <Box minHeight="100vh" px="4em" pt="1em">
      <Box
        display="flex"
        mb="2em"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button data-testid="add-button" onClick={createAlarm}>
          Add New Alarm
        </Button>
        {currentTime}
      </Box>

      {alarms.map(({ id, active, time }) => (
        <Alarm
          onChangeTime={changeTime}
          id={id}
          time={time}
          active={active}
          onChangeStatus={changeAlarmStatus}
          onDelele={removeAlarm}
          key={id}
        />
      ))}
      <ToastContainer />
    </Box>
  );
};
