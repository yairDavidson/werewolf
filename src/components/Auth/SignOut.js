import React from "react";
import { auth } from "../../firebase";
import { Button } from "@mui/material";

export default function SignOut() {
  return auth.currentUser && (
    <Button
      sx={{position:"absolute", top:16, right:16, zIndex:100}}
      variant="outlined"
      color="secondary"
      onClick={() => auth.signOut()}
    >
      Sign Out
    </Button>
  );
}