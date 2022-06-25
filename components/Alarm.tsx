/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { FC } from 'react';
import {View} from "react-native";
import {Button, Input, Toggle} from "@ui-kitten/components";

interface AlarmProps {
  onDelete: (id:string) => void;
  onChangeStatus: ({id, newStatus}: {id: string, newStatus: boolean}) => Promise<void>;
  onChangeTime: ({id, newTime}: {id: string, newTime: string}) => Promise<void>;
  active: boolean;
  id: string;
  time: string;
}

export const Alarm: FC<AlarmProps> = ({
                                        onDelete,
  onChangeStatus,
  onChangeTime,
  id,
  active,
  time,
}) => {
  const value = time.replace(/:/g, '')?.match(/.{1,2}/g)?.join(':')

  return (
    <View
        style={{display:"flex",
marginTop: 24,
          alignItems:"center",flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginHorizontal: '5%'}}

    >
      <Toggle checked={active} onChange={(newStatus) => onChangeStatus({id, newStatus})}>
      </Toggle>
      <Input value={value} onChangeText={(newTime)=>newTime.length > 8 ? null:onChangeTime({id, newTime})}/>
      <Button onPress={() =>onDelete(id)} status='danger'>x</Button>
    </View>
  );
};
