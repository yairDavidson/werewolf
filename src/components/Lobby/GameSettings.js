import React from "react";
import { Box, Typography } from "@mui/material";

export default function GameSettings() {
  // Could add custom role selection / advanced settings here
  return (
    <Box sx={{mt:3}}>
      <Typography variant="subtitle2">Default Roles: Werewolf, Seer, Robber, Troublemaker, Villager x3</Typography>
    </Box>
  );
}