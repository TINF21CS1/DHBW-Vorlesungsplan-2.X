import { Typography } from "@mui/material";

const LabeledIcon = (props: { icon: JSX.Element; text: (JSX.Element | String) }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}>
      {props.icon}
      {props.text instanceof String ? <Typography>{props.text}</Typography> : props.text}
    </div>
  );
};

export default LabeledIcon;
