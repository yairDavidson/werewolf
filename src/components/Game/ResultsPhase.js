import React, { useMemo } from "react";
import { Box, Typography, Divider } from "@mui/material";
import RoleCard from "../Shared/RoleCard";

function getWerewolfUIDs(assignments) {
  return assignments.filter(a => a.role === "Werewolf").map(a => a.uid);
}

export default function ResultsPhase({ game }) {
  // Tally votes
  const votes = Object.values(game.votes || {});
  const voteCounts = {};
  votes.forEach(uid => {
    voteCounts[uid] = (voteCounts[uid] || 0) + 1;
  });
  // Find max voted
  const maxVotes = Math.max(...Object.values(voteCounts));
  const killedUIDs = Object.keys(voteCounts).filter(uid => voteCounts[uid] === maxVotes);

  const werewolfUIDs = getWerewolfUIDs(game.assignments);
  const villagersWin = werewolfUIDs.some(uid => killedUIDs.includes(uid));
  const resultText = villagersWin
    ? "Villagers Win! At least one Werewolf was eliminated."
    : "Werewolves Win! No Werewolf was eliminated.";

  return (
    <Box>
      <Typography variant="h4">Game Results</Typography>
      <Divider sx={{my:2}} />
      <Typography variant="h6">{resultText}</Typography>
      <Typography sx={{mt:2}}>Votes:</Typography>
      {Object.entries(game.votes || {}).map(([voter, target]) => {
        const voterName = game.assignments.find(a => a.uid === voter)?.name;
        const targetName = game.assignments.find(a => a.uid === target)?.name;
        return <Typography key={voter}>{voterName} voted for {targetName}</Typography>;
      })}
      <Divider sx={{my:2}} />
      <Typography variant="h6">Final Roles:</Typography>
      {game.assignments.map(a => (
        <Box key={a.uid} sx={{display:"flex", alignItems:"center", gap:2, mb:1}}>
          <Typography>{a.name}:</Typography>
          <RoleCard role={a.role} />
        </Box>
      ))}
    </Box>
  );
}