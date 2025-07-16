import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Box, Typography, Divider } from "@mui/material";
import PlayerList from "../Lobby/PlayerList";
import RoleCard from "../Shared/RoleCard";

export default function SpectatorView({ gameId, onExit }) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "games", gameId), (snap) => {
      setGame({ ...snap.data(), id: snap.id });
    });
    return unsub;
  }, [gameId]);

  if (!game) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{maxWidth:600, mx:"auto", mt:6, p:3, bgcolor:"background.paper", borderRadius:2}}>
      <Typography variant="h4">{game.name} - Spectator</Typography>
      <PlayerList players={game.players} />
      <Divider sx={{my:2}} />
      <Typography>Stage: {game.stage}</Typography>
      {game.assignments && (
        <Box sx={{mt:2}}>
          <Typography variant="subtitle2">Roles:</Typography>
          {game.assignments.map(a => (
            <Box key={a.uid} sx={{display:"flex", alignItems:"center", gap:2, mb:1}}>
              <Typography>{a.name}:</Typography>
              <RoleCard role={a.role} />
            </Box>
          ))}
        </Box>
      )}
      <Button color="secondary" variant="text" sx={{mt:2}} onClick={onExit}>Exit Spectator</Button>
    </Box>
  );
}