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

const muscleGroups = ["Arms", "Legs", "Chest", "Back", "Shoulders", "Abs"];

const WorkoutForm5Days = () => {
  const [workoutPlan, setWorkoutPlan] = useState({
    days: [
      {dayNumber: 1, muscleGroups: [], sets: []},
      {dayNumber: 2, muscleGroups: [], sets: []},
      {dayNumber: 3, muscleGroups: [], sets: []},
      {dayNumber: 4, muscleGroups: [], sets: []},
      {dayNumber: 5, muscleGroups: [], sets: []},
    ],
  });

  // Function to get all selected muscle groups across all days
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

    if (selectedMuscleGroups.length === 0) {
      updatedWorkoutPlan.days[dayIndex].muscleGroups = [];
    } else {
      updatedWorkoutPlan.days[dayIndex].muscleGroups = selectedMuscleGroups;
    }

    setWorkoutPlan(updatedWorkoutPlan);
  };

  const handleDeleteSet = (dayIndex, setIndex) => {
    const updatedWorkoutPlan = {...workoutPlan};
    updatedWorkoutPlan.days[dayIndex].sets.splice(setIndex, 1);
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

  const handleExerciseChange = (dayIndex, setIndex, field, value) => {
    const updatedWorkoutPlan = {...workoutPlan};
    updatedWorkoutPlan.days[dayIndex].sets[setIndex][field] = value;
    setWorkoutPlan(updatedWorkoutPlan);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().slice(0, 10);
    const userID = "6622b486921a83588d840e32";

    const updatedWorkoutPlan = {
      userID: userID,
      createdDate: currentDate,
      days: workoutPlan.days.map((day) => ({
        ...day,
      })),
    };

    console.log(updatedWorkoutPlan);
    setWorkoutPlan(updatedWorkoutPlan);
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
        alignItems="center"
        gutterBottom
        sx={{
          marginTop: "2rem",
        }}
      >
        Add Workout Plan (5-Day Split)
      </Typography> */}
      <form onSubmit={handleSubmit}>
        {workoutPlan.days.map((day, dayIndex) => (
          <Paper
            key={dayIndex}
            elevation={3}
            style={{
              padding: "20px",
              marginBottom: "20px",
              width: "90%",
              alignItems: "center",
              marginLeft: "0.5rem",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Day {day.dayNumber}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id={`muscle-group-label-${dayIndex}`}>
                Muscle Group
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
                style={{marginTop: 10}}
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
    </Container>
  );
};

export default WorkoutForm5Days;
