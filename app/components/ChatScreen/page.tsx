import { Grid } from "@mui/material"
import styles from "../ChatScreen/ChatScreen.module.scss"

const ChatScreen = ({children}:any) => {
    return(
        <Grid className={styles.layout}>
            {children}
        </Grid>
    )
}

export default ChatScreen