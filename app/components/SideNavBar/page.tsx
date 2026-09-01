"use client";

import Grid from "@mui/material/Grid";
import styles from "../SideNavBar/SideNavBar.module.scss";
import Button from "../Button/page";
import ChatTab from "../ChatTab/page";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/store/store";
import { getAllConversations, getUserDetails } from "@/app/api/apiCalls";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomModal from "../CustomModal";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LoginModal from "../Login&SignUp/loginModal";
import SnackBar from "../Snackbar";
import CustomLoader from "../CustomLoader";

const SideNavBar = () => {
  const router = useRouter();
  const { state, setState }: any = useContext(AppContext);
  const [conversationHistory, setConversationHistory] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openClearModal, setOpenClearModal] = useState<boolean>(false);
  const [activeNewChat, setActiveNewChat] = useState<boolean>(false);

  const getConversationHistory = () => {
    getAllConversations()
      .then((response: any) => {
        console.log(response?.data);
        if (response?.status == 200) {
          let history = response?.data;
          let tempConHistory = [];
          for (let i = 0; i < history.length; i++) {
            tempConHistory.push({
              conversationId: history[i]?.conversation_id,
              title: history[i]?.messages[0]?.content,
            });
          }
          setConversationHistory(tempConHistory);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCurrentUserDetails = () => {
    getUserDetails()
      .then((response: any) => {
        if (response.status == 200) {
          setState({ ...state, userDetails: response?.data });
        }
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (state?.isLoggedIn) {
      getConversationHistory();
      getCurrentUserDetails();
    }
  }, [state?.isLoggedIn]);

  const DividerSection = ({ sectionTitle, linkTitle }: any) => {
    return (
      <>
        <div className={styles.divider}>
          {sectionTitle} <div className={styles.primaryLink}>{linkTitle}</div>
        </div>
      </>
    );
  };

  const handleChatClick = (id: any) => {
    let clickedTab = conversationHistory.filter(
      (data: any) => data?.conversationId === id,
    );

    router.push(`/chat/${clickedTab[0]?.conversationId}`);
    setState({ ...state, conversationId: clickedTab[0]?.conversationId });
    setConversationHistory((prev: any) =>
      prev.map((item: any) =>
        item.conversationId === id
          ? { ...item, clicked: true }
          : { ...item, clicked: false },
      ),
    );
    getConversationHistory()
  };

  const handleNewChat = () => {
    if (activeNewChat) {
      state?.isLoggedIn ? window.location.reload() : setOpenClearModal(true);
    }
    setActiveNewChat(true);
    router.push("/chat");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setState({});
    setConversationHistory([]);
    setOpenModal(false);
    router.push("/");
  };

  return (
    <>
      {state?.showLoader && <CustomLoader />}
      {state?.loginModal && !state?.isLoggedIn && <LoginModal />}
      {state?.openSnackBar && <SnackBar message={state?.snackBarMessage} />}
      <CustomModal
        open={openClearModal}
        message={
          "Are you sure you want to leave the chat? This conversation will not be saved."
        }
        btnTitle={"Yes"}
        handleSubmit={() => {
          window.location.reload();
          setOpenClearModal(false);
        }}
      />
      <CustomModal
        open={openModal}
        message={"Are you sure you want to Logout?"}
        handleSubmit={handleLogout}
        btnTitle={"Logout"}
      />
      <div className={styles.sideBarLayout}>
        <div className={styles.topSection}>
          <div className={styles.logoSection} onClick={() => router.push("/")}>
            ResuMe +
          </div>
          <div className={styles.row}>
            <Button
              title={"New Chat"}
              onClick={() => {
                handleNewChat();
                getConversationHistory();
              }}
            />
          </div>
        </div>
        <DividerSection
          sectionTitle={"Your Conversation"}
          linkTitle={"Clear All"}
        />
        <Grid className={styles.scroller}>
          {conversationHistory.map((data: any) => (
            <ChatTab
              title={data?.title}
              clicked={data?.clicked}
              onClick={() => {
                handleChatClick(data?.conversationId);
                setActiveNewChat(false);
              }}
            />
          ))}
        </Grid>
        {state?.isLoggedIn ? (
          <Grid
            className={styles.logoutButton}
            onClick={() => setOpenModal(true)}
          >
            Logout <LogoutIcon />
          </Grid>
        ) : (
          <Grid className={styles.signupContainer}>
            <Grid
              className={styles.box}
              onClick={() => setState({ ...state, loginModal: true })}
            >
              <Grid className={styles.row}>
                <PersonOutlineOutlinedIcon
                  sx={{ color: "#5661F6" }}
                  fontSize="medium"
                />
                Login/Sign up
              </Grid>
              <Grid className={styles.text}>
                <Grid />
                Save your chats and access them anywhere
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
};

export default SideNavBar;
