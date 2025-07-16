import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./components/Auth/SignIn";
import SignOut from "./components/Auth/SignOut";
import Lobby from "./components/Lobby/Lobby";
import Game from "./components/Game/Game";
import SpectatorView from "./components/Game/SpectatorView";
import { CircularProgress, Box } from "@mui/material";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameId, setGameId] = useState(null);
  const [spectating, setSpectating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <Box sx={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) return <SignIn />;

  return (
    <Box>
      <SignOut />
      {!gameId && !spectating && (
        <Lobby
          user={user}
          onEnterGame={(gid) => setGameId(gid)}
          onSpectate={(gid) => {
            setGameId(gid);
            setSpectating(true);
          }}
        />
      )}
      {gameId && !spectating && <Game user={user} gameId={gameId} onExit={() => setGameId(null)} />}
      {gameId && spectating && <SpectatorView gameId={gameId} onExit={() => { setGameId(null); setSpectating(false); }} />}
    </Box>
  );
}

export default App;