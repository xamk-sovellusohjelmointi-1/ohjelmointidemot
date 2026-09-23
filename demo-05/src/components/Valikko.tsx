import { useState } from 'react';
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router';

const Valikko = () => {

  const [valikkoAuki, setValikkoAuki] = useState<boolean>(false);

  return (
    <AppBar position="static">
      <Toolbar>

        <IconButton
          color="inherit"
          edge="start"
          aria-label="Avaa valikko"
          onClick={() => setValikkoAuki(true)}
        >
          <MenuIcon />
        </IconButton>

        <Typography component="div" sx={{ fontSize: "16pt", flexGrow: 1 }}>
          Demo 5: Reititys (React Router)
        </Typography>

      </Toolbar>

      <Drawer open={valikkoAuki} onClose={() => setValikkoAuki(false)}>
        <List
          sx={{ width: "220px", marginTop: "50px" }}
          onClick={() => setValikkoAuki(false)}
        >

          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Aloitus" />
          </ListItemButton>

          <ListItemButton component={Link} to="/info">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </ListItemButton>

        </List>
      </Drawer>
    </AppBar>
  );
};

export default Valikko;
