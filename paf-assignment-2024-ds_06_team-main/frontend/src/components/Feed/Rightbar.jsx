import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Card
} from "@mui/material";
import React from "react";

const Rightbar = () => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none",sm: "none", md:"none", lg:"block" } }}>
      <Box position="fixed" width="30%" marginLeft="-8%">
      <Card sx={{ margin: 5 }} style={{borderRadius:"1rem", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", paddingBottom:"10%"}}>
        <Typography variant="h6" fontWeight={100} style={{margin:"5%"}}>
          Online Friends
        </Typography>
        <AvatarGroup max={7} style={{marginRight:"25%"}}>
          <Avatar 
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Avatar
            alt="Travis Howard"
            src="https://material-ui.com/static/images/avatar/2.jpg"
          />
          <Avatar
            alt="Cindy Baker"
            src="https://material-ui.com/static/images/avatar/3.jpg"
          />
          <Avatar alt="Agnes Walker" src="" />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/6.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/7.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/8.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/7.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/8.jpg"
          />
        </AvatarGroup>
        </Card>
        <Card sx={{ margin: 5 }} style={{borderRadius:"1rem", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", paddingBottom:"7%"}}>
        <Typography variant="h6" fontWeight={100} mt={2} style={{margin:"5%"}}>
          Latest Workout Plans
        </Typography>
        <List sx={{ bgcolor: 'background.paper', overflowY: 'scroll', maxHeight: '300px', scrollbarWidth: "none" }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Kiri's Workout Plan"
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
                primary="Manuja's Workout Plan"
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
                primary="Hamchi's Workout Plan"
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

export default Rightbar;