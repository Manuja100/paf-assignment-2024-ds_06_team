import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import axios from "axios";

export default function CurrentWorkoutStatus() {
  const [workoutStatuses, setWorkoutStatuses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [updatedStatus, setUpdatedStatus] = useState({
    benchpress: "",
    deadlift: "",
    squat: "",
    time: "",
    distance: "",
  });

  useEffect(() => {
    // Fetch all workout statuses from the backend
    axios
      .get("http://localhost:8080/workoutstatus/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setWorkoutStatuses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workout statuses:", error);
      });
  }, []);

  const handleNextComponent = () => {
    setActiveComponentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const handlePrevComponent = () => {
    setActiveComponentIndex((prevIndex) =>
      prevIndex === 0 ? 2 : prevIndex - 1
    );
  };

  const handleOpen = () => {
    axios
      .get(`http://localhost:8080/workoutstatus/${"391a0110"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUpdatedStatus(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching previous data:", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    // Send updated status to the backend
    axios
      .put(`http://localhost:8080/workoutstatus`, updatedStatus, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const updatedWorkoutStatuses = [...workoutStatuses];
        updatedWorkoutStatuses[activeIndex] = updatedStatus;
        setWorkoutStatuses(updatedWorkoutStatuses);
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        // Handle error
      });
  };

  const getActiveComponent = () => {
    switch (activeComponentIndex) {
      case 0:
        return "Benchpress";
      case 1:
        return "Deadlift";
      case 2:
        return "Squat";
      default:
        return "";
    }
  };

  return (
    <Box
      component="section"
      sx={{
        p: 2,
        borderRadius: "5px",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "10px",
          marginTop: "-8%",
        }}
      >
        Current Workout Status
      </h2>
      <Card
        sx={{ margin: 0 }}
        style={{
          borderRadius: "1rem",
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
          width: "`390px`",
        }}
      >
        <Box
          sx={{
            height: "340px",
            overflowY: "auto",
            scrollbarWidth: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "-5%",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "5px",
            }}
          >
            Personal Records
          </h3>
          {workoutStatuses.length > 0 && (
            <>
              <Box
                sx={{
                  textAlign: "center",
                  width: "90%",
                  bgcolor: "background.paper",
                  marginLeft: "20px",
                  paddingTop: "10px",
                  borderRadius: "1rem",
                  boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {getActiveComponent()}
                </h2>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                    marginLeft: "30px",
                    marginRight: "30px",
                    height: "40px",
                    marginTop: "-5%",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handlePrevComponent}
                    style={{ marginLeft: "10px" }}
                  >
                    {"<"}
                  </Button>
                  <Box style={{ flexGrow: 1, textAlign: "center" }}>
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginBottom: "5px",
                        color: "green",
                      }}
                    >
                      {
                        workoutStatuses[activeIndex][
                          getActiveComponent().toLowerCase()
                        ]
                      }{" "}
                      Kg
                    </h4>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={handleNextComponent}
                    style={{ marginRight: "10px" }}
                  >
                    {">"}
                  </Button>
                </Box>
              </Box>
            </>
          )}
          <br />
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
                marginTop: "-5%",
              }}
            >
              Running Stats
            </h3>
            {workoutStatuses.length > 0 && (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <b>Fastest Duration</b>{" "}
                  <h3 style={{ color: "green" }}>
                    {workoutStatuses[activeIndex]?.time}
                  </h3>
                </li>
                <br />
                <li style={{ marginTop: "-4%" }}>
                  <b>Longest Distance</b>{" "}
                  <h3 style={{ color: "green" }}>
                    {" "}
                    {workoutStatuses[activeIndex]?.distance} m
                  </h3>
                </li>
              </ul>
            )}
            <Button
              variant="outlined"
              onClick={handleOpen}
              style={{ marginTop: "-15px", marginBottom: "-10%" }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Card>
      {/* Update Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Workout Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter updated workout status:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="benchpress"
            label="Benchpress (Kg)"
            type="number"
            fullWidth
            value={updatedStatus.benchpress}
            onChange={(e) =>
              setUpdatedStatus({ ...updatedStatus, benchpress: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="deadlift"
            label="Deadlift (Kg)"
            type="number"
            fullWidth
            value={updatedStatus.deadlift}
            onChange={(e) =>
              setUpdatedStatus({ ...updatedStatus, deadlift: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="squat"
            label="Squat (Kg)"
            type="number"
            fullWidth
            value={updatedStatus.squat}
            onChange={(e) =>
              setUpdatedStatus({ ...updatedStatus, squat: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="time"
            label="Time (HH:MM:SS)"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1, // seconds
            }}
            value={updatedStatus.time}
            onChange={(e) =>
              setUpdatedStatus({ ...updatedStatus, time: e.target.value })
            }
          />

          <TextField
            margin="dense"
            id="distance"
            label="Distance (km)"
            type="number"
            fullWidth
            value={updatedStatus.distance}
            onChange={(e) =>
              setUpdatedStatus({ ...updatedStatus, distance: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
