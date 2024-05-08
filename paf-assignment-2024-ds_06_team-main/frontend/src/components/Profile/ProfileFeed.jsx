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
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";

const ProfileFeed = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const token = localStorage.getItem("token");
  const userID = props.userId;
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchPosts();
  }, [userID]);
  
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/images/imageByUser/${userID}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data.map(post => ({
        ...post,
        updatedDescription: post.description // Map backend attribute to frontend attribute
      })));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Function to format date to desired format
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
    <div>
      {posts.map((post) => (
        <Card key={post.id} sx={{ margin: 5 }} style={{ borderRadius: "1rem", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", width: "80%", marginLeft: "3rem" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" src={post.avatar}>
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title="Hamchi"
            subheader={formatDate(post.createdAt)} // Format date here
          />
          <CardMedia
            component="img"
            style={{ width: "95%", marginLeft: "2.5%", borderRadius: "2rem" }}
            height="20%"
            image={`data:image/jpeg;base64,${post.data}`} // Assuming data is base64 encoded
            alt="Post"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" style={{ marginLeft: "2%" }}>
              {post.description}
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
    </div>
  );
};

export default ProfileFeed;
