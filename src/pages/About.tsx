import { Box, Typography } from '@mui/material';

export const About = () => {
  return (
    <Box minHeight="100vh" px="4em" pt="1em">
      <img
        data-testid="about-alarm-image"
        src="https://play-lh.googleusercontent.com/f9NuCxoRwJvMRmn7NkBzNlaE-QUZs9uQJGUZtmUYIXCRZ7rQ-1x1lKeD88hG2M5T9g"
        alt="Alarm"
      />
      <Typography data-testid="about-alarm-text">
        This app allows users to set alarm clocks and get notification when time
        is up
      </Typography>
    </Box>
  );
};
