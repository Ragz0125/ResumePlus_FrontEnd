import { Grid } from "@mui/material"
import styles from "../Icon/Icon.module.scss"
const Icon = ({src}:any) => {
    return (
        <Grid className={styles.icon}>
            <img src={src}/>
        </Grid>
    )
}

export default Icon