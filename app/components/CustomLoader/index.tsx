import { CircularProgress, Grid } from "@mui/material";
import styles from "../CustomLoader/customLoader.module.scss"

const CustomLoader = () => {
  return (
    <Grid className={styles.loaderBackdrop}>
      <CircularProgress aria-label="Loading…" />
    </Grid>
  );
};

export default CustomLoader;
