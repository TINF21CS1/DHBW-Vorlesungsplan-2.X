import { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import { Link } from "@mui/icons-material";

const CopyButton = (props: { text: string; url: string }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  let full_url = new URL(props.url, window.location.origin).href;
  const handleClick = () => {
    try {
      navigator.clipboard.writeText(full_url);
      setCopied(true);
    } catch (err) {
      console.error("Couldn't copy to clipboard:", err);
    }
    setOpen(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // FIXME: Provide an alternative if the clipboard is unavailable
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClick}
        startIcon={<Link />}
      >
        {props.text}
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={copied ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {copied ? "Copied URL!" : "Failed to copy URL"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CopyButton;
