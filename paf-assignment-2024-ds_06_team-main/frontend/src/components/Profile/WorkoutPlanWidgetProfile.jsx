import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkoutForm3Days from "../WorkoutPlan/3DaySplit";
import WorkoutForm5Days from "../WorkoutPlan/5DaySplit";
import axios from "axios";

import {
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@mui/material";

import UpdateWorkoutPlan3Days from "../WorkoutPlan/UpdateWorkoutPlan3Day";

// Separate component for the 3 Day Plan dialog
function ThreeDayPlanDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>3 Day Workout Plan</DialogTitle>
      <DialogContent>
        <WorkoutForm3Days />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function Update3DayPlan({ open, onClose, workoutPlanId, userId, username }) {
  console.log("workout plan id: " + workoutPlanId);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Update Plan</DialogTitle>
      <DialogContent>
        <UpdateWorkoutPlan3Days workoutPlanId={workoutPlanId} userId = {userId} username = {username}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

// Separate component for the 5 Day Plan dialog
function FiveDayPlanDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>5 Day Workout Plan</DialogTitle>
      <DialogContent>
        <WorkoutForm5Days />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function WorkoutPlanWidgetProfile(props) {
  const [planDataList, setPlanDataList] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem('username');

  const userIDLoggedIn = localStorage.getItem("userid");
  const userId = props.userId;

  const fetchWorkoutPlans = async () => {
    await axios
      .get(`http://localhost:8080/workoutPlans/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const plans = response.data;
        console.log(plans);
        setPlanDataList(plans);
      })
      .catch((error) => {
        console.error("Error fetching workout plans:", error);
      });
  };

  useEffect(() => {
    fetchWorkoutPlans(userId);
  }, [userId]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openThreeDayDialog, setOpenThreeDayDialog] = useState(false);
  const [openFiveDayDialog, setOpenFiveDayDialog] = useState(false);
  const [openUpdate3DayDiaglog, setUpdate3DayDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenThreeDayDialog = () => {
    setOpenThreeDayDialog(true);
  };

  const handleCloseThreeDayDialog = () => {
    setOpenThreeDayDialog(false);
  };

  const handleOpenFiveDayDialog = () => {
    setOpenFiveDayDialog(true);
  };

  const handleCloseFiveDayDialog = () => {
    setOpenFiveDayDialog(false);
  };

  const handleOpenUpdate3DayPlan = (planId) => {
    setSelectedPlanId(planId);
    setUpdate3DayDialog(true);
  };

  const handleCloseUpdate3DayPlan = () => {
    setUpdate3DayDialog(false);
  };

  return (
    <Box
      component="section"
      sx={{
        p: 2,

        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: "33vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          style={{ fontWeight: "bold", marginRight: "auto" }}
        >
          Workout Plans
        </Typography>

        {userIDLoggedIn === userId && (
          <IconButton onClick={handleOpenDialog} sx={{ marginLeft: "5rem" }}>
            <Button variant="contained" color="primary">
              Add
            </Button>
          </IconButton>
        )}
      </Box>
      <Card
        sx={{ margin: 0 }}
        style={{
          borderRadius: "1rem",
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
          width: "390px",
          height: "200px",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <List sx={{ bgcolor: "background.paper" }}>
          {planDataList.map((planData, index) => (
            <ListItem
              key={index}
              alignItems="flex-start"
              button
              onClick={() => handleOpenUpdate3DayPlan(planData._id)}
            >
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "green" }} variant="rounded">
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={planData.name}
                secondary={planData.split + " Day Plan"}
              />
            </ListItem>
          ))}
        </List>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Workout Plan</DialogTitle>
        <DialogContent>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenThreeDayDialog}
          >
            3 Day Plan
          </Button>{" "}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenFiveDayDialog}
          >
            5 Day Plan
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <ThreeDayPlanDialog
        open={openThreeDayDialog}
        onClose={handleCloseThreeDayDialog}
      />
      <FiveDayPlanDialog
        open={openFiveDayDialog}
        onClose={handleCloseFiveDayDialog}
      />
      <Update3DayPlan
        open={openUpdate3DayDiaglog}
        onClose={handleCloseUpdate3DayPlan}
        workoutPlanId={selectedPlanId}
        userId = {userId}
      />
          
    </Box>
  );
}
