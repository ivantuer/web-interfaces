/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { Delete } from '@mui/icons-material';
import { Box, IconButton, Switch, TextField } from '@mui/material';
import { FC } from 'react';

interface AlarmProps {
  onDelele: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  active: boolean;
  id: string;
  time: string;
}

export const Alarm: FC<AlarmProps> = ({
  onDelele,
  onChangeStatus,
  onChangeTime,
  id,
  active,
  time,
}) => {
  return (
    <Box display="flex" mb="1em" alignItems="center">
      <Switch data-id={id} id={id} onChange={onChangeStatus} checked={active} />
      <TextField
        onChange={onChangeTime}
        value={time}
        label="Alarm clock"
        type="time"
        defaultValue="06:00:00"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 1,
          'data-id': id,
        }}
        sx={{ mx: '2em', width: '10em' }}
      />
      <IconButton data-id={id} onClick={onDelele}>
        <Delete />
      </IconButton>
    </Box>
  );
};
