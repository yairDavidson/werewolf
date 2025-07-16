import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function SignIn() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!name || name.length < 2) {
      setError("Enter a valid name (at least 2 characters)");
      return;
    }
    try {
      const userCred = await signInAnonymously(auth);
      await updateProfile(userCred.user, { displayName: name });
    } catch (err) {
      setError("Sign-in failed: " + err.message);
    }
  };

  return (
    <Box sx={{mt: 10, display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Typography variant="h4">One Night Ultimate Werewolf</Typography>
      <Typography variant="subtitle1" sx={{mb:2}}>Enter your name to join</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        sx={{mb:2}}
      />
      <Button variant="contained" color="primary" onClick={handleSignIn}>Join</Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}