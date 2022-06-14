import { AccountCircle } from '@mui/icons-material';
import {
  AppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const LinkStyled = styled(Link)(() => ({
  color: 'white',
  textDecoration: 'none',
  ':nth-child(2)': {
    marginLeft: 'auto',
  },
}));

export const NavBar = () => {
  return (
    <AppBar position="static">
      <Box component={Toolbar} display="flex" justifyContent="space-between">
        <LinkStyled to="/">
          <Typography variant="h6" component="div">
            Main
          </Typography>
        </LinkStyled>
        <LinkStyled to="/about">
          <Typography component="div">About</Typography>
        </LinkStyled>
        <LinkStyled to="/profile">
          <IconButton size="large" color="inherit">
            <AccountCircle />
          </IconButton>
        </LinkStyled>
      </Box>
    </AppBar>
  );
};
