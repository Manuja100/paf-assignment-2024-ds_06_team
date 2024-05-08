import React, { useState } from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  TextField,
  Typography,
  styled,
  Tooltip
} from "@mui/material";
import {
  Add as AddIcon,
  DateRange,
  EmojiEmotions,
  Image as ImageIcon,
  VideoCameraBack,
  PersonAdd,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import axios from "axios"; // Import Axios for making HTTP requests

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Add = () => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(""); // State for description
  const [image, setImage] = useState(null); // State for uploaded image

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("file", image);
      formData.append("userID", "66235df714e07525938ce743");

      await axios.post("http://localhost:8080/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Close the modal after successful upload
      setOpen(false);
      // Clear description and image state
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error uploading post:", error);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Create Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={280}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create post
          </Typography>
          <UserBox>
            <Avatar
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontWeight={500} variant="span">
              John Doe
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
            value={description} // Bind value to description state
            onChange={(e) => setDescription(e.target.value)} // Update description state onChange
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload} // Call handleImageUpload on file input change
          />
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <EmojiEmotions color="primary" />
            <ImageIcon color="secondary" />
            <VideoCameraBack color="success" />
            <PersonAdd color="error" />
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handleSubmit}>Post</Button> {/* Call handleSubmit on button click */}
            <Button sx={{ width: "100px" }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

export default Add;
