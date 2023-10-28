import { Grid, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <div
      style={{
        padding: "3px",
        backgroundColor: "#131921",
        marginBottom: "1px solid #3b4149",
        position:'relative',
        bottom:0
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
  );
}

export default Footer;
