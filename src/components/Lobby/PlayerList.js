import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

export default function PlayerList({ players }) {
  return (
    <Box sx={{display:"flex", flexDirection:"row", gap:2, mt:1}}>
      {players.map((p, i) => (
        <Box key={p.uid} sx={{display:"flex", alignItems:"center", gap:1}}>
          <Avatar sx={{width:24, height:24}}>{p.name[0]}</Avatar>
          <Typography>{p.name}</Typography>
        </Box>
      ))}
    </Box>
  );
}