import React from "react";
import {
  Box,
  Card,
  Typography,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { LocationOn, AccessTime, Tag } from "@mui/icons-material";
import { format } from "date-fns";
import { Event } from "ical.js";
import LabeledIcon from "./LabeledIcon";

const CalendarItem = (props: { event: Event }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card>
      <CardActionArea onClick={handleClickOpen}>
        <Box padding={1}>
          <Typography
            style={{ wordWrap: "break-word" }}
            variant="h5"
            component="h3"
          >
            {props.event.summary}
          </Typography>
          {props.event.startDate && props.event.endDate && (
            <LabeledIcon
              icon={<AccessTime />}
              text={
                format(props.event.startDate.toJSDate(), "HH:mm") +
                " - " +
                format(props.event.endDate.toJSDate(), "HH:mm")
              }
            />
          )}
          {props.event.location.trim() !== "" && (
            <LabeledIcon icon={<LocationOn />} text={props.event.location} />
          )}
        </Box>
      </CardActionArea>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.event.summary}</DialogTitle>
        <DialogContent>
          {props.event.startDate && props.event.endDate && (
            <LabeledIcon
              icon={<AccessTime />}
              text={
                format(props.event.startDate.toJSDate(), "HH:mm") +
                " - " +
                format(props.event.endDate.toJSDate(), "HH:mm")
              }
            />
          )}
          {props.event.location.trim() !== "" && (
            <LabeledIcon
              icon={<LocationOn />}
              text={
                <Typography sx={{ userSelect: "all" }}>
                  {props.event.location}
                </Typography>
              }
            />
          )}
          {props.event.uid !== "" && (
            <LabeledIcon
              icon={<Tag />}
              text={
                <Typography sx={{ userSelect: "all" }}>
                  {props.event.uid}
                </Typography>
              }
            />
          )}
          {props.event.description && (
            <DialogContentText>{props.event.description}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CalendarItem;
