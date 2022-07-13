import React, { useState } from "react";
import { SERVER_URL } from "../constant.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Carlist from "./Carlist.js";
import { Snackbar } from "@mui/material";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isAuthenticated, setAuth] = useState(false);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const [open, setOpen] = useState(false);

  const login = () => {
    fetch(SERVER_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        const jwtToken = res.headers.get("Authorization");
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
        } else {
          setOpen(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const logout = () => {
    sessionStorage.removeItem("jwt");
    setAuth(false);
  };

  if (isAuthenticated) {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Carshop
          </Typography>
            <Divider />
            <List>
              <ListItem key="1" disablePadding>
                <ListItemButton sx={{ textAlign: "center" }} onClick={logout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Toolbar>
        </AppBar>
        <Carlist />
      </div>
    );
  } else {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Carshop</Typography>
          </Toolbar>
        </AppBar>
        <Stack spacing={2} alignItems="center" mt={2}>
          <TextField name="username" label="Username" onChange={handleChange} />
          <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
          />
          <Button variant="outlined" color="primary" onClick={login}>
            Login
          </Button>
        </Stack>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Login failed: Check your username and password"
        />
      </div>
    );
  }
}

export default Login;
