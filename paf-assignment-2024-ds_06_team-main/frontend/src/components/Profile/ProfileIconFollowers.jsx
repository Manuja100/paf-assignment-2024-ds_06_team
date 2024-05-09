import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import profilePic from "../../images/propic.jpg";

export default function ProfileIconFollowers(props) {
  const followersCount = 100;
  const followingCount = 10;
  const likesCount = 500;

  const userIDLoggedIn = localStorage.getItem("userid");
  const userId = props.userId;
  const username = props.username;


  return (
    <Box
      component="section"
      sx={{
        p: 2,
        border: "2px solid black",
        borderRadius: "5px",
        width: "90%",
        display: "flex", // Add display flex
        justifyContent: "center", // Center horizontally
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Avatar
        //insert first name and second name
        alt="Remy Sharp"
        src={profilePic}
        sx={{ width: 56, height: 56 }}
      />
      <br />
      <Box>
        <h4 style={{ fontSize: "14px", fontWeight: "bold" }}>{username}</h4>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Box>
          <h5 style={{ fontSize: "14px", fontWeight: "bold" }}>Followers</h5>
          <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "5px" }}>
            {followersCount}
          </p>
        </Box>
        <Box>
          <h5 style={{ fontSize: "14px", fontWeight: "bold" }}>Following</h5>
          <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "5px" }}>
            {followingCount}
          </p>
        </Box>
        <Box>
          <h5 style={{ fontSize: "14px", fontWeight: "bold" }}>Likes</h5>
          <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "5px" }}>
            {likesCount}
          </p>
        </Box>
      </Box>
      {userIDLoggedIn !== userId && (
        <IconButton sx={{ marginLeft: "0rem", marginTop: "1rem" }}>
          <Button variant="contained" color="primary">
            Follow
          </Button>
        </IconButton>
      )}
    </Box>
  );
}
