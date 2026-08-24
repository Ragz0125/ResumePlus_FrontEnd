import { Grid, Typography } from "@mui/material";
import styles from "../ChatTab/ChatTab.module.scss";
import Icon from "../Icon/page";

interface ChatTab{
    title:string
    clicked:boolean
    onClick: () => void
}

const ChatTab = ({title, clicked, onClick}: ChatTab) => {
  return (
    <Grid className={clicked ? styles?.clickedContainer :styles.container} onClick={onClick}>
      <Icon src={clicked ? "/icons/message-icon-primary.png": "/icons/message-icon.png"} />
      <div className={styles.wrapText}>
        <Typography className={styles.text}>
          {title}
        </Typography>
      </div>
    </Grid>
  );
};

export default ChatTab;
