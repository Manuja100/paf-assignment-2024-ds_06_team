import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box, Grid} from "@mui/material";

export default function UpdateMealPlan({ open, handleClose, selectedPlan, setSelectedPlan }) {
    const [updatedPlan, setUpdatedPlan] = useState(null);
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        await axios.get(`http://localhost:8080/meals/${selectedPlan.mealId}`,{
            headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            setUpdatedPlan(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        // Fetch existing meal plan data when the dialog opens
        if (open && selectedPlan) {
            fetchData();
          
        }
    }, [open, selectedPlan]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPlan(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleMealDayInputChange = (index, field, value) => {
        const updatedMealdays = [...updatedPlan.mealdays];
        updatedMealdays[index][field] = value;
        setUpdatedPlan(prevState => ({
            ...prevState,
            mealdays: updatedMealdays
        }));
    };

    const handleUpdateMealPlan = async () => {
        await axios.put('http://localhost:8080/meals', updatedPlan,{
            headers: {Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(res.data);
                setSelectedPlan(updatedPlan);
                handleClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" >
            <DialogTitle>Update Meal Plan</DialogTitle>
            <DialogContent>
                {updatedPlan && (
                    <Box>
                        <Typography variant="h6" style={{ marginTop: "10px" }}>Meal Type:</Typography>
                        <TextField
                            name="mealType"
                            value={updatedPlan.mealType}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                        />

                        <Typography variant="h6" style={{ marginTop: "10px" }}>Description:</Typography>
                        <TextField
                            name="description"
                            value={updatedPlan.description}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                        />

                        <Typography variant="h6" style={{ marginTop: "10px" }}>Meal Days:</Typography>
                        {updatedPlan.mealdays.map((day, index) => (
                            <Box key={index} sx={{ marginTop: "10px" }}>
                                <Typography variant="subtitle1" gutterBottom>Day {day.mealDayNo}</Typography>
                                <Grid container spacing={2}>
                                <Grid item xs={2}>
                                <TextField
                                    autoFocus
                                    label="Breakfast"
                                    value={day.breakfast}
                                    onChange={(e) => handleMealDayInputChange(index, 'breakfast', e.target.value)}
                                    fullWidth
                                    margin="dense"
                                />
                                </Grid>
                                <Grid item xs={2.5}>
                                <TextField
                                    autoFocus
                                    label="Lunch"
                                    value={day.lunch}
                                    onChange={(e) => handleMealDayInputChange(index, 'lunch', e.target.value)}
                                    fullWidth
                                    margin="dense"
                                />
                                </Grid>
                                <Grid item xs={2.5}>
                                <TextField
                                    autoFocus
                                    label="Dinner"
                                    value={day.dinner}
                                    onChange={(e) => handleMealDayInputChange(index, 'dinner', e.target.value)}
                                    fullWidth
                                    margin="dense"
                                />
                                </Grid>
                                <Grid item xs={2.5}>
                                <TextField
                                    autoFocus
                                    label="Snacks"
                                    value={day.snacks}
                                    onChange={(e) => handleMealDayInputChange(index, 'snacks', e.target.value)}
                                    fullWidth
                                    margin="dense"
                                />
                                </Grid>
                                <Grid item xs={2.5}>
                                <TextField
                                    autoFocus
                                    label="Calories"
                                    value={day.calories}
                                    onChange={(e) => handleMealDayInputChange(index, 'calories', e.target.value)}
                                    fullWidth
                                    margin="dense"
                                />
                                </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdateMealPlan} color="primary">Update</Button>
                <Button onClick={handleClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
