import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Box, Button, Typography } from "@mui/material";

export default function VotingPhase({ user, game }) {
  const [voted, setVoted] = useState(false);

  const voteFor = async (uid) => {
    await updateDoc(doc(db, "games", game.id), {
      [`votes.${user.uid}`]: uid,
    });
    setVoted(true);
  };

  useEffect(() => {
    if (
      game.assignments.every(a => game.votes && game.votes[a.uid])
    ) {
      setTimeout(() => {
        updateDoc(doc(db, "games", game.id), { stage: "results" });
      }, 1000);
    }
  }, [game.votes, game.assignments, game.id]);

  return (
    <Box>
      <Typography variant="h5">Voting Phase</Typography>
      <Typography>Vote for who you think is a Werewolf:</Typography>
      {game.assignments.filter(a => a.uid !== user.uid).map(a => (
        <Button
          key={a.uid}
          variant="contained"
          sx={{mr:1, mt:2}}
          color="primary"
          disabled={voted}
          onClick={() => voteFor(a.uid)}
        >
          {a.name}
        </Button>
      ))}
      {voted && <Typography sx={{mt:2}}>Vote submitted. Waiting for others...</Typography>}
    </Box>
  );
}