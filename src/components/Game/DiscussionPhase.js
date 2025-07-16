import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Box, Button, Typography, TextField } from "@mui/material";

export default function DiscussionPhase({ user, game }) {
  const [chat, setChat] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitDiscussion = async () => {
    await updateDoc(doc(db, "games", game.id), {
      [`discussion.${user.uid}`]: chat,
    });
    setSubmitted(true);
  };

  useEffect(() => {
    if (
      game.assignments.every(a => game.discussion && game.discussion[a.uid])
    ) {
      setTimeout(() => {
        updateDoc(doc(db, "games", game.id), { stage: "voting" });
      }, 1000);
    }
  }, [game.discussion, game.assignments, game.id]);

  return (
    <Box>
      <Typography variant="h5">Discussion Phase</Typography>
      <TextField
        label="What do you claim? (chat)"
        fullWidth
        multiline
        rows={2}
        value={chat}
        disabled={submitted}
        onChange={e => setChat(e.target.value)}
        sx={{my:2}}
      />
      <Button variant="contained" color="primary" onClick={submitDiscussion} disabled={submitted}>Submit Claim</Button>
      {submitted && <Typography sx={{mt:2}}>Claim submitted. Waiting for others...</Typography>}
    </Box>
  );
}