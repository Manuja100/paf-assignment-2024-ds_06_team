// MealPlanWidgetProfile.jsx

import React, {useState, useEffect} from "react";
import axios from "axios";
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  ButtonGroup,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardContent,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddMeal from "../Profile/AddMealPlan";
import UpdateMealPlan from "./UpdateMealPlan"; // Import the new component

export default function MealPlanWidgetProfile(props) {
  const [planData, setPlanData] = useState([]);
  const [open, setOpen] = useState(false);
  const [mealType, setMealType] = useState("");
  const [description, setDescription] = useState("");
  const [mealDays, setMealDays] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const userId = props.userId;
  const userIDLoggedIn = localStorage.getItem("userid");
  const token = localStorage.getItem("token");

  const fetchData = async() => {

    await axios
    .get(`http://localhost:8080/meals/mealByUser/${userId}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((res) => setPlanData(res.data))
    .catch((err) => console.log(err));

  }

  useEffect(() => {
   fetchData();
  }, [userId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddDay = () => {
    const dayNumber = mealDays.length + 1;
    setMealDays([
      ...mealDays,
      {
        mealDayNo: dayNumber,
        breakfast: "",
        lunch: "",
        dinner: "",
        snacks: "",
        calories: "",
      },
    ]);
  };

  const handleRemoveDay = (index) => {
    const updatedDays = [...mealDays];
    updatedDays.splice(index, 1);
    setMealDays(updatedDays);
  };

  const handleInputChange = (index, field, value) => {
    const updatedDays = [...mealDays];
    updatedDays[index][field] = value;
    setMealDays(updatedDays);
  };

  const handleAddMealPlan = async() => {
    const mealDaysData = mealDays.map((day) => ({
      days: day.mealDayNo,
      breakfast: day.breakfast,
      lunch: day.lunch,
      dinner: day.dinner,
      snacks: day.snacks,
      calories: day.calories,
    }));

    const data = {
      mealType: mealType,
      description: description,
      mealdays: mealDaysData,
      userID: userId
    };

    await axios
      .post("http://localhost:8080/meals", data,{
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((res) => {
        console.log(res.data);
        handleClose();
        window.location.reload(); // Refresh the page after insertion
      })
      .catch((err) => console.log(err));
  };

  const handleListItemClick = (plan) => {
    setSelectedPlan(plan);
  };

  const handleDeleteMealPlan = async (mealId) => {
    await axios
      .delete(`http://localhost:8080/meals/${mealId}`,{
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((res) => {
        console.log(res.data);
        setSelectedPlan(null);
        window.location.reload(); // Refresh the page after deletion
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateClick = () => {
    setUpdateDialogOpen(true);
  };

  return (
    <Box
      component="section"
      sx={{
        p: 2,
        borderRadius: "5px",
        width: "90%",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={100}
          mt={2}
          style={{marginTop: "-1%", marginLeft: "0%"}}
        >
          Meal Plans
        </Typography>
        {userIDLoggedIn === userId && (
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            style={{marginRight: "5%", marginBottom: "10px"}}
          >
            <Button onClick={handleClickOpen}>Add</Button>
          </ButtonGroup>
        )}
      </div>

      <Card
        sx={{margin: 0}}
        style={{
          borderRadius: "1rem",
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
          width: "390px",
        }}
      >
        <Box sx={{height: "200px", overflowY: "auto", scrollbarWidth: "none"}}>
          <List sx={{bgcolor: "background.paper"}}>
            {planData.map((plan, index) => (
              <ListItem
                key={index}
                alignItems="flex-start"
                button
                onClick={() => handleListItemClick(plan)}
              >
                <ListItemAvatar>
                  <Avatar style={{backgroundColor: "green"}} variant="rounded">
                    <AssignmentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={plan.mealType}
                  secondary={plan.description}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Card>

      <AddMeal
        open={open}
        handleClose={handleClose}
        mealType={mealType}
        setMealType={setMealType}
        description={description}
        setDescription={setDescription}
        mealDays={mealDays}
        handleAddDay={handleAddDay}
        handleRemoveDay={handleRemoveDay}
        handleInputChange={handleInputChange}
        handleAddMealPlan={handleAddMealPlan}
      />

      <Dialog
        open={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedPlan?.mealType}</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Description:</Typography>
          <Typography>{selectedPlan?.description}</Typography>

          <Typography variant="h6" mt={2}>
            Meal Days:
          </Typography>
          <Box display="flex" flexDirection="column" mt={2}>
            {selectedPlan?.mealdays.map((day, index) => (
              <Card key={index} variant="outlined" sx={{mb: 2}}>
                <CardContent>
                  <Typography variant="subtitle1">
                    Day {day.mealDayNo}
                  </Typography>
                  <Typography variant="body2">
                    Breakfast: {day.breakfast}
                  </Typography>
                  <Typography variant="body2">Lunch: {day.lunch}</Typography>
                  <Typography variant="body2">Dinner: {day.dinner}</Typography>
                  <Typography variant="body2">Snacks: {day.snacks}</Typography>
                  <Typography variant="body2">
                    Calories: {day.calories}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClick} color="primary">
            Update
          </Button>{" "}
          {/* Update button */}
          <Button
            onClick={() => handleDeleteMealPlan(selectedPlan?.mealId)}
            color="secondary"
          >
            Delete
          </Button>
          <Button onClick={() => setSelectedPlan(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Meal Plan Dialog */}
      <UpdateMealPlan
        open={updateDialogOpen}
        handleClose={() => setUpdateDialogOpen(false)}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />
    </Box>
  );
}
