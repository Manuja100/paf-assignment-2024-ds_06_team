import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Box,
  Stack,
  Skeleton,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Share,
  Delete,
} from "@mui/icons-material";

const ProfileFeed = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  const username = props.username;

  useEffect(() => {
    fetchPosts();
  }, [username]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/images/imageByUser/${username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts(
        response.data.map((post) => ({
          ...post,
          updatedDescription: post.description, // Map backend attribute to frontend attribute
        }))
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleOpenDialog = (post) => {
    setSelectedPost(post);
    setUpdatedDescription(post.description);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setErrorMessage("");
  };

  const handleDescriptionChange = (event) => {
    setUpdatedDescription(event.target.value);
  };

  const handleUpdateDescription = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/images/${selectedPost.id}`,
        {
          description: updatedDescription, // Pass only the description
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // Update the description in the local state
        const updatedPosts = posts.map((post) => {
          if (post.id === selectedPost.id) {
            return {
              ...post,
              updatedDescription: updatedDescription, // Update frontend attribute name
            };
          }
          return post;
        });
        setPosts(updatedPosts);
        handleCloseDialog();
      } else {
        // Handle non-200 status codes
        console.error("Failed to update description:", response.data);
        setErrorMessage("Failed to update description. Please try again.");
      }
    } catch (error) {
      console.error("Error updating description:", error);
      setErrorMessage("Error updating description. Please try again.");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/images/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // Remove the deleted post from the local state
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      } else {
        // Handle non-200 status codes
        console.error("Failed to delete post:", response.data);
        setErrorMessage("Failed to delete post. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setErrorMessage("Error deleting post. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Box
      flex={4}
      p={{ xs: 0, md: 2 }}
      style={{
        height: "calc(100vh - 20px)",
        overflowY: "auto",
        scrollbarWidth: "none",
        marginTop: "-60px",
      }}
    >
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{ margin: 5 }}
              style={{
                borderRadius: "1rem",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
                width: "80%",
                marginLeft: "3rem",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: "red" }}
                    aria-label="recipe"
                    src={post.avatar}
                  ></Avatar>
                }
                action={
                  <>
                    <IconButton
                      aria-label="settings"
                      onClick={() => handleOpenDialog(post)}
                    >
                      <MoreVert />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
                title={username}
                subheader={formatDate(post.createdAt)} // Format date here
              />
              <CardMedia
                component="img"
                style={{
                  width: "95%",
                  marginLeft: "2.5%",
                  borderRadius: "2rem",
                }}
                height="20%"
                image={`data:image/jpeg;base64,${post.data}`} // Assuming data is base64 encoded
                alt="Post"
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ marginLeft: "2%" }}
                >
                  {post.updatedDescription}{" "}
                  {/* Update to display updated description */}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: "red" }} />}
                  />
                </IconButton>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </>
      )}

      {/* Dialog for updating description */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new description for the post.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={updatedDescription}
            onChange={handleDescriptionChange}
          />
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDialog}>Cancel</button>
          <button onClick={handleUpdateDescription}>Update</button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileFeed;
