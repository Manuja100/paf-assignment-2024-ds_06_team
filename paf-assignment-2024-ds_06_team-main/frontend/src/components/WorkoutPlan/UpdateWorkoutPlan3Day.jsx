import React, {useState, useEffect} from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  IconButton,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const muscleGroups = ["Arms", "Legs", "Chest", "Back", "Shoulders", "Abs"];

const UpdateWorkoutPlan3Days = (props) => {
  const workoutPlanId = props.workoutPlanId;
  const token = localStorage.getItem("token");

  const [workoutPlan, setWorkoutPlan] = useState({
    name: "",
    days: [
      {dayNumber: 1, muscleGroups: [], sets: []},
      {dayNumber: 2, muscleGroups: [], sets: []},
      {dayNumber: 3, muscleGroups: [], sets: []},
    ],
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    // Fetch existing workout plan details when component mounts
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/workoutPlans/workout/${workoutPlanId}`,
          {
            headers: {Authorization: `Bearer ${token}`},
          }
        );
        const existingWorkoutPlan = response.data;
        setWorkoutPlan(existingWorkoutPlan); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching workout plan:", error);
      }
    };

    if (workoutPlanId) {
      fetchWorkoutPlan();
    }
  }, [workoutPlanId]);

  const handleMuscleGroupChange = (dayIndex, selectedMuscleGroups) => {
    const updatedWorkoutPlan = {...workoutPlan};
    updatedWorkoutPlan.days[dayIndex].muscleGroups = selectedMuscleGroups;
    setWorkoutPlan(updatedWorkoutPlan);
  };

  const handleAddSet = (dayIndex) => {
    const updatedWorkoutPlan = {...workoutPlan};
    updatedWorkoutPlan.days[dayIndex].sets.push({
      exerciseName: "",
      sets: 3,
      reps: 10,
    });
    setWorkoutPlan(updatedWorkoutPlan);
  };

  const handleDeleteSet = (dayIndex, setIndex) => {
    const updatedWorkoutPlan = {...workoutPlan};
    updatedWorkoutPlan.days[dayIndex].sets.splice(setIndex, 1);
    setWorkoutPlan(updatedWorkoutPlan);
  };

  const handleExerciseChange = (dayIndex, setIndex, field, value) => {
    const updatedWorkoutPlan = {...workoutPlan};
    updatedWorkoutPlan.days[dayIndex].sets[setIndex][field] = value;
    setWorkoutPlan(updatedWorkoutPlan);
  };

  const handleClearSelection = (dayIndex) => {
    const updatedWorkoutPlan = {...workoutPlan};
    updatedWorkoutPlan.days[dayIndex].muscleGroups = [];
    setWorkoutPlan(updatedWorkoutPlan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userID = localStorage.getItem("userid");
    const split = 3;

    const updatedWorkoutPlan = {
      _id: workoutPlanId,
      userID: userID,
      split: split,
      name: workoutPlan.name.trim(),
      days: [...workoutPlan.days],
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/workoutPlans/update`,
        updatedWorkoutPlan
      );
      console.log("Workout plan updated successfully:", response.data);
      setSnackbarMessage("Workout plan updated successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating workout plan:", error);
      setSnackbarMessage("Failed to update workout plan");
      setSnackbarOpen(true);
    }
  };

  const deletePlan = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:8080/workoutPlans/${workoutPlanId}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      console.log("Workout plan Deleted successfully:", response.data);
      setSnackbarMessage("Workout plan deleted successfully");
      setSnackbarOpen(true);
      window.reload();
    } catch (error) {
      console.error("Error deleting workout plan:", error);
      setSnackbarMessage("Failed to deleted workout plan");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="md">
      <br />
      <form onSubmit={handleSubmit}>
        <TextField
          label="Workout Plan Name"
          fullWidth
          value={workoutPlan.name}
          onChange={(e) =>
            setWorkoutPlan({...workoutPlan, name: e.target.value})
          }
          style={{marginBottom: "20px"}}
        />
        {workoutPlan.days.map((day, dayIndex) => (
          <Paper
            key={dayIndex}
            elevation={3}
            style={{padding: "20px", marginBottom: "20px"}}
          >
            <Typography variant="h5" gutterBottom>
              Day {day.dayNumber}
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Muscle Groups</InputLabel>
              <Select
                multiple
                value={day.muscleGroups}
                onChange={(e) =>
                  handleMuscleGroupChange(dayIndex, e.target.value)
                }
                renderValue={(selected) =>
                  selected.length === 0 ? "Muscle Groups" : selected.join(", ")
                }
              >
                {muscleGroups.map((muscleGroup) => (
                  <MenuItem key={muscleGroup} value={muscleGroup}>
                    {muscleGroup}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{marginTop: "10px", marginBottom: "20px"}}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleClearSelection(dayIndex)}
              >
                Clear Selection
              </Button>
            </div>
            {day.sets.map((set, setIndex) => (
              <div
                key={setIndex}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label={`Exercise Name ${setIndex + 1}`}
                      value={set.exerciseName}
                      onChange={(e) =>
                        handleExerciseChange(
                          dayIndex,
                          setIndex,
                          "exerciseName",
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      label="Sets"
                      type="number"
                      value={set.sets}
                      onChange={(e) =>
                        handleExerciseChange(
                          dayIndex,
                          setIndex,
                          "sets",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      label="Reps"
                      type="number"
                      value={set.reps}
                      onChange={(e) =>
                        handleExerciseChange(
                          dayIndex,
                          setIndex,
                          "reps",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      onClick={() => handleDeleteSet(dayIndex, setIndex)}
                      color="error"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ))}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleAddSet(dayIndex)}
            >
              Add Exercise Set
            </Button>
          </Paper>
        ))}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Workout Plan
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          onClick={deletePlan}
        >
          Delete
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default UpdateWorkoutPlan3Days;