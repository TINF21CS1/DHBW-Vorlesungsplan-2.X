import { Typography } from '@mui/material';

const LabeledIcon = (props: { icon: JSX.Element, text: String }) => {
    return <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    }}>
        {props.icon}
        <Typography>{props.text}</Typography>
    </div>
};

export default LabeledIcon;