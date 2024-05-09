import {
  AccountBox,
  ModeNight,
  Person,
  Settings
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Card,
  Typography,
  ListItemAvatar,
  Avatar,
  Divider
} from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom';

const Sidebar = ({mode,setMode}) => {
  return (
    
    <Box flex={2.2} p={2} sx={{ display: { xs: "none", sm: "none", md:"none", lg:"block"}}} >
      <Box position="fixed" width="30%"  >
      <Card sx={{ margin: 5 }} style={{borderRadius:"1rem", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", marginLeft:"10%"}}>
        <List style={{marginLeft:"10%"}}>
          
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/profile">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile"  />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
            </ListItemButton>
          </ListItem>
        </List>
        </Card>
      <Card sx={{ margin: 5 }} style={{borderRadius:"1rem", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)" , marginLeft:"10%", paddingBottom:"7%", scrollbarWidth: "none"}}>
      <Typography variant="h6" fontWeight={100} mt={2} style={{margin:"5%"}}>
          Recent Meal Plans
        </Typography>
            <List sx={{ bgcolor: 'background.paper', overflowY: 'scroll', maxHeight: '225px', scrollbarWidth: "none" }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Kiri's Meal Plan"
                secondary={
                  <React.Fragment>
                    {"I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Manuja's Meal Plan"
                secondary={
                  <React.Fragment>
                    {"Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Hamchi's Meal Plan"
                secondary={
                  <React.Fragment>
                    {'Do you have Paris recommendations? Have you ever…'}
                  </React.Fragment>
                }
              />
            </ListItem>
      </List>
      </Card>
      </Box>
    </Box>
    
  );
};

export default Sidebar;