import React from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import { IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  return (
    <>
      <div
        style={{
          padding: "3px",
          backgroundColor: "#131921",
          marginBottom: "1px solid #3b4149",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              style={{ color: "white", fontSize: "14px", margin: "0px 95px" }}
            >
              Free Shipping Over rupees 500/- & Free Returns
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{ color: "white", fontSize: "14px", marginleft: "95px" }}
            >
              Hotline :
              <a style={{ color: "white" }} href="+91 9741831711">
                 +91 9741831711
              </a>
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          padding: "3px",
          backgroundColor: "#131921",
          marginBottom: "1px solid #3b4149",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            style={{ display: "flex",justifyContent:'space-between', color: "white", padding: "30px 0px 30px 95px" }}
          >
            <div>
              <h2 style={{ color: "white",}}>BuyZone</h2>
            </div>
            <div>
            <OutlinedInput
            id="outlined-adornment-password"
            type={true ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                >
                 <SearchIcon/>
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
              <TextField
                varient="outlined"
                size="small"
                style={{ color: "white", border: "1px solid grey" }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Header;
