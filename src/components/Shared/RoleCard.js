import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const roleColors = {
  Werewolf: "#c62828",
  Seer: "#1976d2",
  Robber: "#fbc02d",
  Troublemaker: "#6d4c41",
  Villager: "#388e3c",
};

export default function RoleCard({ role }) {
  return (
    <Box sx={{
      display: "inline-flex",
      alignItems: "center",
      bgcolor: roleColors[role] || "#555",
      px:2, py:1, borderRadius:2
    }}>
      <Avatar sx={{ bgcolor: roleColors[role] || "#555", mr:1 }}>
        {role[0]}
      </Avatar>
      <Typography variant="subtitle1" sx={{color:"#fff"}}>{role}</Typography>
    </Box>
  );
}