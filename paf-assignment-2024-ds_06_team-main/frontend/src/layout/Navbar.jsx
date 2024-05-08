import React from "react";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Box,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { FitnessCenter, Notifications, Search } from "@mui/icons-material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  // backgroundColor:"hsl(252, 75%, 95%)",
  // color:"black"
});

const Searchs = styled("div")(({ theme }) => ({
  backgroundColor: "White",
  padding: "0 10px",
  borderRadius: "2rem",
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{
            display: {
              xs: "none",
              sm: "block",
              textDecoration: "none",
              color: "inherit",
            },
          }}
          component={Link}
          to="/"
        >
          KIRI FITNESS
        </Typography>
        <FitnessCenter sx={{ display: { xs: "block", sm: "none" } }} />
        <Searchs
          style={{
            marginRight: "3rem",
          }}
        >
          <Search
            style={{
              color: "grey",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              paddingRight: "",
            }}
          />
          <InputBase
            placeholder="Search here"
            style={{ fontSize: "small", height: "40px", marginLeft: "30px" }}
          />
        </Searchs>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="span"></Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        style={{ marginTop: "40px" }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem component={Link} to={`/profile/${username}`}>
          Profile
        </MenuItem>
        <MenuItem component={Link} to="/setting">
          My account
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
