import * as React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

import Spotify from '../components/Profile/Spotify'
import ProfileIconFollowers from "../components/Profile/ProfileIconFollowers";
import WorkoutPlanWidgetProfile from "../components/Profile/WorkoutPlanWidgetProfile";
import MealPlanWidgetProfile from "../components/Profile/MealPlanWidgetProfile";
import ProfileFeed from "../components/Profile/ProfileFeed";
import axios from "axios";

import CurrentStatus from "../components/Profile/CurrentWorkoutStatus";
const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Profile({match}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const {username} = useParams();
  const token = localStorage.getItem("token");
  console.log("User: " + username);

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/profile/${username}`, {
            headers: {Authorization: `Bearer ${token}`}}
        );

        setUser(response.data);
      } catch (error) {
        console.log("Error getting user", error);
        navigate("/userNotFound");
      }
    };
    fetchUserData();
  }, [token]);

  return (
    <Box sx={{flexGrow: 1, marginTop: "1rem", marginRight: "50px"}}>
      <Grid container spacing={2}>
        <Grid item xs={3.5}>
          <Item>
            <ProfileIconFollowers userId={user ? user._id : ""} username = {username} />
            <br />
            <Spotify />
            <br />
            <CurrentStatus userId={user ? user._id : ""} />
          </Item>
        </Grid>

        <Grid item xs={5}>
          <ProfileFeed username={user ? user.username : ""} />

        </Grid>

        <Grid item xs={3.5} container direction="column" spacing={2}>
          <Grid item>
            <Item>
              <WorkoutPlanWidgetProfile userId={user ? user._id : ""} />
            </Item>
          </Grid>
          <Grid item>
            <Item sx={{marginTop: 0}}>
              <MealPlanWidgetProfile userId={user ? user._id : ""} />
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
