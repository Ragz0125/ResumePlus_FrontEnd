"use client";

import { Grid } from "@mui/material";
import styles from "../Button/Button.module.scss";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  type?: string;
}

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <Grid>
      <div className={styles.buttonLayout} onClick={onClick}>
        {title}
      </div>
    </Grid>
  );
};

export const HILButtons = ({ type, onClick, title }: ButtonProps) => {
  const buttonStyles:any = {
    approve: {
      border: "1px solid green",
      color: "green",
    },
    reject: {
      border: "1px solid red",
      color: "red",
    },
    edit: {
        border: "1px solid #5661F6",
        backgroundColor: "none",
        color: "#5661F6"
    }
  };

  const buttonIcons:any = {
    approve: <DoneIcon sx={{ color: "green" }} />,
    reject: <CloseIcon sx={{color: "red"}}/>,
    edit: <EditIcon sx={{color: "#5661F6"}}/>
  }

  return (
    <Grid>
      <div
        className={styles.hilButtonLayout}
        style={buttonStyles[type ?? 'default']}
        onClick={onClick}
      >
        {buttonIcons[type ?? 'default']} 
        {title}
      </div>
    </Grid>
  );
};

export default Button;
