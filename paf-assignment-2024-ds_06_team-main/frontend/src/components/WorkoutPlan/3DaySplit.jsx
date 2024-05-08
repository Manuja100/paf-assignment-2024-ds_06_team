import React, {useState} from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const muscleGroups = ["Arms", "Legs", "Chest", "Back", "Shoulders", "Abs"];

const WorkoutForm3Days = (props) => {
  const [workoutPlan, setWorkoutPlan] = useState({
    name: "",
    days: [
      {dayNumber: 1, muscleGroups: [], sets: []},
      {dayNumber: 2, muscleGroups: [], sets: []},
      {dayNumber: 3, muscleGroups: [], sets: []},
    ],
  });

  const getAllSelectedMuscleGroups = () => {
    const selectedMuscleGroups = new Set();
    workoutPlan.days.forEach((day) => {
      day.muscleGroups.forEach((muscleGroup) => {
        selectedMuscleGroups.add(muscleGroup);
      });
    });
    return Array.from(selectedMuscleGroups);
  };

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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyMuscleGroups = workoutPlan.days.some(
      (day) => day.muscleGroups.length === 0
    );

    if (hasEmptyMuscleGroups) {
      setSnackbarMessage("Please select muscle groups for all days");
      setSnackbarOpen(true);
      return; // Prevent further submission
    }

    const currentDate = new Date().toISOString().slice(0, 10);
    const userID = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    const split = 3;

    const workoutPlanFinal = {
      userID: userID,
      createdDate: currentDate,
      split: split,
      name: workoutPlan.name.trim(),
      days: [...workoutPlan.days],
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/workoutPlans/add",
        workoutPlanFinal,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Workout plan added successfully:", response.data);
     
    } catch (error) {
      console.error("Error adding workout plan:", error);
    }
  };

  const handleClearSelection = (dayIndex) => {
    const updatedWorkoutPlan = {...workoutPlan};
    updatedWorkoutPlan.days[dayIndex].muscleGroups = [];
    setWorkoutPlan(updatedWorkoutPlan);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        width: "100%",
      }}
    >
      {/* <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          marginTop: "2rem",
        }}
      >
        Add Workout Plan (3-Day Split)
      </Typography> */}
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
            style={{
              padding: "20px",
              marginBottom: "20px",
              width: "90%",
              alignItems: "center",
              marginLeft: "0.5 rem",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Day {day.dayNumber}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id={`muscle-group-label-${dayIndex}`}>
                Muscle Groups
              </InputLabel>
              <Select
                labelId={`muscle-group-label-${dayIndex}`}
                id={`muscle-group-select-${dayIndex}`}
                style={{width: "100%"}}
                multiple
                value={day.muscleGroups}
                onChange={(e) =>
                  handleMuscleGroupChange(dayIndex, e.target.value)
                }
                renderValue={(selected) =>
                  selected.length === 0 ? "Muscle Groups" : selected.join(", ")
                }
              >
                {muscleGroups
                  .filter(
                    (muscleGroup) =>
                      !getAllSelectedMuscleGroups().includes(muscleGroup)
                  )
                  .map((muscleGroup) => (
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{width: "96%"}}
        >
          Submit Workout Plan
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust as needed
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="error"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default WorkoutForm3Days;
