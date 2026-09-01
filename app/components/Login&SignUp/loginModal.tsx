import { Divider, Grid, snackbarClasses } from "@mui/material";
import styles from "../Login&SignUp/LoginSignUp.module.scss";
import { useContext, useState } from "react";
import { login, signUp } from "@/app/api/apiCalls";
import { AppContext } from "@/app/store/store";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { LoginFailedMessage, LoginSuccessMessage, SignUpSuccessMessage } from "@/app/constants";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const [formData, setFormData] = useState<any>({});
  const { state, setState }: any = useContext(AppContext);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  const router = useRouter()

  const handleSignIn = () => {
    setState({...state, showLoader: true})
    if (
      !(
        formData?.username &&
        formData?.password
      )
    ) {
      setState({
        ...state,
        openSnackBar: true,
        snackBarMessage: LoginFailedMessage,
      });
      return
    }
    let payload = {
      username: formData?.username,
      password: formData?.password,
    };

    login(payload)
      .then((response: any) => {
        if (response?.status == 200) {
          localStorage.setItem("token", response?.data?.access_token);
          setState({ ...state, loginModal: false, isLoggedIn: true, snackBarMessage: LoginSuccessMessage, openSnackBar: true,showLoader: false});
          router.push("/")
        }
      })
      .catch((err) => {
        setState({ ...state, showLoader: false })
        console.log(err)
      })
    
  };

  const handleSignUp = () => {
    setState({...state, showLoader: true})
    if (
      !(
        formData?.name &&
        formData?.email &&
        formData?.username &&
        formData?.password
      )
    ) {
      setState({
        ...state,
        openSnackBar: true,
        snackBarMessage: LoginFailedMessage,
      });
      return
    }

    let payload = {
      name: formData?.name,
      email: formData?.email,
      username: formData?.username,
      password: formData?.password,
    };

    signUp(payload)
      .then((response: any) => {
        if (response?.status == 200) {
          setState({ ...state, loginModal: false,snackBarMessage: SignUpSuccessMessage, openSnackBar: true, showLoader: false });
          router.push("/")
        }
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, showLoader: false })
      })
  };

  const loginForm = () => {
    return (
      <>
        <Grid className={styles.text}>Welcome Back 🖐️</Grid>
        <Grid className={styles.grayText}>Login to continue</Grid>

        <Grid className={styles.inputContainer}>
          <Grid className={styles.inputBox}>
            <Grid className={styles.label}>Username</Grid>
            <input
              type="text"
              value={formData?.userName}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </Grid>

          <Grid className={styles.inputBox}>
            <Grid className={styles.label}>Password</Grid>
            <input
              type="password"
              value={formData?.password || []}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Grid>

          <Grid className={styles.button} onClick={() => handleSignIn()}>
            Login
          </Grid>

          <Divider />

          <Grid className={styles.cta}>
            Click here to{" "}
            <Grid
              className={styles.hyperlink}
              onClick={() => setShowLoginForm(false)}
            >
              Sign-up
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  const singupForm = () => {
    return (
      <>
        <Grid className={styles.grayText}>Sign-up to start the journey</Grid>

        <Grid className={styles.inputContainer}>
          <Grid className={styles.inputBox}>
            <Grid className={styles.label}>Name</Grid>
            <input
              type="name"
              value={formData?.name || []}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Grid>
          <Grid className={styles.inputBox}>
            <Grid className={styles.label}>Username</Grid>
            <input
              type="text"
              value={formData?.userName}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </Grid>

          <Grid className={styles.inputBox}>
            <Grid className={styles.label}>Email</Grid>
            <input
              type="text"
              value={formData?.email || []}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Grid>

          <Grid className={styles.inputBox}>
            <Grid className={styles.label}>Password</Grid>
            <input
              type="password"
              value={formData?.password || []}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Grid>

          <Grid className={styles.button} onClick={() => handleSignUp()}>
            Sign Up
          </Grid>

          <Divider />

          <Grid className={styles.cta}>
            Already have an account?{" "}
            <Grid
              className={styles.hyperlink}
              onClick={() => setShowLoginForm(true)}
            >
              Login
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Grid className={styles.modalBackdrop}>
      <Grid className={styles.modalContainer}>
        <Grid
          className={styles.closeButton}
          onClick={() => setState({ ...state, loginModal: false })}
        >
          <CloseOutlinedIcon sx={{ color: "gray" }} />
        </Grid>
        <Grid className={styles.title}>
          Resu<Grid className={styles.colored}>Me</Grid>
        </Grid>
        {showLoginForm ? loginForm() : singupForm()}
      </Grid>
    </Grid>
  );
};

export default LoginModal;
