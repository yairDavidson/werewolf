import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import GameSettings from "./GameSettings";
import PlayerList from "./PlayerList";
import { Box, Button, Typography, TextField, Divider } from "@mui/material";

export default function Lobby({ user, onEnterGame, onSpectate }) {
  const [games, setGames] = useState([]);
  const [creating, setCreating] = useState(false);
  const [newGameName, setNewGameName] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "games"), (snap) => {
      setGames(snap.docs.map(doc => ({...doc.data(), id: doc.id})));
    });
    return unsub;
  }, []);

  const createGame = async () => {
    if (!newGameName.trim()) return;
    setCreating(true);
    const gameDoc = await addDoc(collection(db, "games"), {
      name: newGameName,
      createdAt: Date.now(),
      stage: "lobby",
      players: [{ uid: user.uid, name: user.displayName, joinedAt: Date.now() }],
      settings: { roles: ["Werewolf", "Seer", "Robber", "Troublemaker", "Villager", "Villager", "Villager"] },
      host: user.uid
    });
    setCreating(false);
    setNewGameName("");
    onEnterGame(gameDoc.id);
  };

  const joinGame = async (gid) => {
    const gameDoc = doc(db, "games", gid);
    await updateDoc(gameDoc, {
      players: [...games.find(g => g.id === gid).players, { uid: user.uid, name: user.displayName, joinedAt: Date.now() }]
    });
    onEnterGame(gid);
  };

  return (
    <Box sx={{maxWidth:520, mx:"auto", mt:8, p:4, bgcolor:"background.paper", borderRadius:2}}>
      <Typography variant="h5">Games Lobby</Typography>
      <Divider sx={{my:2}} />
      <Box sx={{mb:2}}>
        <TextField
          label="New Game Name"
          value={newGameName}
          onChange={e => setNewGameName(e.target.value)}
          sx={{mr:2}}
        />
        <Button variant="contained" color="primary" disabled={creating} onClick={createGame}>Create Game</Button>
      </Box>
      <Typography variant="h6" sx={{mt:2}}>Available Games</Typography>
      <Box>
        {games.map(game => (
          <Box key={game.id} sx={{p:2, mb:1, bgcolor:"#333", borderRadius:1}}>
            <Typography>{game.name} ({game.stage})</Typography>
            <PlayerList players={game.players} />
            {game.players.find(p => p.uid === user.uid)
              ? <Button variant="outlined" disabled>Joined</Button>
              : <Button variant="contained" onClick={() => joinGame(game.id)}>Join</Button>}
            <Button variant="text" color="secondary" sx={{ml:1}} onClick={() => onSpectate(game.id)}>Watch</Button>
          </Box>
        ))}
      </Box>
      <GameSettings />
    </Box>
  );
}