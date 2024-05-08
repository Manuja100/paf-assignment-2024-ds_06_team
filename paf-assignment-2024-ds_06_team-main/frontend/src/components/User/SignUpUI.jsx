import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { styled, Typography, Box, Avatar } from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bg from "../../images/360_F_112813842_J6IBNQcLs3Ttdl65rhKko9pND2FYTvrd.jpg";
import MenuItem from "@mui/material/MenuItem";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        FitMate
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const ContainerStyle = styled(Container)(({ theme }) => ({
  background: "#fff",
}));

export default function SignUp() {
  const navigate = useNavigate();

  const genders = [
    {
      value: 'M',
      label: 'Male',
    },
    {
      value: 'F',
      label: 'Female'
    }
  ];

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    city: "",
    password: "",
    confirmpassword: "",
    birthdate: "20-03-2020",
    contactnumber: "",
    profilepic: "",
    gender: "Male",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is Required"),
    lastname: Yup.string().required("Last Name is Required"),
    username: Yup.string().required("User Name is Required"),
    city: Yup.string().required("City is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    contactnumber: Yup.string().matches(
      phoneRegExp,
      "Phone number is not valid"
    ),
    birthdate: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema
        .validate(formData, { abortEarly: false })
        .then(async () => {
          console.log(formData);
          await axios
            .post("http://localhost:8080/users/register", formData)
            .then(() => {
              navigate("/login");
            });
        });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({});
  };

  return (
    <ThemeProvider
      theme={defaultTheme}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <ContainerStyle>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                    autoFocus
                  />
                  {errors.firstname && (
                    <div style={{ color: "red" }}>*{errors.firstname}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                  {errors.lastname && (
                    <div style={{ color: "red" }}>*{errors.lastname}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <div style={{ color: "red" }}>*{errors.username}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <div style={{ color: "red" }}>*{errors.email}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <div style={{ color: "red" }}>*{errors.city}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    style = {{width: "100%"}}
                    id="outlined-select-currency"
                    select
                    label="Select Gender" 
                    defaultValue={formData.gender}
  
                  >
                    {genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  {errors.password && (
                    <div style={{ color: "red" }}>*{errors.password}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div style={{ color: "red" }}>
                      *{errors.confirmPassword}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="contactnumber"
                    label="Contact Number"
                    type="tel"
                    id="contactnumber"
                    value={formData.contactnumber}
                    onChange={handleChange}
                  />{" "}
                  {errors.contactnumber && (
                    <div style={{ color: "red" }}>*{errors.contactnumber}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="birthdate"
                    label="Date of Birth"
                    type="date"
                    id="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                  />
                  {errors.birthdate && (
                    <div style={{ color: "red" }}>*{errors.birthdate}</div>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ContainerStyle>
    </ThemeProvider>
  );
}
