import React from "react";
import {Typography, Button, Container, Box} from "@mui/material";
import userNotFound from "../../images/userNotFound.png";
import {useNavigate} from "react-router-dom";

function UserNotFoundPage() {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/feed");
  };

  const rootStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "64px",
    textAlign: "center",
  };

  const imageStyle = {
    width: "300px",
    marginBottom: "16px",
  };

  const contentStyle = {
    maxWidth: "400px",
    padding: "32px",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    marginTop: "16px",
    padding: "12px 24px",
    fontSize: "1rem",
    backgroundColor: "#1976d2",
    color: "#fff",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#135ba1",
    },
  };

  return (
    <Container component="main" style={rootStyle}>
      <img src={userNotFound} alt="User Not Found" style={imageStyle} />
      <Box style={contentStyle}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          We couldn't find the user you are looking for.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={buttonStyle}
          onClick={redirectToHome}
        >
          Go to Home Page
        </Button>
      </Box>
    </Container>
  );
}

export default UserNotFoundPage;
