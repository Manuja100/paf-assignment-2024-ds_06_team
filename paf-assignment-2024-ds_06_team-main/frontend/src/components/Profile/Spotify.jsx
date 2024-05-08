import * as React from "react";
import Box from "@mui/material/Box";
import SpotifyLogo from "../../images/spotify.png";
import {Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export default function Spotify() {
  const [showAlert, setShowAlert] = React.useState(false);

  const redirectUrl = "";

  const handleSpotifyClick = () => {
    if (redirectUrl) {
      window.open(redirectUrl, "_blank");
    } else {
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          p: 0.3,
          border: "2px solid black",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
          marginX: "13px",
        }}
        onClick={handleSpotifyClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        style={{height: "80%"}}
      >
        <div style={{display: "flex", alignItems: "center"}}>
          <img
            src={SpotifyLogo}
            alt="Spotify Logo"
            style={{maxWidth: "30%", maxHeight: "30%", display: "block"}}
          />
          <h4
            le={{marginLeft: "-10px"}}
            style={{fontSize: "17px", fontWeight: "bold"}}
          >
            Workout Playlist
          </h4>
        </div>
      </Box>

      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
        anchorOrigin={{vertical: "bottom", horizontal: "left"}}
      >
        <MuiAlert
          elevation={6}
          severity="error"
          onClose={handleCloseAlert}
          variant="filled"
        >
          {"No Playlist(s) for this user"}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
