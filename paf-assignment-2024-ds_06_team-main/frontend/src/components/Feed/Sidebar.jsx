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
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AssignmentIcon from "@mui/icons-material/Assignment";

const Sidebar = ({mode,setMode}) => {
  const [mealPlans, setMealPlans] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8080/meals/',{
          headers: {Authorization: `Bearer ${token}`},
        });
        setMealPlans(response.data);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      }
    };

    fetchMealPlans();
  }, []);

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
            {mealPlans.map((meal, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                  <Avatar style={{backgroundColor: "green"}} variant="rounded">
                    <AssignmentIcon />
                  </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={meal.mealType}
                    secondary={meal.description}
                  />
                </ListItem>
                {index < mealPlans.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Card>
      </Box>
    </Box>
  );
};

export default Sidebar;
