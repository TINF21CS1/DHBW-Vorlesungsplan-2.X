import { useState } from "react";
import {
  Button,
  Snackbar,
  Alert,
  DialogContentText,
  Dialog,
  DialogContent,
  TextField,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Link } from "@mui/icons-material";

const CopyButton = (props: { text: string; url: string }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  let full_url = new URL(props.url, window.location.origin).href;
  let issue_report_url = new URL(
    "https://github.com/frereit/react-calendar/issues/new"
  );
  issue_report_url.searchParams.append("title", "Clipboard unsupported");
  issue_report_url.searchParams.append(
    "body",
    "Couldn't copy to clipboard on User-Agent: `" + navigator.userAgent + "`"
  );
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(full_url);
      setCopied(true);
    } catch (err) {
      console.error("Couldn't copy to clipboard:", err);
    }
    setOpen(true);
  };
  const handleClose = (_: any, reason?: string) => {
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
      <Snackbar
        open={open && copied}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={copied ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          Copied URL!
        </Alert>
      </Snackbar>
      <Dialog open={open && !copied} onClose={handleClose}>
        <DialogTitle>Failed to copy URL!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your browser might not support the clipboard API.
            <br />
            <small>
              Feel free to{" "}
              <a href={issue_report_url.href}>open an issue on GitHub</a>!
            </small>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="ical-url"
            label="iCal URL"
            type="text"
            fullWidth
            variant="standard"
            value={full_url}
            InputProps={{
              readOnly: true,
            }}
            onFocus={(event) => {
              event.target.select();
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Dismiss</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CopyButton;
