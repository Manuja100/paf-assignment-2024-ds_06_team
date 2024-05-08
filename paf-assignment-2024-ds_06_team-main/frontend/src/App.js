import Sidebar from "./components/Feed/Sidebar";
import Feed from "./components/Feed/Feed";
import Rightbar from "./components/Feed/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./layout/Navbar";
import Add from "./components/Feed/Add";
import {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/User/LoginUI";
import SignUp from "./components/User/SignUpUI";
import SettingSideBar from "./components/User/SettingSideBar";
import Setting from "./components/User/Setting";
import React from "react";
import WorkoutForm3Days from "./components/WorkoutPlan/3DaySplit";
import WorkoutForm5Days from "./components/WorkoutPlan/5DaySplit";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import Profile from "./pages/Profile"
import UserNotFoundPage from "./components/Profile/UserNotFound";

function App() {
  const [mode, setMode] = useState(() => {
    // Check if mode is stored in localStorage
    const storedMode = localStorage.getItem("mode");
    // If mode is stored, return it, otherwise return "light"
    return storedMode !== null ? storedMode : "light";
  });

  // Effect to update localStorage whenever mode changes
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={ <Box bgcolor={"background.default"} color={"text.primary"} > <Login /></Box>
            }  />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/profile/:username" element={
              <Box bgcolor={"background.default"} color={"text.primary"} > 
                <Navbar />
                <Profile /> 
              </Box>
            } 
            />
            <Route path="/userNotFound" element={<UserNotFoundPage />} />
            <Route
              path="/feed"
              element={
                <Box bgcolor={"background.default"} color={"text.primary"}>
                  <Navbar />
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Sidebar setMode={setMode} mode={mode} />
                    <Feed />
                    <Rightbar />
                  </Stack>
                  <Add />
                </Box>
              }
            />
            <Route
              path="/setting"
              element={
                <Box bgcolor={"background.default"} color={"text.primary"}>
                  <Navbar />
                  <Stack direction="row" spacing={0}>
                    <SettingSideBar />
                    <Setting />
                  </Stack>
                </Box>
              }
            />

            <Route
              path="/3daysplit"
              element={
                <Box bgcolor={"background.default"} color={"text.primary"}>
                  <Navbar />
                  <WorkoutForm3Days />
                </Box>
              }
            />
            <Route
              path="/5daysplit"
              element={
                <Box bgcolor={"background.default"} color={"text.primary"}>
                  <Navbar />
                  <WorkoutForm5Days />
                </Box>
              }
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
