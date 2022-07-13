import "./App.css";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Carshop</Typography>
        </Toolbar>
      </AppBar>
      <Login />
    </div>
  );
}

export default App;
