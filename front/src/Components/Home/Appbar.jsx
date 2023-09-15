import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import ResD from './ResponsiveDialog';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FontDownload from '@mui/icons-material/FontDownload';

const Appbar = ({ themeMode, toggleTheme, dis  }) => {
  const link = localStorage.getItem("link");
  const [display , setDisplay] = useState('hidden')
  useEffect(() => {
    if (link) {
      setDisplay('block');
    }
  },[]);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['تغيير الوضع'].map((text, index) => (
          <ListItem key={text} disablePadding  onClick={toggleTheme}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <DarkModeIcon /> : <FontDownload />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Box>
  );
  return (
    <div className='p-[20px] shadow-lg flex justify-between items-center'>
      <div className='flex justify-center items-center gap-3'>
        <ResD  />

        <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}  variant="contained" ><p><SettingsIcon/></p></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
      </div>
      <NavLink to='../'>
        <div style={{ cursor: 'pointer' }}>
          <img src="https://png.pngtree.com/png-vector/20230729/ourmid/pngtree-white-video-game-controller-vector-png-image_9116674.png" alt="" srcset="" width={90} height={50} />
        </div>
      </NavLink>
    </div>
  );
}

export default Appbar;
/**
 * 
 *         <Button variant="contained" onClick={toggleTheme}>
          <p>تغيير الوضع</p>
        </Button>
 */