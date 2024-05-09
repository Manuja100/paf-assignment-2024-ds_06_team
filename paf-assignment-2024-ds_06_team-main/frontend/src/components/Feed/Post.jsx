import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
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

const Post = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/images/all", {
        headers: { Authorization: `Bearer ${token}` },
      }); // Adjust the endpoint as per your backend setup
      setPosts(response.data);
      console.log(posts[1].username);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title = {
            <Link to={`/profile/${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {post.username ? post.username : "Hamchi"}
            </Link>
            }
            subheader={formatDate(post.createdAt)} // Format date here
          />
          <CardMedia
            component="img"
            style={{ width: "95.5%", marginLeft: "2.5%", borderRadius: "2rem" }}
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

export default Post;
