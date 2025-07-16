import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import NightPhase from "./NightPhase";
import DiscussionPhase from "./DiscussionPhase";
import VotingPhase from "./VotingPhase";
import ResultsPhase from "./ResultsPhase";
import { Box, Button, Typography, Divider } from "@mui/material";
import PlayerList from "../Lobby/PlayerList";

export default function Game({ user, gameId, onExit }) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "games", gameId), (snap) => {
      setGame({ ...snap.data(), id: snap.id });
    });
    return unsub;
  }, [gameId]);

  if (!game) return <Typography>Loading...</Typography>;

  const startGame = async () => {
    // Shuffle roles and assign
    const shuffled = [...game.settings.roles].sort(() => Math.random() - 0.5);
    const assignments = game.players.map((p, i) => ({
      uid: p.uid,
      name: p.name,
      role: shuffled[i],
      originalRole: shuffled[i],
    }));
    await updateDoc(doc(db, "games", gameId), {
      stage: "night",
      assignments,
      nightActions: {},
      discussion: {},
      votes: {},
    });
  };

  return (
    <Box sx={{maxWidth:600, mx:"auto", mt:6, p:3, bgcolor:"background.paper", borderRadius:2}}>
      <Typography variant="h4">{game.name}</Typography>
      <PlayerList players={game.players} />
      <Divider sx={{my:2}} />
      {game.stage === "lobby" && user.uid === game.host && (
        <Button variant="contained" color="primary" onClick={startGame}>Start Game</Button>
      )}
      {game.stage === "lobby" && user.uid !== game.host && (
        <Typography>Waiting for host to start the game...</Typography>
      )}
      {game.stage === "night" && <NightPhase user={user} game={game} />}
      {game.stage === "discussion" && <DiscussionPhase user={user} game={game} />}
      {game.stage === "voting" && <VotingPhase user={user} game={game} />}
      {game.stage === "results" && <ResultsPhase user={user} game={game} />}
      <Button color="secondary" variant="text" sx={{mt:2}} onClick={onExit}>Exit Game</Button>
    </Box>
  );
}