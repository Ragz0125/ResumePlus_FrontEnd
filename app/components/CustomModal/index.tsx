import { Grid } from "@mui/material";
import styles from "../CustomModal/CustomModal.module.scss";
import { useState } from "react";
const CustomModal = ({ open, message, handleSubmit }: any) => {
  return (
    <>
      {open && (
        <Grid className={styles.modalBackdrop}>
          <Grid className={styles.modalContainer}>
            <Grid className={styles.message}>{message}</Grid>
            <Grid className={styles.button} onClick={() => handleSubmit()}>
              Log out
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CustomModal;
