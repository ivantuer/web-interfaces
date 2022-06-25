import {Alert, StyleSheet} from 'react-native';
import { isEqual, setHours, setMinutes, setSeconds } from 'date-fns';

import {  View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {Button, } from "@ui-kitten/components";
import {useCallback, useEffect, useState} from "react";
import {addAlarm, deleteAlarm, FullAlarmBody, getAlarms, updateAlarm} from "../services/alarm";
import {Alarm} from "../components/Alarm";


const initialTime = new Date();

const getDateFromTimeString = (time: string) => {
  const [hours, minutes, seconds] = time.split(':');

  const date = setSeconds(
      setMinutes(setHours(new Date(), +hours), +minutes),
      +seconds
  );

  return date;
};


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [alarms, setAlarms] = useState<Array<FullAlarmBody>>([{id: '1', time: '00:00:00', active: false}]);

  const [currentTime, setCurrentTime] = useState(
      `${initialTime.getHours()}:${initialTime.getMinutes()}:${initialTime.getSeconds()}`
  );

  const createAlarm = useCallback(async () => {
    const alarm = await addAlarm({ active: false, time: '00:00:00' });
    setAlarms((prev) => [...prev, alarm.data]);
  }, [setAlarms]);

  const removeAlarm = useCallback(
      async (id:string) => {
        await deleteAlarm(id);
        setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
      },
      [setAlarms]
  );

  const changeAlarmStatus = useCallback(
      async ({id, newStatus}: {id: string, newStatus: boolean}) => {
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
      async ({id, newTime}: {id: string, newTime: string}) => {
        const alarmToUpdate = alarms.find(
            (alarm) => alarm.id === id
        ) as FullAlarmBody;

        updateAlarm({
          ...alarmToUpdate,
          time: newTime,
        });

        setAlarms((prev) =>
            prev.map((alarm) =>
                alarm.id !== id ? alarm : { ...alarmToUpdate, time:newTime }
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
        console.log(currentTime, al.time )
      if (
          al.active &&
          isEqual(
              getDateFromTimeString(currentTime),
              getDateFromTimeString(al.time)
          )
      ) {
          Alert.alert(
              "Alarm",
              `Your timer for ${currentTime} is expired`,
              [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
          );
      }
    });
  }, [currentTime, alarms]);

  useEffect(() => {
    (async () => {
      const alarms = await getAlarms();
      setAlarms(alarms.data);
    })();
  }, []);

 return (
    <View style={styles.container}>
      <Button onPress={createAlarm} style={{width: '90%', marginHorizontal: '5%', marginTop: 32}}>Add Alarm</Button>

        {alarms.map(({ id, active, time }) => (
            <Alarm
                onChangeTime={changeTime}
                id={id}
                time={time}
                active={active}
                onChangeStatus={changeAlarmStatus}
                onDelete={removeAlarm}
                key={id}
            />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  flexDirection: 'column'
  },

});
