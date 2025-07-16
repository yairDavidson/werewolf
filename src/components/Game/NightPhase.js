import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import RoleCard from "../Shared/RoleCard";
import { Box, Button, Typography } from "@mui/material";

const roleActions = {
  Werewolf: "Look for other Werewolves.",
  Seer: "Peek at another player's role or a center role.",
  Robber: "Rob a role from another player.",
  Troublemaker: "Swap two other players' roles.",
  Villager: "No night action.",
};

export default function NightPhase({ user, game }) {
  const [done, setDone] = useState(false);
  const assignment = game.assignments.find(a => a.uid === user.uid);

  const handleAction = async (actionData) => {
    await updateDoc(doc(db, "games", game.id), {
      [`nightActions.${user.uid}`]: actionData,
    });
    setDone(true);
  };

  useEffect(() => {
    // If all players done, move to next stage
    if (
      game.assignments.every(a => game.nightActions && game.nightActions[a.uid])
    ) {
      setTimeout(() => {
        updateDoc(doc(db, "games", game.id), { stage: "discussion" });
      }, 1000);
    }
  }, [game.nightActions, game.assignments, game.id]);

  if (!assignment) return <Typography>Assignment not found</Typography>;

  return (
    <Box>
      <Typography variant="h5">Night Phase</Typography>
      <RoleCard role={assignment.role} />
      <Typography>{roleActions[assignment.role]}</Typography>
      {!done && assignment.role === "Seer" && (
        <Box sx={{mt:2}}>
          <Typography>Choose a player or center role to peek:</Typography>
          {game.assignments.map(a => (
            <Button key={a.uid} variant="outlined" sx={{mr:1}} onClick={() => handleAction({ peek: a.uid })}>{a.name}</Button>
          ))}
        </Box>
      )}
      {!done && assignment.role === "Robber" && (
        <Box sx={{mt:2}}>
          <Typography>Choose a player to rob:</Typography>
          {game.assignments.filter(a => a.uid !== user.uid).map(a => (
            <Button key={a.uid} variant="outlined" sx={{mr:1}} onClick={() => handleAction({ rob: a.uid })}>{a.name}</Button>
          ))}
        </Box>
      )}
      {!done && assignment.role === "Troublemaker" && (
        <Box sx={{mt:2}}>
          <Typography>Choose two players to swap roles:</Typography>
          {/* Implement swap buttons */}
        </Box>
      )}
      {!done && (assignment.role === "Werewolf" || assignment.role === "Villager") && (
        <Box sx={{mt:2}}>
          <Typography>No action. Awaiting others...</Typography>
          <Button variant="outlined" onClick={() => handleAction({ pass: true })}>Done</Button>
        </Box>
      )}
      {done && (
        <Typography sx={{mt:2}}>Night action submitted. Waiting for others...</Typography>
      )}
    </Box>
  );
}