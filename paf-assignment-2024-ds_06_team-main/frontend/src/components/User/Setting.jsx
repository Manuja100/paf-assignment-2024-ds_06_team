import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { styled } from "@mui/material/styles";
import Paper, { paperClasses } from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountInfo from "./AccountInfo";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  paddingTop: "20px",
}));

export default function Settings() {
  // Sample user data

  const userId = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [renderPage, setRenderPage] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const [errors, setErrors] = useState({});

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [userDetails, setUserDetails] = useState({
    username: "",
    firstname: "John",
    lastname: "Doe",
    city: "New York",
    contactnumber: "1234567890",
    email: "",
    gender: "Male",
    birthdate: "",
  });

  const credentialDetails = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  const [credentialForm, setCredentialForm] = useState(credentialDetails);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleDeleteClose = () => {
    setAccountDialog(false);
  };


  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is Required"),
    lastname: Yup.string().required("Last Name is Required"),
    city: Yup.string().required("City is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    // password: Yup.string()
    //   .required("Password is required")
    //   .min(8, "Password must be at least 8 characters")
    //   .matches(
    //     /[!@#$%^&*(),.?":{}|<>]/,
    //     "Password must contain at least one symbol"
    //   ),
    //   .matches(/[0-9]/, "Password must contain at least one number")
    //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password")], "Passwords must match")
    //   .required("Confirm password is required"),
    contactnumber: Yup.string().matches(
      phoneRegExp,
      "Phone number is not valid"
    ),
    birthdate: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
  });

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`http://localhost:8080/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data)
          let {
            username,
            firstname,
            lastname,
            city,
            contactnumber,
            email,
            birthdate,
            gender,
            password,
          } = res.data;

          setUserDetails({
            ...userDetails,
            username: username,
            firstname: firstname,
            lastname: lastname,
            city: city,
            contactnumber: contactnumber,
            email: email,
            birthdate: birthdate,
            gender: gender,
          });

          setCredentialForm(() => ({
            ...credentialForm,
            [password]: password,
          }));

          setRenderPage(false);
        });
    }

    fetchData();
  }, [renderPage]);

  const [openDialog, setOpenDialog] = useState(false);
  const [accountDialog, setAccountDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors({});
  };

  const handleChangeCredentials = (e) => {
    const { name, value } = e.target;
    setCredentialForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const deleteAccount = async () => {

    await axios.delete(`http://localhost:8080/users/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
    ).then(() => {
      localStorage.clear();
      navigate('/login');

    })

  }

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema
        .validate(userDetails, { abortEarly: false })
        .then(async () => {
          await axios
            .put("http://localhost:8080/users", userDetails, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              handleClick(true);
              setMessage("Successfully Updated");
              setSeverity("success");
              setRenderPage(true);
            })
            .catch((err) => {
              setMessage("Couldn't update");
              setSeverity("error");
            });
        });
    } catch (error) {
      console.log(error);
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleSubmitCredentials = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", credentialForm);
  };

  return (
    <Box style={{ marginLeft: "-10rem", width: "50%" }}>
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginLeft={"8rem"}
      >
        <br />
        <div>
          <Box
            sx={{
              borderRadius: "1rem",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
              width: "200%",
              p: 2,
              marginTop: "2px",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "15%",
            }}
          >
            <AccountInfo username={userDetails.username} />
            <Stack direction="row" spacing={0}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
                style={{ marginLeft: "18%", marginTop: "10px" }}
              >
                Change User Credentials
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setAccountDialog(true)}
                style={{ marginLeft: "10%", marginTop: "10px" }}
              >
                Delete Account
              </Button>
            </Stack>
          </Box>
        </div>

        <div>
          <Box
            sx={{
              borderRadius: "1rem",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
              width: "300%",
              p: 2,
              marginTop: "10px",
              marginRight: "20px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack
                container
                spacing={3}
                direction={"column"}
                style={{ paddingTop: "10px" }}
              >
                <Typography variant="h5" gutterBottom align="left">
                  PROFILE
                </Typography>
                <br />
                <TextField
                  label="First Name"
                  name="firstname"
                  value={userDetails.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <div style={{ color: "red" }}>*{errors.firstname}</div>
                )}

                <TextField
                  label="Last Name"
                  name="lastname"
                  value={userDetails.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <div style={{ color: "red" }}>*{errors.lastname}</div>
                )}

                <TextField
                  label="Email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div style={{ color: "red" }}>*{errors.email}</div>
                )}

                <TextField
                  label="City"
                  name="city"
                  value={userDetails.city}
                  onChange={handleChange}
                />
                {errors.city && (
                  <div style={{ color: "red" }}>*{errors.city}</div>
                )}

                <TextField
                  label="Contact Number"
                  name="contactnumber"
                  value={userDetails.contactnumber}
                  onChange={handleChange}
                />
                {errors.contactnumber && (
                  <div style={{ color: "red" }}>*{errors.contactnumber}</div>
                )}

                <FormControl>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="Gender"
                    value={userDetails.gender}
                    onChange={handleChange}
                    defaultValue={userDetails.gender}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
                {errors.gender && (
                  <div style={{ color: "red" }}>*{errors.gender}</div>
                )}

                <TextField
                  label="Birthdate"
                  type="date"
                  name="birthdate"
                  value={userDetails.birthdate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {errors.birthdate && (
                  <div style={{ color: "red" }}>*{errors.birthdate}</div>
                )}

                <Button variant="contained" color="primary" type="submit">
                  Edit Details
                </Button>
              </Stack>
            </form>
          </Box>
        </div>
      </Stack>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>

      <Dialog open={accountDialog} onClose={() => setAccountDialog(false)}>
        <DialogTitle>Delete user account</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose}>No</Button>
          <Button onClick={deleteAccount} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Change User Credentials</DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
          <form onSubmit={handleSubmitCredentials}>
            <Stack container spacing={3} direction={"column"}>
              <TextField
                style={{ marginTop: "10px" }}
                label="Password"
                name="password"
                value={credentialForm.password}
                onChange={handleChangeCredentials}
                type="password"
              />

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                value={credentialForm.confirmPassword}
                onChange={handleChangeCredentials}
                type="password"
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmitCredentials}>
            Update Credentials
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
