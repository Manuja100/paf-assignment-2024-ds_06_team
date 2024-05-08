import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  IconButton
} from "@mui/material";
import {
    Close,
  } from "@mui/icons-material";

function MealPlanForm({
  open,
  handleClose,
  mealType,
  setMealType,
  description,
  setDescription,
  mealDays,
  handleAddDay,
  handleRemoveDay,
  handleInputChange,
  handleAddMealPlan,
}) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle>Add New Meal Plan</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="mealType"
          label="Meal Type"
          type="text"
          fullWidth
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Typography variant="h6" style={{ marginTop: "10px" }}>
          Meal Days
        </Typography>
        <Button onClick={handleAddDay} variant="contained" style={{ marginTop: "5px" }}>
          Add Day
        </Button>
        {mealDays.map((day, index) => (
          <Box key={index} sx={{ marginTop: '10px' }}>
            <Typography variant="subtitle1" gutterBottom>Day {day.mealDayNo}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={2}>
              
              
                <TextField
                  margin="dense"
                  id={`day-${index}-breakfast`}
                  label="Breakfast"
                  type="text"
                  fullWidth
                  value={day.breakfast}
                  onChange={(e) => handleInputChange(index, 'breakfast', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  margin="dense"
                  id={`day-${index}-lunch`}
                  label="Lunch"
                  type="text"
                  fullWidth
                  value={day.lunch}
                  onChange={(e) => handleInputChange(index, 'lunch', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  margin="dense"
                  id={`day-${index}-dinner`}
                  label="Dinner"
                  type="text"
                  fullWidth
                  value={day.dinner}
                  onChange={(e) => handleInputChange(index, 'dinner', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  margin="dense"
                  id={`day-${index}-snacks`}
                  label="Snacks"
                  type="text"
                  fullWidth
                  value={day.snacks}
                  onChange={(e) => handleInputChange(index, 'snacks', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  margin="dense"
                  id={`day-${index}-calories`}
                  label="Calories"
                  type="text"
                  fullWidth
                  value={day.calories}
                  onChange={(e) => handleInputChange(index, 'calories', e.target.value)}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => handleRemoveDay(index)}><Close /></IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddMealPlan}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MealPlanForm;
