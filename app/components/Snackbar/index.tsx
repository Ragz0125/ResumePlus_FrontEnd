import { Grid } from "@mui/material"
import styles from "../Snackbar/Snackbar.module.scss"
import { useContext, useEffect } from "react"
import { AppContext } from "@/app/store/store"

const SnackBar = ({message}:any) => {
    const {state, setState}: any = useContext(AppContext)

    useEffect(() => {
        if(state?.openSnackBar){
            setTimeout(() => {
                setState({...state, openSnackBar: false})
            }, 2000)
        }
    },[state?.openSnackBar])
    return(
        <Grid className={styles.container}>{message}</Grid>
    )
}

export default SnackBar